import { db } from "@/lib/db"
import * as z from "zod"
import {currentUser} from "@clerk/nextjs";


const PostAccountSchema = z.object({
  accountId: z.string(),
  tag: z.string(),
})

export async function POST(req: Request) {
  try {
    console.log("INNNNNNNNNN")
   
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
    

    account = await db.account.update({
        where: {
            id: body.accountId
        },
        data: {
            tags: {
                create: [
                    {
                        assignedAt: new Date(),
                        assignedBy: userDb.id,
                        tag: {
                            connect: {
                                id: body.tag
                            }
                        }
                    }
                ]
            }
        }
    })

    return new Response(JSON.stringify(account))
    
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify(error.issues), { status: 422 })
    }

    console.log(error)

    return new Response(null, { status: 500 })
  }
}
