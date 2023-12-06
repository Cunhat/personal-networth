"use client"

import React from "react"
import { ResponsiveLine } from "@nivo/line"
import dayjs from "dayjs"

import { Account } from "@/lib/schemas/account"
import { ChartDataPoint } from "@/lib/schemas/globals"
import { getChartData } from "@/lib/utils"

import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"

type NetWorthChartProps = {
  accounts: Account[]
}

type ChartData = {
  id: string
  data: Array<ChartDataPoint>
}[]

export const NetWorthChart: React.FC<NetWorthChartProps> = ({ accounts }) => {
  const netWorth = getChartData(accounts)
  const data: ChartData = [{ id: "netWorth", data: netWorth }]

  return (
    <Card className="h-[400px] flex flex-col">
      <CardHeader>
        <CardTitle>Net Worth Chart</CardTitle>
      </CardHeader>
      <CardContent className="flex-1">
        {data[0]?.data.length > 0 ? (
          <ResponsiveLine
            data={data}
            margin={{ top: 40, right: 70, bottom: 30, left: 50 }}
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
            tooltip={(data) => {
              return (
                <div className="bg-white p-2 rounded-sm shadow-sm border">
                  <p>{`${data.point.data.x} - ${Intl.NumberFormat().format(
                    data.point.data.y as number
                  )}€`}</p>
                </div>
              )
            }}
          />
        ) : (
          <div className="flex justify-center items-center h-full">
            <p>No data to be displayed..</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
