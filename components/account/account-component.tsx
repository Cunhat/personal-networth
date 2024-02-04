import React from "react"
import Link from "next/link"

import { Account as AccountType } from "@/lib/schemas/account"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import { Badge } from "../ui/badge"

export const Account: React.FC<AccountType> = ({
  name,
  category,
  id,
  balance,
  tags,
}) => {
  return (
    <Link href={`/accounts/${id}`}>
      <Card className="hover:bg-accent flex h-full  w-full flex-col justify-between">
        <CardHeader>
          <CardTitle className="text-lg">{name}</CardTitle>
          <CardDescription>
            {category?.name ?? "No categories..."}
          </CardDescription>
          {tags?.map((tag) => (
            <Badge key={tag.tag.id} variant="secondary" className="w-fit">
              {tag.tag.name}
            </Badge>
          ))}
        </CardHeader>
        <CardContent>
          <p className="text-end text-lg leading-7">
            {Intl.NumberFormat().format(balance[0]?.balance ?? 0)} €
          </p>
        </CardContent>
      </Card>
    </Link>
  )
}
