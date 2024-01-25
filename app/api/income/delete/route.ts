import { db } from "@/lib/db"
import * as z from "zod"
import {auth, currentUser} from "@clerk/nextjs";


const PostDeleteIncomeSchema = z.object({
    id: z.string(),
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
    const body = PostDeleteIncomeSchema.parse(json)

   
    const income = await db.income.delete({
        where: {
            id: body.id
        }
    })
  
    return new Response(JSON.stringify(income))
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify(error.issues), { status: 422 })
    }

    console.error(error)

    return new Response(null, { status: 500 })
  }
}
