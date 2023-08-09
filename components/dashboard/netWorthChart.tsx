import { type } from "os"
import { start } from "repl"
import React from "react"
import dayjs from "dayjs"

import { Account } from "@/lib/schemas/account"

import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"

type NetWorthChartProps = {
  accounts: Account[]
}

type ChartData = {
  id: string
  data: Array<ChartDataPoint>
}[]

type ChartDataPoint = {
  x: number | string
  y: number | null
}

export const NetWorthChart: React.FC<NetWorthChartProps> = ({ accounts }) => {
  const getChartData = () => {
    const chartData = [] as Array<ChartDataPoint>
    const currentDate = dayjs()
    let startDate = currentDate.subtract(1, "year")

    accounts.forEach((account) => {
      while (!startDate.isAfter(currentDate, "month")) {
        const value = account.balance.filter((balance) =>
          startDate.isSame(balance.createdAt, "month")
        )
        const lastMonthValue = value[0]

        if (lastMonthValue) {
          const alreadyExists = chartData.find(
            (data) => data.x === startDate.format("MMM YYYY")
          )
          if (alreadyExists) {
            alreadyExists.y! += lastMonthValue.balance
          } else {
            chartData.push({
              x: startDate.format("MMM YYYY"),
              y: lastMonthValue ? lastMonthValue.balance : 0,
            })
          }
        }

        startDate = startDate.add(1, "month")
      }
      startDate = currentDate.subtract(1, "year")
    })

    return chartData
  }

  getChartData()

  return (
    <Card className="h-[400px]">
      <CardHeader>
        <CardTitle>Net Worth Chart</CardTitle>
      </CardHeader>
      <CardContent>gfgdfg</CardContent>
    </Card>
  )
}
