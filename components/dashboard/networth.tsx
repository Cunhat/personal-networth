import React from "react"
import { redirect } from "next/navigation"
import { currentUser } from "@clerk/nextjs"

import { db } from "@/lib/db"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export const Networth: React.FC = async () => {
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

  console.log(accounts)

  const netWorth = accounts
    .reduce((acc, account) => {
      return acc + (account?.balance[0] ? account.balance[0]?.balance : 0)
    }, 0)
    .toFixed(2)

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Accounts</CardTitle>
      </CardHeader>
      <CardContent className="gap-6 flex flex-col">
        <div className="flex justify-between items-center">
          <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
            Net worth
          </h4>
          <p>{new Intl.NumberFormat().format(netWorth)} €</p>
        </div>
        <div className="flex flex-col gap-4">
          {categories.map((category, index) => {
            return (
              <div key={index} className="flex flex-col gap-2">
                <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
                  {category.name}
                </h4>
                {accounts.map((account) => {
                  if (account.categoryId === category.id) {
                    return (
                      <div className="flex justify-between items-center">
                        <p>{account.name}</p>
                        <p>
                          {new Intl.NumberFormat().format(
                            account.balance[0]?.balance ?? 0
                          )}{" "}
                          €
                        </p>
                      </div>
                    )
                  }
                })}
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
