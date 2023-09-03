import React from "react"

import { Account } from "@/lib/schemas/account"
import { Category } from "@/lib/schemas/category"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

type NetWorthProps = {
  accounts: Account[]
  categories: Category[]
}

export const NetWorth: React.FC<NetWorthProps> = async ({
  accounts,
  categories,
}) => {
  const netWorth = accounts
    .reduce((acc, account) => {
      return acc + (account?.balance[0] ? account.balance[0]?.balance : 0)
    }, 0)
    .toFixed(2)
  //  @ts-ignore
  const formattedNetWorthValue = new Intl.NumberFormat().format(netWorth)
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
          <p>{formattedNetWorthValue} €</p>
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
                      <div
                        className="flex justify-between items-center"
                        key={account.id}
                      >
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
