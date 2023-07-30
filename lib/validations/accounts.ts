import * as z from "zod"
import { Prisma } from "@prisma/client"

export const PostAccountSchema = z.object({
  name: z.string().min(3).max(128).nonempty(),
  category: z.string(),
})
