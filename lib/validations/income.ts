import { z } from "zod";

export const IncomeSchema = z.object({
    name: z.string().min(3).max(128).nonempty("Name is required"),
    amount: z.number().min(0.01, "Amount must be greater than 0")
})
