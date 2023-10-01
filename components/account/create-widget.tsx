"use client"

import React from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { Dialog } from "@radix-ui/react-dialog"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { PostWidgetSchema } from "@/lib/validations/widgets"

import { Icons } from "../icons"
import { Button } from "../ui/button"
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog"
import { Input } from "../ui/input"
import { Label } from "../ui/label"

type FormData = z.infer<typeof PostWidgetSchema>

export const CreateWidget = () => {
  const [open, setOpen] = React.useState(false)
  const [isSaving, setIsSaving] = React.useState(false)
  const form = useForm<FormData>({
    resolver: zodResolver(PostWidgetSchema),
  })

  const router = useRouter()

  const onSubmit = async (data: FormData) => {
    setIsSaving(true)

    // const response = await fetch(`/api/account`, {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({
    //     name: data.name,
    //     category: data.category,
    //     tag: data.tag,
    //   }),
    // })

    setIsSaving(false)
    setOpen(false)
    form.reset()
    router.refresh()
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>New Widget</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <DialogHeader>
            <DialogTitle>Create new widget</DialogTitle>
            <DialogDescription>
              Create a new widget here. Click save when you are done.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <div className="col-span-3">
                <Input
                  id="name"
                  className="col-span-3"
                  {...form.register("name")}
                />
                {form.formState.errors?.name && (
                  <p className="px-1 py-2 text-xs text-red-600">
                    {form.formState.errors.name.message}
                  </p>
                )}
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" disabled={isSaving}>
              {isSaving && (
                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
              )}
              Save changes
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
