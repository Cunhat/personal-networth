import { db } from "@/lib/db"
import * as z from "zod"
import {auth, currentUser} from "@clerk/nextjs";
import { PostChartSchema } from "@/lib/validations/pieCharts";


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

    const body = PostChartSchema.parse(json)

    console.log(body)

    const pieChart = await db.pieChart.create({
        data: {
            title: body.name,
            userId: userDb.id,
            pieChartsOnTags: {
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
    
    return new Response(JSON.stringify(pieChart))
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify(error.issues), { status: 422 })
    }

    return new Response(null, { status: 500 })
  }
}
