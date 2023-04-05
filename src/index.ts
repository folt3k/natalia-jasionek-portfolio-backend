import express, { Express } from "express";
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

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
