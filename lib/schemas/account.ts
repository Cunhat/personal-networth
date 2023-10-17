import { z } from "zod";
import { CategorySchema } from "./category";

export const AccountSchema = z.object({
    name: z.string(),
    id: z.string(),
    userId: z.string().optional(),
    category: CategorySchema.nullish(),
    categoryId: z.string().nullish(),
    balance: z.array(z.object({
      id: z.string(),
      balance: z.number(),
      createdAt: z.date(),
    })),
    tags: z.array(z.object({
      tagId: z.string(),
      accountId: z.string(),
      assignedAt: z.date(),
      assignedBy: z.string(),
      tag: z.object({
        id: z.string(),
        name: z.string(),
        userId: z.string(),
      }),
    })).optional(),
  })
  
 export type Account = z.infer<typeof AccountSchema> 

