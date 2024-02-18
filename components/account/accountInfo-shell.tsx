"use client"

import React, { Children, use, useCallback, useEffect } from "react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"

import { Account } from "@/lib/schemas/account"
import { Category } from "@/lib/schemas/category"

import { Icons } from "../icons"
import { Badge } from "../ui/badge"

type AccountInfoShellProps = {
  accounts: Account[]
  categories: Category[]
  children: React.ReactNode
}

export const AccountInfoShell: React.FC<AccountInfoShellProps> = ({
  categories,
  accounts,
  children,
}) => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString())
      params.set(name, value)

      return params.toString()
    },
    [searchParams]
  )

  useEffect(() => {
    router.push(pathname + "?" + createQueryString("accountId", accounts[0].id))
  }, [])

  return (
    <div className="grid grid-cols-2 flex-1 overflow-hidden py-4">
      <div className="flex flex-col gap-3 overflow-auto">
        {categories.map((category) => {
          return (
            <div key={category.id} className="flex flex-col gap-2">
              <div className="flex gap-2">
                <Icons.chevronDown className="w-6 h-6" />
                <h2 className="font-bold">{category.name}</h2>
              </div>
              {accounts.map((account) => {
                if (account.categoryId === category.id) {
                  return (
                    <div
                      key={account.id}
                      className="flex justify-between items-center bg-white border rounded-md hover:cursor-pointer hover:bg-slate-50 p-3"
                      onClick={() => {
                        router.push(
                          pathname +
                            "?" +
                            createQueryString("accountId", account.id)
                        )
                      }}
                    >
                      <div className="flex flex-col p-2">
                        <h2>{account.name}</h2>
                        <div className="flex gap-2">
                          {account?.tags?.map((tag) => (
                            <Badge
                              key={tag.tagId}
                              variant="default"
                              className="cursor-default"
                            >
                              {tag.tag.name}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div>
                        <h2 className="font-bold">
                          {account.balance[0].balance} €
                        </h2>
                      </div>
                    </div>
                  )
                }
              })}
            </div>
          )
        })}
      </div>
      <div className="overflow-auto px-4">{children}</div>
    </div>
  )
}
