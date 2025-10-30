import { z } from "zod";

export const CreateTransactionSchema = z.object({
  accountId: z.string().min(1, "Account ID is required"),
  categoryId: z.string().optional(),
  amount: z.number(),
  note: z.string().optional(),
  occurredAt: z.string().datetime({ message: "Invalid date format" })
});

export const GetTransactionSchema = z.object({
  id: z.string().min(1)
});

export const ListTransactionSchema = z.object({
  accountId: z.string().optional()
});

export type CreateTransactionInput = z.infer<typeof CreateTransactionSchema>;
export type GetTransactionInput = z.infer<typeof GetTransactionSchema>;
export type ListTransactionInput = z.infer<typeof ListTransactionSchema>;

