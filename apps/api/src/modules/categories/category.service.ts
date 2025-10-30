import { CategoriesRepository, TenantScopedQuery } from "@iei/domain";
import { prisma } from "../../lib/prisma";
import type { Category } from "@iei/domain";

interface CreateCategoryData {
  tenantId: string;
  name: string;
  kind: "INCOME" | "EXPENSE" | "INVEST";
}

export class CategoryService implements CategoriesRepository {
  async list(input: TenantScopedQuery): Promise<Category[]> {
    const categories = await prisma.category.findMany({
      where: { tenantId: input.tenantId }
    });

    return categories.map((cat) => ({
      id: cat.id,
      tenantId: cat.tenantId,
      name: cat.name,
      kind: cat.kind
    }));
  }

  async create(input: CreateCategoryData): Promise<Category> {
    const category = await prisma.category.create({
      data: {
        tenantId: input.tenantId,
        name: input.name,
        kind: input.kind
      }
    });

    return {
      id: category.id,
      tenantId: category.tenantId,
      name: category.name,
      kind: category.kind
    };
  }
}

export const categoryService = new CategoryService();

