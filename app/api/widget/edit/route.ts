import { db } from "@/lib/db"
import * as z from "zod"
import {auth, currentUser} from "@clerk/nextjs";

const PostEditWidgetSchema = z.object({
    id: z.string(),
    name: z.string().min(3).max(128),
    tag: z.array(z.object({
        id: z.string(),
        name: z.string(),
        userId: z.string(),
    })),
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
    const body = PostEditWidgetSchema.parse(json)

    const widgetOnTags = await db.widget.update({
        where: {
            id: body.id
        },
        data: {
            title: body.name,
            widgetsOnTags: {
                deleteMany: {},
                create: body.tag.map((tag) => {
                    return {
                        tag: {
                            connect: {
                                id: tag.id
                            }
                        }
                    }
                })
            }
        }
        
    })

    return new Response(JSON.stringify(widgetOnTags))
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify(error.issues), { status: 422 })
    }

    console.error(error)

    return new Response(null, { status: 500 })
  }
}
