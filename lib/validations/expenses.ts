import { z } from "zod";

export const ExpensesSchema = z.object({
    name: z.string().min(3).max(128).nonempty("Name is required"),
    amount: z.number().min(0.01, "Amount must be greater than 0"),
    firstOccurrence: z.string().or( z.date() ).transform( arg => new Date( arg ) ),
    numberOfOccurrences: z.number().min(1, "Number of occurrences must be greater than 0").max(12, "Number of occurrences must be less than 12").refine((value) => 12 % value === 0, {
      message: 'Please a valid monthly payment.',
    }),
  })