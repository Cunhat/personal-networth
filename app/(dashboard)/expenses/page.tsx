import React from "react"
import { redirect } from "next/navigation"
import { currentUser } from "@clerk/nextjs"
import dayjs from "dayjs"

import { db } from "@/lib/db"
import { CreateExpense } from "@/components/expenses/create-expense"
import { columns, ExpensesData } from "@/components/expenses/table-columns"
import { DataTable } from "@/components/table-component"

export default async function Expenses() {
  const user = await currentUser()

  if (!user) {
    redirect("/sign-in")
  }

  const userDb = await db.user.findUnique({
    where: {
      email: user?.emailAddresses[0].emailAddress ?? "",
    },
  })

  const expenses = await db.expense.findMany({
    where: {
      userId: userDb?.id,
    },
  })

  let data: ExpensesData[] = []

  if (expenses.length > 0) {
    const months = Array.from({ length: 12 }, (_, i) => i)
    expenses.forEach((expense) => {
      const arrayOfMonths = expense.months.split("|")

      data.push({
        name: expense.name,
        total: expense.amount * arrayOfMonths.length,

        ...months.reduce((month: any, monthIndex) => {
          const monthName = dayjs()
            .month(monthIndex)
            .format("MMMM")
            .toLowerCase()

          if (arrayOfMonths.includes(monthName)) {
            month[monthName] = expense.amount
          }

          return month
        }, {}),
      })
    })
    const totalPerMonth = months.reduce((month: any, monthIndex) => {
      const monthName = dayjs()
        .month(monthIndex)
        .format("MMMM")
        .toLowerCase() as keyof ExpensesData
      month[monthName] = data.reduce((total: number, expense) => {
        return total + ((expense[monthName] as number) ?? 0)
      }, 0)
      return month
    }, {})

    data.push({
      name: "Total",
      ...totalPerMonth,
      total: Object.values(totalPerMonth).reduce(
        (total, value) => (total as number) + (value as number),
        0
      ),
    })
  }

  return (
    <main className="flex flex-col h-full gap-3">
      <div className="flex justify-between">
        <h2 className="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
          Expenses
        </h2>
        <CreateExpense />
      </div>
      <DataTable data={data ?? []} columns={columns} />
    </main>
  )
}
