"use client"

import React from "react"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  columns,
  NetWorthData,
  NetWorthDataCategoryRow,
} from "@/components/netWorth/table-columns"
import { DataTable } from "@/components/table-component"

type NetWorthProps = {
  data: NetWorthDataCategoryRow[]
}

export const NetWorth: React.FC<NetWorthProps> = ({ data }) => {
  console.log(data)
  const [year, setYear] = React.useState<number>(new Date().getFullYear())
  return (
    <div>
      {/* <Select onValueChange={field.onChange} defaultValue={field.value}>
        <SelectTrigger className="w-[280px]">
          <SelectValue placeholder="Select a category" />
        </SelectTrigger>
        <SelectContent>
          {categories?.map((category) => (
            <SelectItem value={category.id} key={category.id}>
              {category.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select> */}
      <DataTable data={data ?? []} columns={columns} />
    </div>
  )
}
