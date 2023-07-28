"use client"

import React from "react"

import { Category } from "@/lib/schemas/category"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

import { CreateCategory } from "./create-category-form"

export const Categories: React.FC<{ data: Category[] }> = ({ data }) => {
  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between">
          <CardTitle>Categories</CardTitle>
          <CreateCategory />
        </div>
      </CardHeader>
      <CardContent className="flex gap-2 flex-wrap">
        {data?.map((category) => (
          <Badge key={category.id} variant="secondary">
            {category.name}
          </Badge>
        ))}
      </CardContent>
    </Card>
  )
}
