import { AccountsRepository, TenantScopedQuery } from "@iei/domain";
import { prisma } from "../../lib/prisma";
import { AppError } from "../../lib/errors";
import type { Account } from "@iei/domain";
import type { CreateAccountData, UpdateAccountData } from "./account.types";

export class AccountService implements AccountsRepository {
  async list(input: TenantScopedQuery): Promise<Account[]> {
    const accounts = await prisma.account.findMany({
      where: { tenantId: input.tenantId }
    });

    return accounts.map((acc) => ({
      id: acc.id,
      tenantId: acc.tenantId,
      name: acc.name,
      type: acc.type,
      balance: Number(acc.balance)
    }));
  }

  async get(input: TenantScopedQuery & { id: string }): Promise<Account | null> {
    const account = await prisma.account.findFirst({
      where: {
        id: input.id,
        tenantId: input.tenantId
      }
    });

    if (!account) return null;

    return {
      id: account.id,
      tenantId: account.tenantId,
      name: account.name,
      type: account.type,
      balance: Number(account.balance)
    };
  }

  async create(input: CreateAccountData): Promise<Account> {
    const account = await prisma.account.create({
      data: {
        tenantId: input.tenantId,
        name: input.name,
        type: input.type,
        balance: input.balance
      }
    });

    return {
      id: account.id,
      tenantId: account.tenantId,
      name: account.name,
      type: account.type,
      balance: Number(account.balance)
    };
  }

  async update(input: UpdateAccountData): Promise<Account> {
    // Verify account belongs to tenant
    const existing = await this.get({ id: input.id, tenantId: input.tenantId });
    if (!existing) {
      throw new AppError(404, "Account not found", "ACCOUNT_NOT_FOUND");
    }

    const account = await prisma.account.update({
      where: { id: input.id },
      data: {
        name: input.name,
        type: input.type,
        balance: input.balance
      }
    });

    return {
      id: account.id,
      tenantId: account.tenantId,
      name: account.name,
      type: account.type,
      balance: Number(account.balance)
    };
  }

  async delete(input: TenantScopedQuery & { id: string }): Promise<void> {
    // Verify account belongs to tenant
    const existing = await this.get({ id: input.id, tenantId: input.tenantId });
    if (!existing) {
      throw new AppError(404, "Account not found", "ACCOUNT_NOT_FOUND");
    }

    // Check if account has transactions
    const hasTransactions = await prisma.transaction.count({
      where: { accountId: input.id }
    });

    if (hasTransactions > 0) {
      throw new AppError(
        400,
        "Cannot delete account with existing transactions",
        "ACCOUNT_HAS_TRANSACTIONS"
      );
    }

    await prisma.account.delete({
      where: { id: input.id }
    });
  }
}

export const accountService = new AccountService();

