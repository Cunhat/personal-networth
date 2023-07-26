import React from "react"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export const Account = () => {
  return (
    <Card className="w-fit">
      <CardHeader>
        <CardTitle className="text-lg">Conta Montepio</CardTitle>
        <CardDescription>Bank Account</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="leading-7 text-lg">30 000 $</p>
      </CardContent>
    </Card>
  )
}
