import { z } from "zod";

export const CreateBudgetSchema = z.object({
  name: z.string().min(1, "Budget name is required"),
  amount: z.number().positive("Amount must be positive"),
  period: z.enum(["monthly", "quarterly", "yearly"])
});

export const GetBudgetSchema = z.object({
  id: z.string().min(1)
});

export type CreateBudgetInput = z.infer<typeof CreateBudgetSchema>;
export type GetBudgetInput = z.infer<typeof GetBudgetSchema>;

