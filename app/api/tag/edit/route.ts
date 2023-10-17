import { db } from "@/lib/db"
import * as z from "zod"
import {auth, currentUser} from "@clerk/nextjs";


const PostEditTagSchema = z.object({
    name: z.string().min(3).max(128),
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
    const body = PostEditTagSchema.parse(json)

    const category = await db.tag.update({
        where: {
            id: body.id
        },
        data: {...body}
    })
  

    return new Response(JSON.stringify(category))
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify(error.issues), { status: 422 })
    }

    return new Response(null, { status: 500 })
  }
}
