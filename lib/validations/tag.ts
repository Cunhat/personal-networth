import * as z from "zod"

export const PostTagSchema = z.object({
  name: z.string().min(3).max(128),
})
