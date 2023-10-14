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
      onMouseEnter={() => setIsHovering(!isHovering)}
      onMouseLeave={() => setIsHovering(!isHovering)}
    >
      {name}
      {isHovering && (
        <div className="flex pr-1 justify-end items-center gap-1 absolute rounded-full top-0 right-0 left-0 bottom-0 bg-white bg-opacity-80 w-full h-full">
          {editSlot}
          <Icons.trash className="w-3 h-3 hover:cursor-pointer" />
        </div>
      )}
    </Badge>
  )
}
