"use client"

import React from "react"
import { ResponsivePie } from "@nivo/pie"

import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"

const data = [
  {
    id: "javascript",
    label: "javascript",
    value: 204,
    color: "hsl(241, 70%, 50%)",
  },
  {
    id: "rust",
    label: "rust",
    value: 305,
    color: "hsl(42, 70%, 50%)",
  },
  {
    id: "php",
    label: "php",
    value: 12,
    color: "hsl(183, 70%, 50%)",
  },
  {
    id: "stylus",
    label: "stylus",
    value: 411,
    color: "hsl(276, 70%, 50%)",
  },
  {
    id: "elixir",
    label: "elixir",
    value: 63,
    color: "hsl(325, 70%, 50%)",
  },
]

export const InvestmentsPie: React.FC = () => {
  return (
    <Card className="h-[400px] flex flex-col">
      <CardHeader>
        <CardTitle>Investments</CardTitle>
      </CardHeader>
      <CardContent className="flex-1">
        <ResponsivePie
          data={data}
          margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
          innerRadius={0.5}
          padAngle={0.7}
          cornerRadius={3}
          activeOuterRadiusOffset={8}
          borderWidth={1}
          borderColor={{
            from: "color",
            modifiers: [["darker", 0.2]],
          }}
          arcLinkLabelsSkipAngle={10}
          arcLinkLabelsTextColor="#333333"
          arcLinkLabelsThickness={2}
          arcLinkLabelsColor={{ from: "color" }}
          arcLabelsSkipAngle={10}
          arcLabelsTextColor={{
            from: "color",
            modifiers: [["darker", 2]],
          }}
          defs={[
            {
              id: "dots",
              type: "patternDots",
              background: "inherit",
              color: "rgba(255, 255, 255, 0.3)",
              size: 4,
              padding: 1,
              stagger: true,
            },
            {
              id: "lines",
              type: "patternLines",
              background: "inherit",
              color: "rgba(255, 255, 255, 0.3)",
              rotation: -45,
              lineWidth: 6,
              spacing: 10,
            },
          ]}
          fill={[
            {
              match: {
                id: "ruby",
              },
              id: "dots",
            },
            {
              match: {
                id: "c",
              },
              id: "dots",
            },
            {
              match: {
                id: "go",
              },
              id: "dots",
            },
            {
              match: {
                id: "python",
              },
              id: "dots",
            },
            {
              match: {
                id: "scala",
              },
              id: "lines",
            },
            {
              match: {
                id: "lisp",
              },
              id: "lines",
            },
            {
              match: {
                id: "elixir",
              },
              id: "lines",
            },
            {
              match: {
                id: "javascript",
              },
              id: "lines",
            },
          ]}
          legends={[
            {
              anchor: "bottom",
              direction: "row",
              justify: false,
              translateX: 0,
              translateY: 56,
              itemsSpacing: 0,
              itemWidth: 70,
              itemHeight: 18,
              itemTextColor: "#999",
              itemDirection: "left-to-right",
              itemOpacity: 1,
              symbolSize: 18,
              symbolShape: "circle",
              effects: [
                {
                  on: "hover",
                  style: {
                    itemTextColor: "#000",
                  },
                },
              ],
            },
          ]}
        />
      </CardContent>
    </Card>
  )
}
