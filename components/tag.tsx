import React from "react"

import { Icons } from "./icons"
import { Badge } from "./ui/badge"

type TagProps = {
  name: string
  deleteSlot?: React.ReactNode
  editSlot?: React.ReactNode
}

export const Tag: React.FC<TagProps> = ({ name, deleteSlot, editSlot }) => {
  const [isHovering, setIsHovering] = React.useState(false)

  return (
    <Badge
      variant="secondary"
      className=" gap-1 relative"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {name}
      <div className="flex pr-1 justify-end items-center gap-1 absolute rounded-full top-0 right-0 left-0 bottom-0  hover:bg-gradient-to-r from-transparent via-white to-gray-200 w-full h-full opacity-0 hover:opacity-100">
        {editSlot}
        {deleteSlot}
      </div>
    </Badge>
  )
}
