import express, { Request, Response } from "express";
import "dotenv/config";
const port = process.env.PORT;
const app = express();
app.use(express.json());

//test data to use
const mockUsers: User[] = [
  {
    email: "john@gmail.com",
    password: "john"
  }
];
const mockUser = mockUsers[0];

//test login post body command
// GOOD:        curl -X POST --data '{"email": "john@gmail.com", "password": "john"}' --header 'content-type: application/json' localhost:3000/login
// BAD:         curl -X POST --data '{"email": "john@gmail.com", "password": "john"}' --header 'content-type: application/json' localhost:3000/login

type User = {
  email: string;
  password: string;
};
app.post("/login", (req: Request, res: Response) => {
  //we are casting receivedUser as a User type because we check its properties immediately afterward and we 400 out if it isn't; is this proper behavior?
  const receivedUser: User = req.body;

  //check that the request body has email and password, otherwise return a 400 error
  const reqIsUserObject = "email" in receivedUser && "password" in receivedUser;
  if (!reqIsUserObject) {
    console.log(
      `Received post request with malformed body ${JSON.stringify(
        receivedUser
      )}, responding with 400 error`
    );
    return res
      .status(400)
      .send(
        `Request body did not contain an email and password: request received was ${JSON.stringify(
          receivedUser
        )}`
      );
  }

  //If the received object is a valid user situation:
  console.log(
    `Received post request with body ${JSON.stringify(
      receivedUser
    )}, checking credentials`
  );
  //Check if the user credentials are valid
  const authenticated = mockUsers.some(
    user =>
      receivedUser.email === user.email &&
      receivedUser.password === user.password
  );
  return authenticated
    ? res.status(200).send(receivedUser)
    : res.status(401).send("Login failed, bad credentials");
});

app.get("/", (req: Request, res: Response) => {
  res.sendFile(__dirname + "/index.html");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
