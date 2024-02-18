import React from "react"

import { db } from "@/lib/db"
import { AddTag } from "@/components/account/add-tag"
import Delete from "@/components/account/delete"
import { RemoveTag } from "@/components/account/remove-tag"
import { columns } from "@/components/account/table-columns"
import { AddBalance } from "@/components/add-balance-form"
import { DataTable } from "@/components/table-component"
import { Tag } from "@/components/tag"

export const dynamic = "force-dynamic"

interface AccountPageProps {
  accountId: string
}

export const Account: React.FC<AccountPageProps> = async ({ accountId }) => {
  console.log(accountId)
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
      id: accountId,
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
        {account?.name} - {account?.category?.name ?? "No category"}
      </h2>
      <div className="flex items-center">
        <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
          Balances
        </h4>
        <AddBalance accountId={accountId} />
        <Delete id={accountId} />
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
        <AddTag data={filteredTags} accountId={accountId} />
      </div>
      <div className="flex flex-wrap gap-4">
        {account?.tags?.map((tag) => (
          <Tag
            key={tag.tag.id}
            name={tag.tag.name}
            deleteSlot={<RemoveTag tagId={tag.tag.id} accountId={accountId} />}
          />
        ))}
      </div>
    </main>
  )
}
