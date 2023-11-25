import React from "react"

import { Icons } from "@/components/icons"

const Loading = () => {
  return (
    <div className="h-full flex justify-center items-center">
      <Icons.spinner className="h-6 w-6 animate-spin text-gray-400" />
    </div>
  )
}

export default Loading
