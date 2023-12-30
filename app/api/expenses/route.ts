import { db } from "@/lib/db"
import * as z from "zod"
import { currentUser} from "@clerk/nextjs";
import { PostExpensesSchema } from "@/lib/validations/expenses";


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

    const body = PostExpensesSchema.parse(json)

    console.log(body)

   const expense = await db.expense.create({
         data: {
          name: body.name,
          amount: body.amount,
          firstOccurrence: body.firstOccurrence,
          numberOfOccurrences: body.numberOfOccurrences,
          userId: userDb.id
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
