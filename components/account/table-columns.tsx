"use client"

import { ColumnDef } from "@tanstack/react-table"
import dayjs from "dayjs"

export const columns: ColumnDef<any>[] = [
  {
    accessorKey: "balance",
    header: () => <p>Value</p>,
    cell: ({ row }) => (
      <div className="w-[80px]">{row.getValue("balance")}</div>
    ),
    enableSorting: true,
  },
  {
    accessorKey: "createdAt",
    header: () => <p>Created at</p>,
    cell: ({ row }) => (
      <div className="w-[80px]">
        {dayjs(row.getValue("createdAt")).format("DD/MM/YYYY")}
      </div>
    ),
  },
]
