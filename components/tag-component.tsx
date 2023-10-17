"use client"

import React from "react"

import { Tag } from "@/lib/schemas/tags"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

import { CreateCategory } from "./create-category-form"
import { CreateTag } from "./create-tag-form"
import { EditTag } from "./edit-tag"
import { Tag as TagBadge } from "./tag"

export const Tags: React.FC<{ data: Tag[] }> = ({ data }) => {
  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>Tags</CardTitle>
          <CreateTag />
        </div>
      </CardHeader>
      <CardContent className="flex gap-2 flex-wrap">
        {data?.map((tag) => (
          <TagBadge
            key={tag.id}
            name={tag.name}
            editSlot={<EditTag data={tag} />}
            // deleteSlot={<DeleteCategory id={category.id} />}
          />
        ))}
      </CardContent>
    </Card>
  )
}
