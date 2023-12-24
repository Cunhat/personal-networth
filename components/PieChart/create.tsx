"use client"

import React, { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import { z } from "zod"

import { Tag } from "@/lib/schemas/tags"
import { PostChartSchema } from "@/lib/validations/pieCharts"

import { Icons } from "../icons"
import { Button } from "../ui/button"
import {
  Dialog,
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

type MultiSelectProps = {
  data: Array<{ id: number | string; name: string }>
}

type FormData = z.infer<typeof PostChartSchema>

type CreatePieChartProps = {
  tags: Array<Tag>
}

export const CreatePieChart: React.FC<CreatePieChartProps> = ({ tags }) => {
  const [isSaving, setIsSaving] = useState(false)
  const [selected, setSelected] = useState<MultiSelectProps["data"]>([])
  const [open, setOpen] = React.useState(false)

  const form = useForm<FormData>({
    resolver: zodResolver(PostChartSchema),
  })

  const router = useRouter()

  const onSubmit = async (data: FormData) => {
    setIsSaving(true)

    await fetch("/api/pieChart", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: data.name,
        tag: data.tag,
      }),
    })

    setIsSaving(false)
    setOpen(false)
    form.reset()
    router.refresh()
  }

  useEffect(() => {
    form.reset()
    setSelected([])
  }, [open])

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>New PieChart</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <DialogHeader>
            <DialogTitle>Create new pie chart</DialogTitle>
            <DialogDescription>
              Create a new pie chart here. Click save when you are done.
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
                        onChange(e)
                        setSelected(e)
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
