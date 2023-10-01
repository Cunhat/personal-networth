import * as z from "zod"

export const PostWidgetSchema = z.object({
  name: z.string().min(3).max(128).nonempty("Name is required"),
  tag: z.string().array().nonempty("At least ine Tag is required"),
})
