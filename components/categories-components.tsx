"use client"

import React from "react"

import { Category } from "@/lib/schemas/category"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

import { CreateCategory } from "./create-category-form"
import { EditCategory } from "./edit-category-form"
import { Tag } from "./tag"

export const Categories: React.FC<{ data: Category[] }> = ({ data }) => {
  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>Categories</CardTitle>
          <CreateCategory />
        </div>
      </CardHeader>
      <CardContent className="flex gap-2 flex-wrap">
        {data?.map((category) => (
          // <Badge key={category.id} variant="secondary">
          //   {category.name}
          // </Badge>
          <Tag
            key={category.id}
            name={category.name}
            editSlot={<EditCategory data={category} />}
          />
        ))}
      </CardContent>
    </Card>
  )
}
