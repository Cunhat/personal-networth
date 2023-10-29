import React from "react"

import { db } from "@/lib/db"

import { Icons } from "./icons"
import { Badge } from "./ui/badge"
import { Card } from "./ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu"

type WidgetProps = {
  id: string
}

export const Widget: React.FC<WidgetProps> = async ({ id }) => {
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
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Icons.gridVertical className="w-6 h-6 flex hover:cursor-pointer absolute right-4 top-4 hover:bg-accent rounded-full p-1" />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem className="flex gap-2">
            <Icons.trash className="w-4 h-4 hover:cursor-pointer" />
            Delete
          </DropdownMenuItem>
          <DropdownMenuItem className="flex gap-2">
            <Icons.pencil className="w-4 h-4 hover:cursor-pointer" />
            Edit
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
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
