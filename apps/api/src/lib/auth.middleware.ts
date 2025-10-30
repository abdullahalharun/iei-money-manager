import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { AppError } from "./errors";

const JWT_SECRET = process.env.JWT_SECRET || "change-me-in-production";

interface JWTPayload {
  userId: string;
  tenantId: string;
}

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      throw new AppError(401, "Missing or invalid token", "UNAUTHORIZED");
    }

    const token = authHeader.substring(7);
    const decoded = jwt.verify(token, JWT_SECRET) as JWTPayload;

    req.userId = decoded.userId;
    req.tenantId = decoded.tenantId;

    next();
  } catch (err) {
    if (err instanceof AppError) {
      return next(err);
    }
    return next(new AppError(401, "Invalid token", "UNAUTHORIZED"));
  }
};

// Extend Express Request type
declare global {
  namespace Express {
    interface Request {
      userId?: string;
      tenantId?: string;
    }
  }
}

