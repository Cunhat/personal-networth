import React from "react"

import { db } from "@/lib/db"

import { Card } from "./ui/card"

type WidgetProps = {
  id: string
}

export const Widget: React.FC<WidgetProps> = async ({ id }) => {
  const widgetInfo = await db.widget.findUnique({
    include: {
      widgetsOnTags: true,
    },
    where: {
      id: id,
    },
  })

  if (!widgetInfo) return null

  const accounts = await db.account.findMany({
    include: {
      balance: {
        orderBy: {
          createdAt: "desc",
        },
      },
    },
    where: {
      tags: {
        some: {
          tagId: widgetInfo.widgetsOnTags[0].tagId,
        },
      },
    },
  })

  const total = accounts.reduce((acc, account) => {
    return acc + account.balance[0].balance
  }, 0)

  return (
    <Card className="flex flex-col md:w-fit w-full">
      <div className="flex flex-col gap-1 p-4">
        <p className="text-muted-foreground">{widgetInfo.title}</p>
        <h2 className="text-xl font-semibold tracking-tight">{`${total} €`}</h2>
      </div>
    </Card>
  )
}
