import { redirect } from "next/navigation"
import { currentUser } from "@clerk/nextjs"

import { db } from "@/lib/db"

import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { Widget } from "../widget/widget"
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
            <Widget id={widget.id} key={widget.id} tags={tags} editable />
          ))}
        </CardContent>
      </Card>
    </div>
  )
}
