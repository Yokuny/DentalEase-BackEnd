import express, { Application, Request, Response } from "express";
import cors from "cors";
import { config } from "dotenv";
import * as route from "./routers";
import { dbConnect } from "./database";

const app: Application = express();
config();

app
  .use(express.json())
  .use(cors())
  .get("/", (_req: Request, res: Response) => res.send("Welcome to the Dental Ease API!"))
  .get("/health", (_req: Request, res: Response) => res.send("OK!"))
  .get("/time", (_req: Request, res: Response) => res.send(new Date()))
  .use("/user", route.userRoute)
  .use("/patient", route.patientRoute)
  .use("/odontogram", route.odontogramRoute);

export function init(): Promise<express.Application> {
  dbConnect();
  return Promise.resolve(app);
}

export default app;
