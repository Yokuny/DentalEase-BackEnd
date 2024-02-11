import express, { Application, Request, Response } from "express";
import cors from "cors";
import { config } from "dotenv";
import * as route from "./routers";
import { errorHandler } from "./middlewares/errorHandler.middleware";
import { dbConnect } from "./database";

const app: Application = express();
config();

const corsOptions = {
  credentials: true,
  allowedHeaders: ["Content-Type", "Authorization"],
  methods: ["GET", "POST", "PUT", "DELETE"],
};

app
  .use(express.json())
  .use(cors(corsOptions))
  .get("/", (_req: Request, res: Response) => res.send("Welcome to the Dental Ease API!"))
  .get("/health", (_req: Request, res: Response) => res.send("OK!"))
  .get("/time", (_req: Request, res: Response) => res.send(new Date()))
  .use("/user", route.userRoute)
  .use("/clinic", route.clinicRoute)
  .use("/patient", route.patientRoute)
  .use("/odontogram", route.odontogramRoute)
  .use("/service", route.serviceRoute)
  .use("/schedule", route.scheduleRoute);

app.use("*", (_req: Request, res: Response) => res.status(404).send({ message: "Route not found" }));
app.use(errorHandler);

export function init(): Promise<express.Application> {
  dbConnect();
  return Promise.resolve(app);
}

export default app;
