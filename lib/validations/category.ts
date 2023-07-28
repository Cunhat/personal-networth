import * as z from "zod"

export const postCategorySchema = z.object({
  name: z.string().min(3).max(128),
  type: z.string().min(3).max(128),
})
