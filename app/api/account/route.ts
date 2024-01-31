import { db } from "@/lib/db"
import * as z from "zod"
import {currentUser} from "@clerk/nextjs";


const PostAccountSchema = z.object({
  name: z.string(),
  category: z.string(),
  tag: z.string().optional(),
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
    let account

    console.log(body)

    if(body.tag === undefined) {
        account = await db.account.create({
            data: {name: body.name, categoryId: body.category, userId: userDb.id}
        })
        return new Response(JSON.stringify(account))
    } else {
        account = await db.account.create({
          data: {name: body.name, categoryId: body.category, userId: userDb.id, tags: {
              create: [
                {
                  assignedAt: new Date(),
                  assignedBy: userDb.id,
                  tag:{
                    connect: {
                      id: body.tag
                    }
                  }
                }
              ]
          }}
      })
    }

    return new Response(JSON.stringify(account))
    
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify(error.issues), { status: 422 })
    }

    console.log(error)

    return new Response(null, { status: 500 })
  }
}
