import { redirect } from "next/navigation"
import { useUser } from "@clerk/clerk-react"
import { auth, currentUser } from "@clerk/nextjs"

import { db } from "@/lib/db"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Account } from "@/components/account/account-component"
import { CreateAccount } from "@/components/account/create-account-form"
import { Widgets } from "@/components/account/widgets"
import { Categories } from "@/components/categories-components"
import { Tags } from "@/components/tag-component"

export default async function Accounts() {
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

  const tags = await db.tag.findMany({
    select: {
      id: true,
      name: true,
      userId: true,
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
      balance: true,
    },
    where: {
      userId: userDb?.id,
    },
  })

  return (
    <main className="flex h-full flex-col gap-3">
      <h2 className="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
        Accounts
      </h2>
      <Categories data={categories} />
      <Tags data={tags} />
      <Card className="">
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Accounts list</CardTitle>
            <CreateAccount categories={categories} tags={tags} />
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-4 ">
            {accounts.map((account) => {
              return <Account {...account} key={account.id} />
            })}
          </div>
        </CardContent>
      </Card>
      <Widgets />
    </main>
  )
}
