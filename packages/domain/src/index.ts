import { z } from "zod";
import { TenantScoped, Money, CategoryKind, IdSchema } from "@iei/shared";

export const Account = TenantScoped.extend({
  id: IdSchema,
  name: z.string().min(1),
  type: z.string().min(1),
  balance: Money
});

export const Category = TenantScoped.extend({
  id: IdSchema,
  name: z.string().min(1),
  kind: CategoryKind
});

export const Transaction = TenantScoped.extend({
  id: IdSchema,
  accountId: IdSchema,
  categoryId: IdSchema.optional(),
  amount: Money,
  note: z.string().optional(),
  occurredAt: z.date()
});

export const Budget = TenantScoped.extend({
  id: IdSchema,
  name: z.string().min(1),
  amount: Money,
  period: z.enum(["monthly", "quarterly", "yearly"]) 
});

export const Investment = TenantScoped.extend({
  id: IdSchema,
  name: z.string().min(1),
  amount: Money
});

export type Account = z.infer<typeof Account>;
export type Category = z.infer<typeof Category>;
export type Transaction = z.infer<typeof Transaction>;
export type Budget = z.infer<typeof Budget>;
export type Investment = z.infer<typeof Investment>;

// Re-export repository interfaces
export * from "./repositories";

