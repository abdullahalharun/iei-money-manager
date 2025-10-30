import { InvestmentsRepository, TenantScopedQuery } from "@iei/domain";
import { prisma } from "../../lib/prisma";
import type { Investment } from "@iei/domain";

interface CreateInvestmentData {
  tenantId: string;
  name: string;
  amount: number;
}

export class InvestmentService implements InvestmentsRepository {
  async list(input: TenantScopedQuery): Promise<Investment[]> {
    const investments = await prisma.investment.findMany({
      where: { tenantId: input.tenantId }
    });

    return investments.map((inv) => ({
      id: inv.id,
      tenantId: inv.tenantId,
      name: inv.name,
      amount: Number(inv.amount)
    }));
  }

  async create(input: CreateInvestmentData): Promise<Investment> {
    const investment = await prisma.investment.create({
      data: {
        tenantId: input.tenantId,
        name: input.name,
        amount: input.amount
      }
    });

    return {
      id: investment.id,
      tenantId: investment.tenantId,
      name: investment.name,
      amount: Number(investment.amount)
    };
  }
}

export const investmentService = new InvestmentService();

