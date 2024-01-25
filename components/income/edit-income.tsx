"use client"

import React, { useState } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { IncomeSchema } from "@/lib/validations/income"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

import { Icons } from "../icons"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Label } from "../ui/label"

type FormData = z.infer<typeof IncomeSchema>

interface EditIncomeProps extends FormData {
  id: string
}

export const EditIncome: React.FC<EditIncomeProps> = ({ id, name, amount }) => {
  const [open, setOpen] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const router = useRouter()

  const form = useForm<FormData>({
    resolver: zodResolver(IncomeSchema),
    defaultValues: {
      name: name,
      amount: amount,
    },
  })

  const onSubmit = async (data: FormData) => {
    setIsSaving(true)

    const requestData = { id: id, ...data }

    const response = await fetch(`/api/income/edit`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestData),
    })

    if (response.ok) {
      setOpen(false)
      form.reset()
    }

    router.refresh()
    setIsSaving(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Icons.pencil className="w-4 h-4 hover:cursor-pointer" />
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <DialogHeader>
            <DialogTitle>Create a new income source</DialogTitle>
            <DialogDescription>
              Create a new income here. Click save when you are done.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <div className="col-span-3">
                <Input id="name" {...form.register("name")} />
                {form.formState.errors?.name && (
                  <p className="px-1 py-2 text-xs text-red-600">
                    {form.formState.errors.name.message}
                  </p>
                )}
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="amount" className="text-right">
                Amount
              </Label>
              <div className="col-span-3">
                <Input
                  id="amount"
                  {...form.register("amount", { valueAsNumber: true })}
                />
                {form.formState.errors?.amount && (
                  <p className="px-1 py-2 text-xs text-red-600">
                    {form.formState.errors.amount.message}
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
