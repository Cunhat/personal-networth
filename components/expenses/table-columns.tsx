"use client"

import { ColumnDef } from "@tanstack/react-table"

export type ExpensesData = {
  name: string
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
  total?: number
}

const RenderValue: React.FC<{ value: number | undefined }> = ({ value }) => (
  <p>
    {value !== undefined ? new Intl.NumberFormat().format(value) + "€" : "- -"}
  </p>
)

export const columns: ColumnDef<ExpensesData>[] = [
  {
    accessorKey: "name",
    header: () => "",
    cell: (info) => <p>{info.getValue() as string}</p>,
    enableSorting: false,
  },
  {
    accessorKey: "january",
    header: () => <p>January</p>,
    cell: (info) => <RenderValue value={info.getValue() as number} />,
    enableSorting: false,
  },
  {
    accessorKey: "february",
    header: () => <p>February</p>,
    cell: (info) => <RenderValue value={info.getValue() as number} />,
    enableSorting: false,
  },
  {
    accessorKey: "march",
    header: () => <p>March</p>,
    cell: (info) => <RenderValue value={info.getValue() as number} />,
    enableSorting: false,
  },
  {
    accessorKey: "april",
    header: () => <p>April</p>,
    cell: (info) => <RenderValue value={info.getValue() as number} />,
    enableSorting: false,
  },
  {
    accessorKey: "may",
    header: () => <p>May</p>,
    cell: (info) => <RenderValue value={info.getValue() as number} />,
    enableSorting: false,
  },
  {
    accessorKey: "june",
    header: () => <p>June</p>,
    cell: (info) => <RenderValue value={info.getValue() as number} />,
    enableSorting: false,
  },
  {
    accessorKey: "july",
    header: () => <p>July</p>,
    cell: (info) => <RenderValue value={info.getValue() as number} />,
    enableSorting: false,
  },
  {
    accessorKey: "august",
    header: () => <p>August</p>,
    cell: (info) => <RenderValue value={info.getValue() as number} />,
    enableSorting: false,
  },
  {
    accessorKey: "september",
    header: () => <p>September</p>,
    cell: (info) => <RenderValue value={info.getValue() as number} />,
    enableSorting: false,
  },
  {
    accessorKey: "october",
    header: () => <p>October</p>,
    cell: (info) => <RenderValue value={info.getValue() as number} />,
    enableSorting: false,
  },
  {
    accessorKey: "november",
    header: () => <p>November</p>,
    cell: (info) => <RenderValue value={info.getValue() as number} />,
    enableSorting: false,
  },
  {
    accessorKey: "december",
    header: () => <p>December</p>,
    cell: (info) => <RenderValue value={info.getValue() as number} />,
    enableSorting: false,
  },
  {
    accessorKey: "total",
    header: () => <p>Total</p>,
    cell: (info) => <RenderValue value={info.getValue() as number} />,
    enableSorting: false,
  },
]
