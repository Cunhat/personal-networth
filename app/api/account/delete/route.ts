import { db } from "@/lib/db"
import * as z from "zod"
import {currentUser} from "@clerk/nextjs";


const PostDeleteAccountSchema = z.object({
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

    const body = PostDeleteAccountSchema.parse(json)
    const response = await db.account.delete({
        where: {
            id: body.id
        }
    })

    return new Response(JSON.stringify(response))
    
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify(error.issues), { status: 422 })
    }

    console.log(error)

    return new Response(null, { status: 500 })
  }
}
