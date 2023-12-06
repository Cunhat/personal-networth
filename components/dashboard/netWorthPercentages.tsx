"use client"

import React, { use, useEffect, useState } from "react"
import { ResponsiveBar } from "@nivo/bar"

import { Account } from "@/lib/schemas/account"
import { ChartDataPoint } from "@/lib/schemas/globals"
import { getChartData } from "@/lib/utils"

import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"

type NetWorthPercentagesProps = {
  accounts: Account[]
}

type ChartData = Array<{ months: string; netWorth: string }>

export const NetWorthPercentages: React.FC<NetWorthPercentagesProps> = ({
  accounts,
}) => {
  const [data, setData] = useState<ChartData>([])
  useEffect(() => {
    const netWorth = getChartData(accounts)

    let baseValue = netWorth[0].y ?? 0
    let values: ChartData = []

    netWorth?.forEach((item) => {
      const netWorthValue = (item.y * 100) / baseValue - 100
      values.push({
        months: item.x as string,
        netWorth: netWorthValue.toFixed(1),
      })
      baseValue = item.y
      console.log(values)
    })
    setData(values)
  }, [])

  return (
    <Card className="h-[400px] flex flex-col z-30">
      <CardHeader>
        <CardTitle>Net Worth Percentage</CardTitle>
      </CardHeader>
      <CardContent className="flex-1">
        <ResponsiveBar
          data={data}
          keys={["netWorth"]}
          indexBy="months"
          borderRadius={5}
          margin={{ top: 50, right: 20, bottom: 50, left: 50 }}
          padding={0.3}
          valueScale={{ type: "linear" }}
          indexScale={{ type: "band", round: true }}
          colors={["#61cdbb"]}
          borderColor={{
            from: "color",
            modifiers: [["darker", 1.6]],
          }}
          axisTop={null}
          axisRight={null}
          axisBottom={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: "country",
            legendPosition: "middle",
            legendOffset: 32,
            truncateTickAt: 0,
          }}
          axisLeft={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: "",
            legendPosition: "middle",
            legendOffset: -40,
            truncateTickAt: 0,
          }}
          labelSkipWidth={12}
          labelSkipHeight={12}
          labelTextColor={{
            from: "color",
            modifiers: [["darker", 1.6]],
          }}
          legends={undefined}
          enableGridY={false}
          role="application"
          ariaLabel="Nivo bar chart demo"
          tooltip={(data) => {
            return (
              <div className="bg-white z-99 p-2 rounded-sm shadow-sm border">
                <p>{`${data.data.months} ${data.data.netWorth}%`}</p>
              </div>
            )
          }}
        />
      </CardContent>
    </Card>
  )
}
