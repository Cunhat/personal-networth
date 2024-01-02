import React from "react"

import { Account } from "@/lib/schemas/account"
import { ChartData, PieChart as PieChartT } from "@/lib/schemas/pieChart"

import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { Chart } from "./chart"

type PieChartProps = {
  pieChart: PieChartT
  accounts: Account[]
}

export const PieChart: React.FC<PieChartProps> = ({ pieChart, accounts }) => {
  let finalData: ChartData[] = []
  let accountTags: ChartData[] = []
  let total = 0

  pieChart?.pieChartsOnTags?.forEach((pie) => {
    let name = ""
    let value = 0

    const list = accounts.filter((account) => {
      return account?.tags?.some((tag) => tag.tagId === pie.tagId)
    })

    list.forEach((account) => {
      value += account.balance[0].balance
      name =
        account?.tags !== undefined && account?.tags[0]?.tagId === pie.tagId
          ? account.tags[0].tag.name
          : "No Tag"
    })

    total += value

    accountTags.push({
      id: name,
      label: name,
      value: value,
    })
  })

  finalData = accountTags.map((accountTag) => {
    return {
      ...accountTag,
      value: Math.trunc(((accountTag.value * 100) / total) * 100) / 100,
    }
  })

  return (
    <Card className="h-[400px] flex flex-col">
      <CardHeader>
        <CardTitle>{pieChart.title}</CardTitle>
      </CardHeader>
      <CardContent className="flex-1">
        <Chart data={finalData} />
      </CardContent>
    </Card>
  )
}
