import * as z from "zod"

export const PostCategorySchema = z.object({
  name: z.string().min(3).max(128),
  type: z.string().min(3).max(128),
})
