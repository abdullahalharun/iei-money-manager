import { Request, Response, NextFunction } from "express";

// Tenant middleware that falls back to default for development
// Used after auth middleware sets tenantId from JWT
export const tenantMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // If tenantId not set by auth middleware (for public routes), use default
  if (!req.tenantId) {
    req.tenantId = "default-tenant-id";
  }
  next();
};

