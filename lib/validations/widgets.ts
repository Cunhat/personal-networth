import * as z from "zod"

export const PostWidgetSchema = z.object({
  name: z.string().min(3).max(128).nonempty("Name is required"),
  tag: z.array(z.object({
      id: z.string(),
      name: z.string(),
      userId: z.string(),
  })),
})
