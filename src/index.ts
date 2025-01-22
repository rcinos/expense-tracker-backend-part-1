import express from "express";
import dotenv from "dotenv";
import { router } from "./expenses/expenses.routes";
import pino from "pino-http";
import {logger} from "./helpers/logger";

dotenv.config();

const app = express();

app.use(express.json());

app.use(pino({ logger }));

app.use("/api/expenses", router);

const port = Number(process.env.PORT) || 8080;

const ip = process.env.IP || "127.0.0.1";

app.listen(port, ip, () => {
  console.log(`The server is listening the ${port} port`);
});
