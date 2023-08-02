import { z } from "zod";
import { CategorySchema } from "./category";

export const AccountSchema = z.object({
    name: z.string(),
    id: z.string(),
    userId: z.string(),
    category: CategorySchema,
    categoryId: z.string(),
    balance: z.array(z.object({
      id: z.string(),
      balance: z.number(),
      createdAt: z.date(),
    })),
  })
  
 export type Account = z.infer<typeof AccountSchema> 