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

export const Account: React.FC<Omit<AccountType, "userId">> = ({
  name,
  category,
  id,
}) => {
  return (
    <Link href={`/accounts/${id}`}>
      <Card className="w-fit">
        <CardHeader>
          <CardTitle className="text-lg">{name}</CardTitle>
          <CardDescription>{category.name}</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="leading-7 text-lg">30 000 $</p>
        </CardContent>
      </Card>
    </Link>
  )
}
