import React from "react"
import { cva } from "class-variance-authority"

const EffortRateStyles = cva("", {
  variants: {
    effort: {
      low: "text-green-500",
      medium: "text-yellow-500",
      high: "text-red-500",
    },
  },
})

export const EffortRate: React.FC<{ value: number }> = ({ value }) => {
  if (value === undefined) return null

  const effort = value < 30 ? "low" : value < 40 ? "medium" : "high"
  return <p className={EffortRateStyles({ effort })}>{value}%</p>
}
