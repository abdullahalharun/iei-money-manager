import { z } from "zod";
import { CategoryKind } from "@iei/shared";

export const CreateCategorySchema = z.object({
  name: z.string().min(1, "Category name is required"),
  kind: CategoryKind
});

export const GetCategorySchema = z.object({
  id: z.string().min(1)
});

export type CreateCategoryInput = z.infer<typeof CreateCategorySchema>;
export type GetCategoryInput = z.infer<typeof GetCategorySchema>;

