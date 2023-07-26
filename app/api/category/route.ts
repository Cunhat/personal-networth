import { db } from "@/lib/db"
import * as z from "zod"
import {auth, currentUser} from "@clerk/nextjs";


const postCreateSchema = z.object({
  title: z.string(),
  content: z.string().optional(),
})

export async function GET() {
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

    const categories = await db.category.findMany({
        select: {
            id: true,
            name: true,
            userId: true,
            type: true,
        },
        where: {
            userId: userDb.id
        }
    })

    return new Response(JSON.stringify(categories))
  } catch (error) {
    return new Response(null, { status: 500 })
  }
}

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

    const category = await db.category.create({
        data: {
            name: json.name,
            type: "teste",
            userId: userDb.id
        }
    })
  

    return new Response(JSON.stringify(category))
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify(error.issues), { status: 422 })
    }

    return new Response(null, { status: 500 })
  }
}
