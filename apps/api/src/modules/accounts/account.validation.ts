import { z } from "zod";

export const CreateAccountSchema = z.object({
  name: z.string().min(1, "Account name is required"),
  type: z.string().min(1, "Account type is required"),
  balance: z.number().default(0)
});

export const UpdateAccountSchema = z.object({
  name: z.string().min(1).optional(),
  type: z.string().min(1).optional(),
  balance: z.number().optional()
});

export const GetAccountSchema = z.object({
  id: z.string().min(1)
});

export type CreateAccountInput = z.infer<typeof CreateAccountSchema>;
export type UpdateAccountInput = z.infer<typeof UpdateAccountSchema>;
export type GetAccountInput = z.infer<typeof GetAccountSchema>;

