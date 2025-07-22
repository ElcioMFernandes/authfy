import { z } from "zod";
import { Request, Response, NextFunction } from "express";

export const validateBody = (schema: z.ZodSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      const validated = schema.parse(req.body);
      req.body = validated;
      next();
    } catch (error) {
      if (error instanceof z.ZodError) {
        const errors = error.issues.map((err: z.ZodIssue) => ({
          field: err.path.join("."),
          message: err.message,
        }));

        res.status(400).json({
          message: "Validation error",
          errors,
        });
      }

      res.status(500).json({ message: "Internal server error" });
    }
  };
};
