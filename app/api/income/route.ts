import { db } from "@/lib/db"
import * as z from "zod"
import { currentUser} from "@clerk/nextjs";
import { IncomeSchema } from "@/lib/validations/income";


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

    const body = IncomeSchema.parse(json)

   const income = await db.income.create({
         data: {
          name: body.name,
          amount: body.amount,
          userId: userDb.id
         }
    })
   
    
    return new Response(JSON.stringify(income))
  } catch (error) {
    console.error(error)
    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify(error.issues), { status: 422 })
    }

    return new Response(null, { status: 500 })
  }
}
