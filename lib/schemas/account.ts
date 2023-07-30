import { z } from "zod";
import { CategorySchema } from "./category";

export const AccountSchema = z.object({
    name: z.string(),
    id: z.string(),
    userId: z.string(),
    category: CategorySchema,
    categoryId: z.string(),
  })
  
 export type Account = z.infer<typeof AccountSchema> 