import { redirect } from "next/navigation"
import { currentUser } from "@clerk/nextjs"

import { db } from "@/lib/db"
import { Card, CardContent } from "@/components/ui/card"
import { NetWorth } from "@/components/dashboard/networth"
import { NetWorthChart } from "@/components/dashboard/netWorthChart"
import { NetWorthPercentages } from "@/components/dashboard/netWorthPercentages"
import { PieChart } from "@/components/PieChart/pieChart"
import { Widget } from "@/components/widget/widget"

export const metadata = {
  title: "Dashboard",
  description:
    "Your Personal Net Worth Dashboard: Track your finances, assets, and debts in one place for better financial management.",
}

export default async function Home() {
  const user = await currentUser()

  console.log("Clerk user: ", user)

  if (!user) {
    redirect("/sign-in")
  }

  const userDb = await db.user.findUnique({
    where: {
      email: user?.emailAddresses[0].emailAddress ?? "",
    },
  })

  console.log("userDB: ", userDb)

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
      tags: {
        select: {
          tag: true,
          tagId: true,
          accountId: true,
          account: true,
          assignedAt: true,
          assignedBy: true,
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

  const tags = await db.tag.findMany({
    where: {
      userId: userDb?.id,
    },
  })

  const pieCharts = await db.pieChart.findMany({
    select: {
      id: true,
      title: true,
      pieChartsOnTags: true,
    },
    where: {
      userId: userDb?.id,
    },
  })

  console.log("pieCharts: ", pieCharts)

  return (
    <div className="grid flex-1 gap-8 md:grid-cols-[300px_1fr]">
      <div className="flex-1 pb-6">
        <NetWorth accounts={accounts} categories={categories} />
      </div>
      <div className="flex flex-col flex-1 overflow-auto gap-3">
        <NetWorthChart accounts={accounts} />
        <div className="flex gap-3 flex-wrap justify-normal">
          {widgets.map((widget) => (
            <Widget id={widget.id} key={widget.id} />
          ))}
        </div>
        <NetWorthPercentages accounts={accounts} />
        <div className="grid grid-cols-2 gap-3">
          {pieCharts.map((pieChart) => (
            <PieChart
              accounts={accounts}
              pieChart={pieChart}
              key={pieChart.id}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
