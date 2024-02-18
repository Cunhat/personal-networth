import { redirect } from "next/navigation"
import { currentUser } from "@clerk/nextjs"
import { ca } from "date-fns/locale"

import { db } from "@/lib/db"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Account } from "@/components/account/account"
import { AccountInfoShell } from "@/components/account/accountInfo-shell"
import { Icons } from "@/components/icons"
import { Tag } from "@/components/tag"

export const dynamic = "force-dynamic"

export default async function AccountsInfo({ searchParams }) {
  const user = await currentUser()

  if (!user) {
    redirect("/sign-in")
  }

  const userDb = await db.user.findUnique({
    where: {
      email: user?.emailAddresses[0].emailAddress ?? "",
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

  return (
    <main className="flex flex-col h-[calc(100vh-90px)] gap-3 overflow-hidden">
      <h1 className="text-3xl font-bold">Accounts</h1>
      <AccountInfoShell categories={categories} accounts={accounts}>
        <Account accountId={searchParams.accountId} />
      </AccountInfoShell>
    </main>
  )
}
