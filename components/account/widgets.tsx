import { redirect } from "next/navigation"
import { currentUser } from "@clerk/nextjs"

import { db } from "@/lib/db"

import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { CreateWidget } from "./create-widget"

export const Widgets = async () => {
  const user = await currentUser()

  if (!user) {
    redirect("/sign-in")
  }

  const userDb = await db.user.findUnique({
    where: {
      email: user?.emailAddresses[0].emailAddress ?? "",
    },
  })

  const tags = await db.tag.findMany({
    select: {
      id: true,
      name: true,
      userId: true,
    },
    where: {
      userId: userDb?.id,
    },
  })

  const widgets = await db.widget.findMany({
    include: {
      widgetsOnTags: true,
    },
    where: {
      userId: userDb?.id,
    },
  })

  console.log(widgets)

  return (
    <div>
      <Card className="">
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Widgets</CardTitle>
            <CreateWidget tags={tags} />
          </div>
        </CardHeader>
        <CardContent className="flex gap-3 wrap">
          {widgets.map((widget) => (
            <Card className="flex flex-col md:w-fit w-full">
              <div className="flex flex-col gap-1 p-4">
                <p className="text-muted-foreground">{widget.title}</p>
                <h2 className="text-xl font-semibold tracking-tight">
                  40 000 $
                </h2>
              </div>
            </Card>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}
