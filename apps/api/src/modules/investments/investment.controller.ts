import { Request, Response, NextFunction } from "express";
import { investmentService } from "./investment.service";
import { CreateInvestmentSchema } from "./investment.validation";

export class InvestmentController {
  async list(req: Request, res: Response, next: NextFunction) {
    try {
      const investments = await investmentService.list({
        tenantId: req.tenantId!
      });
      return res.json({ data: investments });
    } catch (err) {
      return next(err);
    }
  }

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const input = CreateInvestmentSchema.parse(req.body);
      const investment = await investmentService.create({
        ...input,
        tenantId: req.tenantId!
      });
      return res.status(201).json({ data: investment });
    } catch (err) {
      return next(err);
    }
  }
}

export const investmentController = new InvestmentController();

