import React from "react"

import { db } from "@/lib/db"
import { Button } from "@/components/ui/button"
import { AddBalance } from "@/components/add-balance-form"

interface AccountPageProps {
  params: { accountId: string }
}

const Account: React.FC<AccountPageProps> = async ({ params }) => {
  const account = await db.account.findUnique({
    select: {
      id: true,
      name: true,
      categoryId: true,
      category: {
        select: {
          id: true,
          name: true,
          type: true,
          userId: true,
        },
      },
    },
    where: {
      id: params.accountId,
    },
  })

  return (
    <main className="flex h-full flex-col p-5 gap-3">
      <h2 className="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
        {account?.name}
      </h2>
      <div className="flex gap-1 flex-col">
        <h4 className="scroll-m-20 text-base font-semibold tracking-tight">
          Account Category
        </h4>
        <p className="leading-7 pl-2">{account?.category.name}</p>
      </div>
      <div className="flex justify-between items-center">
        <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
          Balances
        </h4>
        <AddBalance />
      </div>
    </main>
  )
}

export default Account
