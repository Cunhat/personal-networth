import { db } from "@/lib/db"
import * as z from "zod"
import { currentUser} from "@clerk/nextjs";

 const ExpensesApiSchema = z.object({
    id: z.string(),
    name: z.string(),
    amount: z.number(),
    months: z.string()
   })

export async function POST(req: Request) {
  try {
    const user = await currentUser()

    if (!user) {
      return new Response("Unauthorized", { status: 403 })
    }

    const userDb = await db.user.findUnique({
        where: {
            email: user?.emailAddresses[0].emailAddress ?? ''
        }
    })

    if (!userDb) {
        return new Response("Unauthorized", { status: 403 })
    }

    const json = await req.json()

    const body = ExpensesApiSchema.parse(json)

  

   const expense = await db.expense.update({
        where: {
            id: body.id
        },
        data: {
            name: body.name,
            amount: body.amount,
            months: body.months
        }
   })
   
    
    return new Response(JSON.stringify(expense))
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify(error.issues), { status: 422 })
    }

    return new Response(null, { status: 500 })
  }
}
