import { z } from "zod";

export const IdSchema = z.string().min(1);

export const TenantScoped = z.object({
  tenantId: z.string().min(1)
});

export const Money = z.number();

export const CategoryKind = z.enum(["INCOME", "EXPENSE", "INVEST"]);

export type TenantScoped = z.infer<typeof TenantScoped>;
export type CategoryKind = z.infer<typeof CategoryKind>;

