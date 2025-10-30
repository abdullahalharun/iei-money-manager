import { Request, Response, NextFunction } from "express";
import { authService } from "./auth.service";
import { SignupSchema, LoginSchema } from "./auth.validation";

export class AuthController {
  async signup(req: Request, res: Response, next: NextFunction) {
    try {
      const input = SignupSchema.parse(req.body);
      const result = await authService.signup(input);
      return res.status(201).json({ data: result });
    } catch (err) {
      return next(err);
    }
  }

  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const input = LoginSchema.parse(req.body);
      const result = await authService.login(input);
      return res.json({ data: result });
    } catch (err) {
      return next(err);
    }
  }
}

export const authController = new AuthController();

