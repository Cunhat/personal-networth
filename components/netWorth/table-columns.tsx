"use client"

import { ColumnDef } from "@tanstack/react-table"

export type NetWorthData = {
  account: string
  january?: number
  february?: number
  march?: number
  april?: number
  may?: number
  june?: number
  july?: number
  august?: number
  september?: number
  october?: number
  november?: number
  december?: number
}

export type NetWorthDataCategory = {
  isCustomRow: boolean
  element: React.ReactNode
}

export type NetWorthDataCategoryRow = NetWorthData | NetWorthDataCategory

export const columns: ColumnDef<NetWorthDataCategoryRow>[] = [
  {
    accessorKey: "account",
    header: () => "",
    cell: (info) => <p>{info.getValue() as string}</p>,
    enableSorting: false,
  },
  // {
  //   accessorKey: "2022",
  //   header: () => <p>2022</p>,
  //   cell: (info) => <p>{info.getValue() as number}</p>,
  //   enableSorting: false,
  // },
  {
    accessorKey: "january",
    header: () => <p>January</p>,
    cell: (info) => (
      <p>
        {info.getValue() !== undefined
          ? new Intl.NumberFormat().format(info.getValue() as number)
          : "- -"}
      </p>
    ),
    enableSorting: false,
  },
  {
    accessorKey: "february",
    header: () => <p>February</p>,
    cell: (info) => (
      <p>
        {info.getValue() !== undefined
          ? new Intl.NumberFormat().format(info.getValue() as number)
          : "- -"}
      </p>
    ),
    enableSorting: false,
  },
  {
    accessorKey: "march",
    header: () => <p>March</p>,
    cell: (info) => (
      <p>
        {info.getValue() !== undefined
          ? new Intl.NumberFormat().format(info.getValue() as number)
          : "- -"}
      </p>
    ),
    enableSorting: false,
  },
  {
    accessorKey: "april",
    header: () => <p>April</p>,
    cell: (info) => (
      <p>
        {info.getValue() !== undefined
          ? new Intl.NumberFormat().format(info.getValue() as number)
          : "- -"}
      </p>
    ),
    enableSorting: false,
  },
  {
    accessorKey: "may",
    header: () => <p>May</p>,
    cell: (info) => (
      <p>
        {info.getValue() !== undefined
          ? new Intl.NumberFormat().format(info.getValue() as number)
          : "- -"}
      </p>
    ),
    enableSorting: false,
  },
  {
    accessorKey: "june",
    header: () => <p>June</p>,
    cell: (info) => (
      <p>
        {info.getValue() !== undefined
          ? new Intl.NumberFormat().format(info.getValue() as number)
          : "- -"}
      </p>
    ),
    enableSorting: false,
  },
  {
    accessorKey: "july",
    header: () => <p>July</p>,
    cell: (info) => (
      <p>
        {info.getValue() !== undefined
          ? new Intl.NumberFormat().format(info.getValue() as number)
          : "- -"}
      </p>
    ),
    enableSorting: false,
  },
  {
    accessorKey: "august",
    header: () => <p>August</p>,
    cell: (info) => (
      <p>
        {info.getValue() !== undefined
          ? new Intl.NumberFormat().format(info.getValue() as number)
          : "- -"}
      </p>
    ),
    enableSorting: false,
  },
  {
    accessorKey: "september",
    header: () => <p>September</p>,
    cell: (info) => (
      <p>
        {info.getValue() !== undefined
          ? new Intl.NumberFormat().format(info.getValue() as number)
          : "- -"}
      </p>
    ),
    enableSorting: false,
  },
  {
    accessorKey: "october",
    header: () => <p>October</p>,
    cell: (info) => (
      <p>
        {info.getValue() !== undefined
          ? new Intl.NumberFormat().format(info.getValue() as number)
          : "- -"}
      </p>
    ),
    enableSorting: false,
  },
  {
    accessorKey: "november",
    header: () => <p>November</p>,
    cell: (info) => (
      <p>
        {info.getValue() !== undefined
          ? new Intl.NumberFormat().format(info.getValue() as number)
          : "- -"}
      </p>
    ),
    enableSorting: false,
  },
  {
    accessorKey: "december",
    header: () => <p>December</p>,
    cell: (info) => (
      <p>
        {info.getValue() !== undefined
          ? new Intl.NumberFormat().format(info.getValue() as number)
          : "- -"}
      </p>
    ),
    enableSorting: false,
  },
]
