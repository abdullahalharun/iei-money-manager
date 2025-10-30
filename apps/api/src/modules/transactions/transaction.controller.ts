import { Request, Response, NextFunction } from "express";
import { transactionService } from "./transaction.service";
import {
  CreateTransactionSchema,
  ListTransactionSchema
} from "./transaction.validation";

export class TransactionController {
  async list(req: Request, res: Response, next: NextFunction) {
    try {
      const query = ListTransactionSchema.parse(req.query);
      const transactions = await transactionService.list({
        tenantId: req.tenantId!,
        accountId: query.accountId
      });
      return res.json({ data: transactions });
    } catch (err) {
      return next(err);
    }
  }

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const input = CreateTransactionSchema.parse(req.body);
      const transaction = await transactionService.create({
        ...input,
        tenantId: req.tenantId!
      });
      return res.status(201).json({ data: transaction });
    } catch (err) {
      return next(err);
    }
  }
}

export const transactionController = new TransactionController();

