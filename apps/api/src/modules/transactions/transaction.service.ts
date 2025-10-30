import { TransactionsRepository, TenantScopedQuery } from "@iei/domain";
import { prisma } from "../../lib/prisma";
import { AppError } from "../../lib/errors";
import type { Transaction } from "@iei/domain";
import type { CreateTransactionInput } from "./transaction.validation";

interface CreateTransactionData extends CreateTransactionInput {
  tenantId: string;
}

export class TransactionService implements TransactionsRepository {
  async list(
    input: TenantScopedQuery & { accountId?: string }
  ): Promise<Transaction[]> {
    const where: any = { tenantId: input.tenantId };
    if (input.accountId) {
      where.accountId = input.accountId;
    }

    const transactions = await prisma.transaction.findMany({
      where,
      include: {
        account: true,
        category: true
      },
      orderBy: {
        occurredAt: "desc"
      }
    });

    return transactions.map((tx) => ({
      id: tx.id,
      tenantId: tx.tenantId,
      accountId: tx.accountId,
      categoryId: tx.categoryId || undefined,
      amount: Number(tx.amount),
      note: tx.note || undefined,
      occurredAt: tx.occurredAt
    }));
  }

  async create(input: CreateTransactionData): Promise<Transaction> {
    // Verify account exists and belongs to tenant
    const account = await prisma.account.findFirst({
      where: {
        id: input.accountId,
        tenantId: input.tenantId
      }
    });

    if (!account) {
      throw new AppError(404, "Account not found", "ACCOUNT_NOT_FOUND");
    }

    // Verify category exists if provided
    if (input.categoryId) {
      const category = await prisma.category.findFirst({
        where: {
          id: input.categoryId,
          tenantId: input.tenantId
        }
      });

      if (!category) {
        throw new AppError(404, "Category not found", "CATEGORY_NOT_FOUND");
      }
    }

    // Convert string to Date if needed
    const occurredAtDate = typeof input.occurredAt === "string" 
      ? new Date(input.occurredAt) 
      : input.occurredAt;

    const transaction = await prisma.transaction.create({
      data: {
        tenantId: input.tenantId,
        accountId: input.accountId,
        categoryId: input.categoryId,
        amount: input.amount,
        note: input.note,
        occurredAt: occurredAtDate
      }
    });

    // Update account balance
    await prisma.account.update({
      where: { id: input.accountId },
      data: {
        balance: {
          increment: input.amount
        }
      }
    });

    return {
      id: transaction.id,
      tenantId: transaction.tenantId,
      accountId: transaction.accountId,
      categoryId: transaction.categoryId || undefined,
      amount: Number(transaction.amount),
      note: transaction.note || undefined,
      occurredAt: transaction.occurredAt
    };
  }
}

export const transactionService = new TransactionService();

