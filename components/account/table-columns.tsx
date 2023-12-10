"use client"

import { ColumnDef } from "@tanstack/react-table"
import dayjs from "dayjs"

import { TableActions } from "../table-actions"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu"

export const columns: ColumnDef<any>[] = [
  {
    accessorKey: "balance",
    header: () => <p>Value</p>,
    cell: ({ row }) => <div>{row.getValue("balance")}</div>,
    enableSorting: true,
  },
  {
    accessorKey: "createdAt",
    header: () => <p>Created at</p>,
    cell: ({ row }) => (
      <div>{dayjs(row.getValue("createdAt")).format("DD/MM/YYYY")}</div>
    ),
  },
  {
    accessorKey: "actions",
    cell: ({ ...props }) => <TableActions {...props} />,
  },
]
