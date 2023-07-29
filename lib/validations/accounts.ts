import * as z from "zod"

export const PostAccountSchema = z.object({
  name: z.string().min(3).max(128),
  category: z.string(),
})
