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

  console.log(expenses)

  let data: ExpensesData[] = []

  if (expenses.length > 0) {
    expenses.forEach((expense) => {
      const months = Array.from({ length: 12 }, (_, i) => i)

      data.push({
        name: expense.name,
        total: expense.amount * expense.numberOfOccurrences,

        ...months.reduce((month: any, monthIndex) => {
          const monthName = dayjs()
            .month(monthIndex)
            .format("MMMM")
            .toLowerCase()

          month[monthName] =
            expense.numberOfOccurrences === 1 &&
            parseInt(dayjs(expense.firstOccurrence).format("M")) >= monthIndex
              ? expense.amount
              : undefined
          return expense
        }, {}),
      })
    })
  }

  return (
    <main className="flex flex-col h-full">
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
