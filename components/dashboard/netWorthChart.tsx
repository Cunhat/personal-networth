"use client"

import React from "react"
import { ResponsiveLine } from "@nivo/line"
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
        let lastMonthValue = value[0]

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
        } else {
          const lastValue = account.balance.filter((balance) =>
            startDate.isAfter(balance.createdAt, "month")
          )

          if (lastValue.length > 0) {
            const valueToAdd = lastValue[0]

            const exists = chartData.find(
              (data) => data.x === startDate.format("MMM YYYY")
            )

            if (exists) {
              exists.y! += valueToAdd.balance
            }
          }
        }

        startDate = startDate.add(1, "month")
      }
      startDate = currentDate.subtract(1, "year")
    })

    chartData.sort((a, b) => {
      if (typeof a.x === "string" && typeof b.x === "string") {
        return dayjs(a.x).isAfter(dayjs(b.x)) ? 1 : -1
      } else {
        return a.x > b.x ? 1 : -1
      }
    })

    return chartData
  }

  const data: ChartData = [{ id: "netWorth", data: getChartData() }]

  return (
    <Card className="h-[400px] flex flex-col">
      <CardHeader>
        <CardTitle>Net Worth Chart</CardTitle>
      </CardHeader>
      <CardContent className="flex-1">
        <ResponsiveLine
          data={data}
          margin={{ top: 30, right: 30, bottom: 30, left: 50 }}
          xScale={{ type: "point" }}
          yScale={{
            type: "linear",
            min: "auto",
            max: "auto",
            stacked: true,
            reverse: false,
          }}
          yFormat=" >-.2f"
          curve="cardinal"
          axisTop={null}
          lineWidth={3}
          colors={{ scheme: "set3" }}
          axisRight={null}
          axisBottom={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legendOffset: 36,
            legendPosition: "middle",
          }}
          axisLeft={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legendOffset: -40,
            legendPosition: "middle",
          }}
          pointSize={10}
          pointBorderWidth={2}
          pointBorderColor={{ from: "serie.color" }}
          pointLabelYOffset={-12}
          useMesh={true}
        />
      </CardContent>
    </Card>
  )
}
