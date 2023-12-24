

import * as z from "zod"

export const PieChartSchema = z.object({
    title: z.string(),
    pieChartsOnTags: z.array(z.object({
        pieChartId: z.string(),
        tagId: z.string(),
    }))
})

export type PieChart = z.infer<typeof PieChartSchema>

export const PieChartDataSchema = z.object({
    id: z.string(),
    label: z.string(),
    value: z.number()
})

export type ChartData = z.infer<typeof PieChartDataSchema>