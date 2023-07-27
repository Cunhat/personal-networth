"use client"

import React from "react"
import { useRouter } from "next/navigation"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"

import { Input } from "./ui/input"

export const Categories = () => {
  //Todo: CHange to react hook form
  const [newCategoryName, setNewCategoryName] = React.useState<string>("")
  const [newCategoryType, setNewCategoryType] = React.useState<string>("")
  const router = useRouter()

  const onSubmit = async (data: any) => {
    // setIsSaving(true)

    const response = await fetch(`/api/category`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: newCategoryName,
        type: newCategoryType,
      }),
    })

    // setIsSaving(false)

    // if (!response?.ok) {
    //   return toast({
    //     title: "Something went wrong.",
    //     description: "Your post was not saved. Please try again.",
    //     variant: "destructive",
    //   })
    // }

    router.refresh()
  }

  return (
    <Card className="">
      <CardHeader>
        <div className="flex justify-between">
          <CardTitle>Categories</CardTitle>
          <Dialog>
            <DialogTrigger asChild>
              <Button>New Category</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Create a new category</DialogTitle>
                <DialogDescription>
                  Create your new category here. Click save when you're done.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">
                    Name
                  </Label>
                  <Input
                    id="name"
                    value={newCategoryName}
                    className="col-span-3"
                    onChange={(e) => setNewCategoryName(e.target.value)}
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">
                    Type
                  </Label>
                  <Input
                    id="name"
                    value={newCategoryType}
                    className="col-span-3"
                    onChange={(e) => setNewCategoryType(e.target.value)}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button onClick={() => onSubmit({})} type="submit">
                  Save changes
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>
      <CardContent className="flex gap-2 flex-wrap">
        <Badge variant="secondary">Secondary</Badge>
        <Badge variant="secondary">Secondary</Badge>
        <Badge variant="secondary">Secondary</Badge>
        <Badge variant="secondary">Secondary</Badge>
      </CardContent>
    </Card>
  )
}
