import { Request, Response, NextFunction } from "express";
import { categoryService } from "./category.service";
import { CreateCategorySchema } from "./category.validation";

export class CategoryController {
  async list(req: Request, res: Response, next: NextFunction) {
    try {
      const categories = await categoryService.list({ tenantId: req.tenantId! });
      return res.json({ data: categories });
    } catch (err) {
      return next(err);
    }
  }

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const input = CreateCategorySchema.parse(req.body);
      const category = await categoryService.create({
        ...input,
        tenantId: req.tenantId!
      });
      return res.status(201).json({ data: category });
    } catch (err) {
      return next(err);
    }
  }
}

export const categoryController = new CategoryController();

