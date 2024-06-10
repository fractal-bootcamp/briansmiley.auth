import express, { Request, Response } from "express";
import "dotenv/config";
const port = process.env.PORT;
const app = express();
app.use(express.json());

type User = {
  email: string;
  password: string;
};

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
// BAD:         curl -X POST -d {email=john@gmail.com" password=password}' localhost:3000/login

app.post("/login", (req: Request, res: Response) => {
  const receivedUser = req.body;

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

  console.log(
    `Received post request with body ${JSON.stringify(
      receivedUser
    )}, responding in kind`
  );
  return res.status(200).send(receivedUser);
});

app.get("/", (req: Request, res: Response) => {
  res.sendFile(__dirname + "/index.html");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
