import { Request, Response, NextFunction } from "express";
import { budgetService } from "./budget.service";
import { CreateBudgetSchema } from "./budget.validation";

export class BudgetController {
  async list(req: Request, res: Response, next: NextFunction) {
    try {
      const budgets = await budgetService.list({ tenantId: req.tenantId! });
      return res.json({ data: budgets });
    } catch (err) {
      return next(err);
    }
  }

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const input = CreateBudgetSchema.parse(req.body);
      const budget = await budgetService.create({
        ...input,
        tenantId: req.tenantId!
      });
      return res.status(201).json({ data: budget });
    } catch (err) {
      return next(err);
    }
  }
}

export const budgetController = new BudgetController();

