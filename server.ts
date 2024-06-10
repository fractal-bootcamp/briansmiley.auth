import express, { Request, Response } from "express";
import path from "path";
import "dotenv/config";
import prisma from "./client";
import { Prisma } from "@prisma/client";
const port = process.env.PORT;
const app = express();
app.use(express.json());
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
*/
const login = async (credentials: User) => {
  //lookup the user's email in the database
  const userDbEntry = await prisma.user.findUnique({
    where: {
      email: credentials.email
    }
  });

  //exit if user lookup fails
  if (!userDbEntry) return null;

  //compare credential to database entry for use password
  const passwordMatches = credentials.password === userDbEntry.password;

  return passwordMatches;
};

const checkReqBody = (req: Request) => {};
//Post request receiving login credentials
app.post("/login", async (req: Request, res: Response) => {
  //check that the request body has email and password, otherwise return a 400 error
  const reqIsUserObject = "email" in req.body && "password" in req.body;
  if (!reqIsUserObject) {
    console.log(
      `Received login post request with malformed body ${JSON.stringify(
        req.body
      )}, responding with 400 error`
    );
    return res
      .status(400)
      .send(
        `Login request body did not contain an email and password: request received was ${JSON.stringify(
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
    `Received login post request with body ${JSON.stringify(
      receivedCredentials
    )}, checking credentials`
  );

  //Check if the user credentials are valid,
  const authenticated = await login(receivedCredentials);

  //response if user lookup fails
  if (authenticated === null)
    return res
      .status(401)
      .send(
        `Login failed: No account with email ${receivedCredentials.email} was found`
      );

  //otherwise respond with the login result
  return authenticated
    ? res.status(200).redirect("/dashboard") //login success
    : res.status(401).send("Login failed, bad credentials"); //login failure
});

//Create new user signup
app.post("/signup", async (req: Request, res: Response) => {
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
      .send(
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
    return res.status(200).send(createdUser);
  } catch (e) {
    //Prisma will give us a P2002 error code if there is a Unique conflict
    if (
      e instanceof Prisma.PrismaClientKnownRequestError &&
      e.code === "P2002"
    ) {
      console.log(
        `User already exists (Prisma threw a unique constraint violation), email: ${receivedCredentials.email}`
      );
      return res
        .status(409)
        .json({
          message:
            "User already exists (Prisma threw a unique constraint violation)",
          code: "existingUser"
        });
    }
    //If we get any other error then idk, throw it
    else throw e;
  }
});

app.get("/:pageName", (req: Request, res: Response) => {
  const page = req.params.pageName;
  res.sendFile(path.join(__dirname, `/dist/${page}.html`));
});
app.get("/", (req: Request, res: Response) => {
  res.redirect("/dist/login");
});
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
