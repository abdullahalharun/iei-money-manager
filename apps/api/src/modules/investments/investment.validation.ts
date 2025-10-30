import { z } from "zod";

export const CreateInvestmentSchema = z.object({
  name: z.string().min(1, "Investment name is required"),
  amount: z.number().positive("Amount must be positive")
});

export const GetInvestmentSchema = z.object({
  id: z.string().min(1)
});

export type CreateInvestmentInput = z.infer<typeof CreateInvestmentSchema>;
export type GetInvestmentInput = z.infer<typeof GetInvestmentSchema>;

