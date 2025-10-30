import type { Account, Category, Transaction, Budget, Investment } from ".";

export interface TenantScopedQuery {
  tenantId: string;
}

export interface AccountsRepository {
  list(input: TenantScopedQuery): Promise<Account[]>;
  get(input: TenantScopedQuery & { id: string }): Promise<Account | null>;
  create(input: Omit<Account, "id">): Promise<Account>;
  update(input: TenantScopedQuery & { id: string } & Partial<Omit<Account, "id" | "tenantId">>): Promise<Account>;
  delete(input: TenantScopedQuery & { id: string }): Promise<void>;
}

export interface CategoriesRepository {
  list(input: TenantScopedQuery): Promise<Category[]>;
}

export interface TransactionsRepository {
  list(input: TenantScopedQuery & { accountId?: string }): Promise<Transaction[]>;
}

export interface BudgetsRepository {
  list(input: TenantScopedQuery): Promise<Budget[]>;
}

export interface InvestmentsRepository {
  list(input: TenantScopedQuery): Promise<Investment[]>;
}

