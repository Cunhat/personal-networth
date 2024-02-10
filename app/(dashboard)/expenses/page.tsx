import React from "react"
import { redirect } from "next/navigation"
import { currentUser } from "@clerk/nextjs"
import dayjs from "dayjs"

import { db } from "@/lib/db"
import { Card } from "@/components/ui/card"
import { CreateExpense } from "@/components/expenses/create-expense"
import { columns, ExpensesData } from "@/components/expenses/table-columns"
import { CreateIncome } from "@/components/income/create-income"
import { DeleteIncome } from "@/components/income/delete-income"
import { EditIncome } from "@/components/income/edit-income"
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

  const income = await db.income.findMany({
    where: {
      userId: userDb?.id,
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
        id: expense.id,
        name: expense.name,
        months: expense.months,
        amount: expense.amount,
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

    const sumOfIncomes = income.reduce(
      (value, incomeVal) => value + incomeVal.amount,
      0
    )

    const effortRate = months.reduce((month: any, monthIndex) => {
      const monthName = dayjs()
        .month(monthIndex)
        .format("MMMM")
        .toLowerCase() as keyof ExpensesData

      month[monthName] = (
        (totalPerMonth[monthName] / sumOfIncomes) * 100 ?? 0
      ).toFixed(1)

      return month
    }, {})

    const yearlyTotalExpenses = data
      .filter((elem) => elem.name !== "Total")
      .reduce((sum, dataELem) => {
        return sum + Number(dataELem.total)
      }, 0)

    const yearlyEffortRate = (yearlyTotalExpenses / (sumOfIncomes * 12)) * 100

    effortRate["total"] = yearlyEffortRate.toFixed(1)
    data.push({
      name: "Effort Rate",
      ...effortRate,
    })
  }

  return (
    <main className="flex flex-col h-full gap-3">
      <div className="flex justify-between">
        <h2 className="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
          Income
        </h2>
        <CreateIncome />
      </div>
      <div className="flex gap-3 flex-wrap">
        {income.map((income) => (
          <Card
            className="flex flex-col md:w-fit w-full gap-2 p-4 min-w-[200px] relative group/widget"
            key={income.id}
          >
            <div className="flex gap-2 absolute right-4 top-4 invisible group-hover/widget:visible">
              <DeleteIncome id={income.id} />
              <EditIncome
                id={income.id}
                name={income.name}
                amount={income.amount}
              />
            </div>
            <div className="flex flex-col gap-1">
              <p className="text-muted-foreground">{income.name}</p>
              <h2 className="text-xl font-semibold tracking-tight">{`${Intl.NumberFormat().format(
                income.amount
              )} €`}</h2>
            </div>
          </Card>
        ))}
      </div>
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
