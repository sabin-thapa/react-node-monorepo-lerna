import { NextFunction, Request, Response } from "express";
import { z, AnyZodObject } from "zod";

export const validateSchema =
  (schema: AnyZodObject) =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req.body);

      next();
    } catch (error) {
      res.status(400).json(error);
    }
  };
