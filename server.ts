import express, { Request, Response } from "express";
import "dotenv/config";
const port = process.env.PORT;
const app = express();
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send(`Server running on port ${port}`);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
