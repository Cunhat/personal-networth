"use client"

import React, { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { Dialog } from "@radix-ui/react-dialog"
import { set } from "date-fns"
import { Controller, useForm } from "react-hook-form"
import { z } from "zod"

import { Tag } from "@/lib/schemas/tags"
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
import { MultiSelect } from "../ui/multi-select"

type FormData = z.infer<typeof PostWidgetSchema>

type CreateWidgetProps = {
  tags: Array<Tag>
  widget: {
    id: string
    title: string
    widgetsOnTags: Array<{ tag: { id: string; name: string } }>
  }
}

type MultiSelectProps = {
  data: Array<{ id: number | string; name: string }>
}

export const EditWidget: React.FC<CreateWidgetProps> = ({ tags, widget }) => {
  const [open, setOpen] = React.useState(false)
  const [isSaving, setIsSaving] = React.useState(false)
  const [selected, setSelected] = useState<MultiSelectProps["data"]>(
    widget.widgetsOnTags.map((wot) => wot.tag)
  )
  const form = useForm<FormData>({
    resolver: zodResolver(PostWidgetSchema),
    defaultValues: {
      name: widget.title,
      tag: widget.widgetsOnTags.map((wot) => wot.tag),
    },
  })

  const router = useRouter()

  const onSubmit = async (data: FormData) => {
    setIsSaving(true)

    const response = await fetch(`/api/widget/edit`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: data.name,
        tag: data.tag,
        id: widget.id,
      }),
    })

    setIsSaving(false)
    setOpen(false)
    form.reset()
    router.refresh()
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Icons.pencil className="w-4 h-4 hover:cursor-pointer" />
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
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Tags
              </Label>
              <div className="col-span-3">
                <Controller
                  control={form.control}
                  name="tag"
                  render={({ field: { onChange } }) => (
                    <MultiSelect
                      data={tags}
                      selected={selected}
                      onChange={(e) => {
                        const uniques = new Set(e)

                        const uniqueArray = e.map((item) => {
                          return uniques.has(item) ? item : null
                        })
                        console.log(uniqueArray)
                        onChange(uniqueArray)
                        setSelected(uniqueArray)
                      }}
                    />
                  )}
                />
                {form.formState.errors?.tag && (
                  <p className="px-1 py-2 text-xs text-red-600">
                    {form.formState.errors.tag.message}
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
