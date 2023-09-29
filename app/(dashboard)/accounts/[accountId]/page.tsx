import React from "react"

import { db } from "@/lib/db"
import { Badge } from "@/components/ui/badge"
import { AddTag } from "@/components/account/add-tag"
import { columns } from "@/components/account/table-columns"
import { AddBalance } from "@/components/add-balance-form"
import { DataTable } from "@/components/table-component"

interface AccountPageProps {
  params: { accountId: string }
}

const Account: React.FC<AccountPageProps> = async ({ params }) => {
  const account = await db.account.findUnique({
    include: {
      tags: {
        include: {
          tag: true,
        },
      },
      category: true,
      balance: true,
    },

    where: {
      id: params.accountId,
    },
  })

  const tags = await db.tag.findMany({})

  const filteredTags = tags.filter(
    (tag) => !account?.tags?.some((accountTag) => tag.id === accountTag.tag.id)
  )

  const initialSorting = [
    {
      id: "createdAt",
      desc: true,
    },
  ]

  return (
    <main className="flex h-full flex-col gap-3">
      <h2 className="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
        {account?.name} - {account?.category.name}
      </h2>
      <div className="flex justify-between items-center">
        <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
          Balances
        </h4>
        <AddBalance accountId={params.accountId} />
      </div>
      <p className="text-muted-foreground">
        Here&apos;s a list of your balances for the latest months!
      </p>
      <DataTable
        data={account?.balance ?? []}
        columns={columns}
        initialSorting={initialSorting}
      />
      <div className="flex justify-between items-center">
        <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
          Tags
        </h4>
        <AddTag data={filteredTags} accountId={params.accountId} />
      </div>
      <div className="flex flex-wrap gap-4">
        {account?.tags?.map((tag) => (
          <Badge key={tag.tag.id} variant="secondary" className="w-fit">
            {tag.tag.name}
          </Badge>
        ))}
      </div>
    </main>
  )
}

export default Account
