import "dotenv/config";
import express, { NextFunction, Request, Response } from "express";
import notesRoute from "./routes/notes";
import morgan from "morgan";
import createHttpError, { isHttpError } from "http-errors";

import cors from 'cors';

const app = express();

app.use(cors());

app.use(express.json());
app.use(morgan("dev"));

app.use("/api/notes", notesRoute);

app.use((req, res, next) => {
  next(createHttpError(404, "Endpoint not found!"));
});

app.use((error: unknown, req: Request, res: Response, _next: NextFunction) => {
  console.error(error);
  let errorMessage = "An unknown error occured!";
  let statusCode = 500;

  if (isHttpError(error)) {
    statusCode = error.statusCode;
    errorMessage = error.message;
  }
  return res.status(statusCode).json({ error: errorMessage });
});

export default app;
