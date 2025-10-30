import { Request, Response, NextFunction } from "express";
import { accountService } from "./account.service";
import {
  CreateAccountSchema,
  UpdateAccountSchema,
  GetAccountSchema
} from "./account.validation";

export class AccountController {
  // List all accounts for tenant
  async list(req: Request, res: Response, next: NextFunction) {
    try {
      const accounts = await accountService.list({ tenantId: req.tenantId! });
      return res.json({ data: accounts });
    } catch (err) {
      return next(err);
    }
  }

  // Get single account
  async get(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = GetAccountSchema.parse(req.params);
      const account = await accountService.get({
        id,
        tenantId: req.tenantId!
      });

      if (!account) {
        return res.status(404).json({ error: "Account not found" });
      }

      return res.json({ data: account });
    } catch (err) {
      return next(err);
    }
  }

  // Create account
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const input = CreateAccountSchema.parse(req.body);
      const account = await accountService.create({
        ...input,
        tenantId: req.tenantId!
      });
      return res.status(201).json({ data: account });
    } catch (err) {
      return next(err);
    }
  }

  // Update account
  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = GetAccountSchema.parse(req.params);
      const input = UpdateAccountSchema.parse(req.body);
      const account = await accountService.update({
        id,
        ...input,
        tenantId: req.tenantId!
      });
      return res.json({ data: account });
    } catch (err) {
      return next(err);
    }
  }

  // Delete account
  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = GetAccountSchema.parse(req.params);
      await accountService.delete({ id, tenantId: req.tenantId! });
      return res.status(204).send();
    } catch (err) {
      return next(err);
    }
  }
}

export const accountController = new AccountController();

