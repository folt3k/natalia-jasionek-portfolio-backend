import express, { Express, Request, Response } from 'express';
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from 'dotenv';
import prisma from "../prisma/client";

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

app.use(cors());
app.use(bodyParser.json());

app.get('/',async  (req: Request, res: Response) => {
    const x = await prisma.get('images');
    console.log(x)
    res.send('Express + TypeScript Server');
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
