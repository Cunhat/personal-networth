import * as z from "zod"

export const CategorySchema = z.object({
  name: z.string(),
  type: z.string(),
  id: z.string(),
  userId: z.string(),
})

export type Category = z.infer<typeof CategorySchema>
