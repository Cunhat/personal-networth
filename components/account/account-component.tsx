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

export const Account: React.FC<Omit<AccountType, "userId">> = ({
  name,
  category,
  id,
  balance,
  tags,
}) => {
  return (
    <Link href={`/accounts/${id}`}>
      <Card className="w-fit min-w-[200px] hover:bg-border">
        <CardHeader>
          <CardTitle className="text-lg">{name}</CardTitle>
          <CardDescription>{category.name}</CardDescription>
          {tags?.map((tag) => (
            <Badge key={tag.tag.id} variant="secondary" className="w-fit">
              {tag.tag.name}
            </Badge>
          ))}
        </CardHeader>
        <CardContent>
          <p className="leading-7 text-lg text-end">
            {Intl.NumberFormat().format(balance[0]?.balance ?? 0)} €
          </p>
        </CardContent>
      </Card>
    </Link>
  )
}
