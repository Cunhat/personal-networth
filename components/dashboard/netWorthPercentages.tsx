"use client"

import React from "react"
import { ResponsiveBar } from "@nivo/bar"

import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"

const data = [
  {
    months: "Jan",
    netWorth: 1000,
  },
  {
    months: "Feb",
    netWorth: -2000,
  },
  {
    months: "Mar",
    netWorth: 3000,
  },
  {
    months: "Apr",
    netWorth: 4000,
  },
  {
    months: "May",
    netWorth: 5000,
  },
  {
    months: "Jun",
    netWorth: 6000,
  },
  {
    months: "Jul",
    netWorth: 7000,
  },
  {
    months: "Aug",
    netWorth: 8000,
  },
  {
    months: "Sep",
    netWorth: 9000,
  },
  {
    months: "Oct",
    netWorth: 10000,
  },
  {
    months: "Nov",
    netWorth: 11000,
  },
  {
    months: "Dec",
    netWorth: 12000,
  },
]

export const NetWorthPercentages = () => {
  return (
    <Card className="h-[400px] flex flex-col z-30">
      <CardHeader>
        <CardTitle>Net Worth Chart</CardTitle>
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
                <p>{`${data.data.months} ${data.data.netWorth}`}</p>
              </div>
            )
          }}
        />
      </CardContent>
    </Card>
  )
}
