import React from "react"

import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { CreateWidget } from "./create-widget"

export const Widgets = () => {
  return (
    <div>
      <Card className="">
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Widgets</CardTitle>
            <CreateWidget />
          </div>
        </CardHeader>
        <CardContent></CardContent>
      </Card>
    </div>
  )
}
