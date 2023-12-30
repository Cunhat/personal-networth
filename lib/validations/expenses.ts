import { z } from "zod";

export const PostExpensesSchema = z.object({
    name: z.string().min(3).max(128).nonempty("Name is required"),
    amount: z.number().min(0.01, "Amount must be greater than 0"),
    firstOccurrence: z.string().or( z.date() ).transform( arg => new Date( arg ) ),
    numberOfOccurrences: z.number().min(1, "Number of occurrences must be greater than 0"),
  })