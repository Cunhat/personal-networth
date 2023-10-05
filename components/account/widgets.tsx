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

  return (
    <div>
      <Card className="">
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Widgets</CardTitle>
            <CreateWidget tags={tags} />
          </div>
        </CardHeader>
        <CardContent></CardContent>
      </Card>
    </div>
  )
}
