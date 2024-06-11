import express, { NextFunction, Request, Response } from "express";
import path from "path";
import "dotenv/config";
import prisma from "./client";
import { Prisma } from "@prisma/client";
const cookieParser = require("cookie-parser");
//Checks if a user is currently authenticated
const port = process.env.PORT;
const base_url = `http://localhost:${port}`;
const app = express();

//declaring a global extension of the Request type to include an `authed` property;
//we can also do this locally with:
//interface RequestWithAuthed extends Request {authed?: boolean}
declare global {
  namespace Express {
    interface Request {
      authed?: boolean;
    }
  }
}

//isAuthed middleware to attach a boolean to the request that says whether they are authed or not
const isAuthed = async (req: Request, res: Response, next: NextFunction) => {
  //idInDb is assigned null if thereis no userID cookie, or if the userId is not associated with a database user
  // console.log(`req.cookies.userId = ${req.cookies.userId}; `);
  const idInDb = req.cookies.userId
    ? await prisma.user.findUnique({
        where: { id: req.cookies.userId }
      })
    : null;
  //Set auth based on whether userId is in the database
  const authed = !(idInDb === null);
  req["authed"] = authed;

  next();
};

app.use(cookieParser());
app.use(express.json());
app.use(isAuthed);
app.use(express.urlencoded({ extended: true }));
app.use(express.static("dist"));
//test data to use
const mockUsers: User[] = [
  {
    email: "john@gmail.com",
    password: "john"
  }
];
type User = {
  email: string;
  password: string;
};
const mockUser = mockUsers[0];

//test login post body command
// GOOD:        curl -X POST --data '{"email": "john@gmail.com", "password": "john"}' --header 'content-type: application/json' localhost:3000/login
// BAD:         curl -X POST --data '{"email": "john@gmail.com", "password": "wrongpassword"}' --header 'content-type: application/json' localhost:3000/login

/**
 takes our request and checks the database to see if the credentials are valid;
 returns null for a failed user lookup, or a boolean for password match status
 -if  login is successful, sets a cookie with the user's id
 */
const login = async (credentials: User, res: Response) => {
  //lookup the user's email in the database
  const userDbEntry = await prisma.user.findUnique({
    where: {
      email: credentials.email
    }
  });
  //exit if user lookup fails
  if (!userDbEntry) {
    console.log("User not found, prisma query returned", userDbEntry);
    return null;
  }
  console.log("Found user: ", userDbEntry);
  //compare credential to database entry for use password
  const passwordMatches = credentials.password === userDbEntry.password;
  //add a userId cookie to the response
  if (passwordMatches) res.cookie("userId", userDbEntry.id);
  return passwordMatches;
};

const checkReqBody = (req: Request) => {};
//Post request receiving login credentials
app.post("/api/login", async (req: Request, res: Response) => {
  //check that the request body has email and password, otherwise return a 400 error
  const reqIsUserObject = "email" in req.body && "password" in req.body;
  if (!reqIsUserObject) {
    console.log(
      `Received login post request with malformed body ${JSON.stringify(
        req.body
      )}, responding with 400 error`
    );
    return res.status(400).json({
      message: `Login request body did not contain an email and password: request received was ${JSON.stringify(
        req.body
      )}`,
      redirectUrl: `${base_url}`
    });
  }
  const receivedCredentials: User = {
    email: req.body.email,
    password: req.body.password
  };
  ////If the received object a valid user object:

  //debug log the received credentials
  console.log(
    `Received login post request with body ${JSON.stringify(
      receivedCredentials
    )}, checking credentials`
  );

  //Run login function which will return login result and set a userId cookie if login is successful
  const authenticated = await login(receivedCredentials, res);

  //response if user lookup fails
  if (authenticated === null)
    return res
      .status(401)
      .json(
        `Login failed: No account with email ${receivedCredentials.email} was found`
      );
  console.log("User auth", authenticated);
  //otherwise respond with the login result
  return authenticated
    ? res.status(200).json({ redirectUrl: `${base_url}/dashboard` }) //login success
    : res.status(401).json("Login failed, bad credentials"); //login failure
});

//Create new user signup
app.post("/api/signup", async (req: Request, res: Response) => {
  //check that the request body has email and password, otherwise return a 400 error
  const reqIsUserObject = "email" in req.body && "password" in req.body;
  if (!reqIsUserObject) {
    console.log(
      `Received signup post request with malformed body ${JSON.stringify(
        req.body
      )}, responding with 400 error`
    );
    return res
      .status(400)
      .json(
        `Signup request body did not contain an email and password: request received was ${JSON.stringify(
          req.body
        )}`
      );
  }
  const receivedCredentials: User = {
    email: req.body.email,
    password: req.body.password
  };

  ////If the received object a valid user object:

  //debug log the received credentials
  console.log(
    `Received signup post request with body ${JSON.stringify(
      receivedCredentials
    )}, checking if user already exists`
  );

  //Try to create the new user; handle if they already exist
  //error handler here taken from https://www.prisma.io/docs/orm/prisma-client/debugging-and-troubleshooting/handling-exceptions-and-errors
  try {
    const createdUser = await prisma.user.create({ data: receivedCredentials });
    return res.status(200).json(createdUser);
  } catch (e) {
    //Prisma will give us a P2002 error code if there is a Unique conflict
    if (
      e instanceof Prisma.PrismaClientKnownRequestError &&
      e.code === "P2002"
    ) {
      console.log(
        `User already exists (Prisma threw a unique constraint violation), email: ${receivedCredentials.email}`
      );
      return res.status(409).json({
        message:
          "User already exists (Prisma threw a unique constraint violation)",
        code: "existingUser"
      });
    }
    //If we get any other error then idk, throw it
    else throw e;
  }
});
app.get("/logout", (req: Request, res: Response) => {
  res.clearCookie("userId").json({ redirectUrl: `${base_url}` });
});

app.get("/go", (req: Request, res: Response) => {
  console.log("Directing to login");
  res.json({ redirectUrl: `${base_url}/login` });
});

//list of paths that care if we are authed
const authGatedPaths = ["dashboard"];

//general fetch for pages
app.get("/:pageName", (req: Request, res: Response) => {
  const page = req.params.pageName;
  console.log(`Trying to serve ${page}`);
  if (authGatedPaths.includes(page)) {
    console.log(
      `Gated path ${page} requested, checking auth... Authed is ${req.authed}`
    );
    if (!req.authed) {
      console.log(
        `Auth failed; userId cookie is ${req.cookies.userId}, redirecting to login`
      );

      return res.redirect("/login");
    }
    console.log(
      `Auth success: req cookie contains userId ${req.cookies.userId}`
    );
  }
  //if the request is not authorized, redirect to login
  res.sendFile(path.join(__dirname, `/dist/${page}.html`));
});
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
