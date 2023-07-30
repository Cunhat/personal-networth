import * as z from "zod"
import { Prisma } from "@prisma/client"

export const PostAccountSchema = z.object({
  name: z.string().min(3).max(128).nonempty("Name is required"),
  category: z.string().nonempty("Category is required"),
})
