import express, {Express, NextFunction, Request, Response} from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";

import routes from "./routes";

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

app.use(cors());
app.use(bodyParser.json());
app.use(routes);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.log(err.message)
  res
    .status(500)
    .json({ code: 500, message: err.message || "Wstąpił nieznany błąd" });
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
