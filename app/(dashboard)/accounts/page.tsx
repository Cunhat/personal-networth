import { redirect } from "next/navigation"
import { useUser } from "@clerk/clerk-react"
import { auth, currentUser } from "@clerk/nextjs"

import { db } from "@/lib/db"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Account } from "@/components/account/account-component"
import { CreateAccount } from "@/components/account/create-account-form"
import { Categories } from "@/components/categories-components"

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

  const accounts = await db.account.findMany({
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

  return (
    <main className="flex h-full flex-col gap-3">
      <h2 className="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
        Accounts
      </h2>
      <Categories data={categories} />
      <Card className="">
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Accounts list</CardTitle>
            <CreateAccount categories={categories} />
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-4">
            {accounts.map((account) => {
              console.log("for: ", account)

              return <Account {...account} />
            })}
          </div>
        </CardContent>
      </Card>
    </main>
  )
}
