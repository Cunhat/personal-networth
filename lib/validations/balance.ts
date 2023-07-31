import * as z from "zod"

export const PostBalanceSchema = z.object({
    balance: z.number().positive("Balance must be positive"),
    createdAt: z.date({
        required_error: "A date is required.",
      })
})
