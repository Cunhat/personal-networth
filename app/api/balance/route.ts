import { db } from "@/lib/db"
import * as z from "zod"
import {currentUser} from "@clerk/nextjs";


const PostAccountSchema = z.object({
  balance: z.number().transform( arg => parseFloat(arg.toFixed(2))),
  createdAt: z.string().or( z.date() ).transform( arg => new Date( arg ) ),
  accountId: z.string(),
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
    
    const body = PostAccountSchema.parse(json)

    const balance = await db.balance.create({
        data: {balance: body.balance, createdAt: body.createdAt, accountId: body.accountId, userId: userDb.id}
    })
  

    return new Response(JSON.stringify(balance))
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify(error.issues), { status: 422 })
    }

    return new Response(null, { status: 500 })
  }
}
