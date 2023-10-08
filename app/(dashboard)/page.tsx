import { redirect } from "next/navigation"
import { currentUser } from "@clerk/nextjs"

import { db } from "@/lib/db"
import { Card, CardContent } from "@/components/ui/card"
import { NetWorth } from "@/components/dashboard/networth"
import { NetWorthChart } from "@/components/dashboard/netWorthChart"
import { Widget } from "@/components/widget"

export default async function Home() {
  const user = await currentUser()

  if (!user) {
    redirect("/sign-in")
  }

  const userDb = await db.user.findUnique({
    where: {
      email: user?.emailAddresses[0].emailAddress ?? "",
    },
  })

  const accounts = await db.account.findMany({
    select: {
      id: true,
      name: true,
      userId: true,
      categoryId: true,
      category: {
        select: {
          id: true,
          name: true,
          type: true,
          userId: true,
        },
      },
      balance: {
        orderBy: {
          createdAt: "desc",
        },
      },
    },
    where: {
      userId: userDb?.id,
    },
  })

  const categories = await db.category.findMany({
    select: {
      id: true,
      name: true,
      userId: true,
      type: true,
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
    <div className="grid flex-1 gap-8 md:grid-cols-[300px_1fr]">
      <div className="flex-1 pb-6">
        <NetWorth accounts={accounts} categories={categories} />
      </div>
      <div className="flex flex-col flex-1 overflow-auto gap-3">
        <NetWorthChart accounts={accounts} />
        <div className="flex gap-3 flex-wrap  justify-normal">
          {widgets.map((widget) => (
            <Widget id={widget.id} key={widget.id} />
          ))}
        </div>
      </div>
    </div>
  )
}
