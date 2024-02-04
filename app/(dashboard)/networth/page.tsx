import React from "react"
import { redirect } from "next/navigation"
import { currentUser } from "@clerk/nextjs"
import dayjs from "dayjs"

import { db } from "@/lib/db"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { NetWorth as NetWorthCmp } from "@/components/netWorth/net-worth"
import {
  columns,
  NetWorthData,
  NetWorthDataCategoryRow,
} from "@/components/netWorth/table-columns"
import { DataTable } from "@/components/table-component"

export default async function NetWorth() {
  const user = await currentUser()

  if (!user) {
    redirect("/sign-in")
  }

  const userDb = await db.user.findUnique({
    where: {
      email: user?.emailAddresses[0].emailAddress ?? "",
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

  const accounts = await db.account.findMany({
    include: {
      tags: {
        include: {
          tag: true,
        },
      },
      category: true,
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

  const data: NetWorthDataCategoryRow[] = []

  categories.forEach((category) => {
    const accList = accounts.filter(
      (account) => account.categoryId === category.id
    )

    if (accList.length > 0) {
      data.push({
        element: <p className="text-black font-bold ">{category.name}</p>,
        isCustomRow: true,
      })
      accList.forEach((account) => {
        const months = Array.from({ length: 12 }, (_, i) => i)

        data.push({
          account: account.name,
          ...months.reduce((acc: any, monthIndex) => {
            const monthName = dayjs()
              .month(monthIndex)
              .format("MMMM")
              .toLowerCase()

            acc[monthName] = account.balance.find(
              (elem) =>
                dayjs(elem.createdAt).month() === monthIndex &&
                dayjs(elem.createdAt).year() === new Date().getFullYear()
            )?.balance

            return acc
          }, {}),
        })
      })
    }
  })

  return (
    <main className="flex flex-col gap-3 h-full">
      <h2 className="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
        Net Worth
      </h2>
      <NetWorthCmp data={data} />
    </main>
  )
}
