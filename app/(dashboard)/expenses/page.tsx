import React from "react"

import { CreateExpense } from "@/components/expenses/create-expense"

export default async function Expenses() {
  return (
    <main className="flex flex-col h-full">
      <div className="flex justify-between">
        <h2 className="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
          Expenses
        </h2>
        <CreateExpense />
      </div>
    </main>
  )
}
