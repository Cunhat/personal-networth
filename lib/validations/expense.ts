import { z } from "zod";

export const ExpenseSchema = z.object({
    name: z.string().min(3).max(128).nonempty("Name is required"),
    amount: z.number().nonnegative("Amount must be positive"),
    firstOccurrence:  z.date({
        required_error: "A date is required.",
      }),
    numberOfOccurrences: z.number().nonnegative("Number of occurrences must be positive"),
  })