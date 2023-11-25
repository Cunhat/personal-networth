import React from "react"

import { db } from "@/lib/db"
import { Tag } from "@/lib/schemas/tags"

import { Icons } from "../icons"
import { Badge } from "../ui/badge"
import { Card } from "../ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu"
import { DeleteWidget } from "./delete-widget"
import { EditWidget } from "./edit-widget"

type WidgetProps = {
  id: string
  tags?: Array<Tag>
  editable?: boolean
}

export const Widget: React.FC<WidgetProps> = async ({
  id,
  tags,
  editable = false,
}) => {
  const widgetInfo = await db.widget.findUnique({
    include: {
      widgetsOnTags: {
        include: {
          tag: true,
        },
      },
    },
    where: {
      id: id,
    },
  })

  if (!widgetInfo) return null

  const arrayOfTagsIds = widgetInfo.widgetsOnTags.map((tag) => tag.tagId)

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
          tagId: {
            in: arrayOfTagsIds,
          },
        },
      },
    },
  })

  const total = accounts.reduce((acc, account) => {
    return acc + account.balance[0].balance
  }, 0)

  return (
    <Card className="flex flex-col md:w-fit w-full gap-2 p-4 min-w-[200px] relative">
      {editable && (
        <div className="flex gap-2 absolute right-4 top-4">
          <DeleteWidget id={id} />
          <EditWidget tags={tags!} widget={widgetInfo} />
        </div>
      )}
      <div className="flex flex-col gap-1">
        <p className="text-muted-foreground">{widgetInfo.title}</p>
        <h2 className="text-xl font-semibold tracking-tight">{`${Intl.NumberFormat().format(
          total
        )} €`}</h2>
      </div>
      <div className="flex gap-1 wrap">
        {widgetInfo.widgetsOnTags.map((tag) => (
          <Badge key={tag.tag.id} variant="secondary" className="w-fit">
            {tag.tag.name}
          </Badge>
        ))}
      </div>
    </Card>
  )
}
