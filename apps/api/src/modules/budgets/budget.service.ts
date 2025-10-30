import { BudgetsRepository, TenantScopedQuery } from "@iei/domain";
import { prisma } from "../../lib/prisma";
import type { Budget } from "@iei/domain";

interface CreateBudgetData {
  tenantId: string;
  name: string;
  amount: number;
  period: string;
}

export class BudgetService implements BudgetsRepository {
  async list(input: TenantScopedQuery): Promise<Budget[]> {
    const budgets = await prisma.budget.findMany({
      where: { tenantId: input.tenantId }
    });

    return budgets.map((budget) => ({
      id: budget.id,
      tenantId: budget.tenantId,
      name: budget.name,
      amount: Number(budget.amount),
      period: budget.period as "monthly" | "quarterly" | "yearly"
    }));
  }

  async create(input: CreateBudgetData): Promise<Budget> {
    const budget = await prisma.budget.create({
      data: {
        tenantId: input.tenantId,
        name: input.name,
        amount: input.amount,
        period: input.period
      }
    });

    return {
      id: budget.id,
      tenantId: budget.tenantId,
      name: budget.name,
      amount: Number(budget.amount),
      period: budget.period as "monthly" | "quarterly" | "yearly"
    };
  }
}

export const budgetService = new BudgetService();

