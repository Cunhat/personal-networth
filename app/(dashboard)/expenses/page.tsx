import React from "react"

import { CreateExpense } from "@/components/expenses/create-expense"

export default async function Expenses() {
  return (
    <main className="flex flex-col h-full">
      <CreateExpense />
    </main>
  )
}
