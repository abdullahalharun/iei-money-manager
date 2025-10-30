import { Request, Response, NextFunction } from "express";
import { ZodError } from "zod";

export class AppError extends Error {
  constructor(
    public statusCode: number,
    public message: string,
    public code?: string
  ) {
    super(message);
    this.name = "AppError";
  }
}

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Zod validation errors
  if (err instanceof ZodError) {
    return res.status(400).json({
      error: "Validation failed",
      details: err.errors
    });
  }

  // App errors
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      error: err.message,
      code: err.code
    });
  }

  // Unknown errors
  console.error("Unhandled error:", err);
  return res.status(500).json({
    error: "Internal server error",
    message: process.env.NODE_ENV === "development" ? err.message : undefined
  });
};

