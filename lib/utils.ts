import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { ChartDataPoint } from "./schemas/globals"
import dayjs from "dayjs"
import { Account } from "./schemas/account"
 
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export  const getChartData = (accounts: Account[]) => {
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