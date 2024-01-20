import { z } from "zod";

export const ExpensesSchema = z.object({
    name: z.string().min(3).max(128).nonempty("Name is required"),
    amount: z.number().min(0.01, "Amount must be greater than 0")
  })

export const ExpensesApiSchema = z.object({
    name: z.string().min(3).max(128).nonempty("Name is required"),
    amount: z.number().min(0.01, "Amount must be greater than 0"),
    months: z.string().min(1)
  })