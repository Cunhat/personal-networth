"use client"

import React, { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { ExpensesSchema } from "@/lib/validations/expenses"
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
import { Form } from "../ui/form"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { Toggle } from "../ui/toggle"

type FormData = z.infer<typeof ExpensesSchema>

const Months = [
  { key: "january", label: "Jan" },
  { key: "february", label: "Feb" },
  { key: "march", label: "Mar" },
  { key: "april", label: "Apr" },
  { key: "may", label: "May" },
  { key: "june", label: "Jun" },
  { key: "july", label: "Jul" },
  { key: "august", label: "Aug" },
  { key: "september", label: "Sep" },
  { key: "october", label: "Oct" },
  { key: "november", label: "Nov" },
  { key: "december", label: "Dec" },
]

export const CreateExpense: React.FC = () => {
  const [open, setOpen] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [selectedMonths, setSelectedMonths] = useState<string[]>([])
  const router = useRouter()

  const form = useForm<FormData>({
    resolver: zodResolver(ExpensesSchema),
  })

  const onSubmit = async (data: FormData) => {
    setIsSaving(true)
    console.log("selectedMonths", selectedMonths)

    const response = await fetch(`/api/expenses`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: data.name,
        amount: data.amount,
        months: selectedMonths.join("|"),
      }),
    })

    setIsSaving(false)
    setOpen(false)
    form.reset()
    router.refresh()
  }

  useEffect(() => {
    form.reset()
    setSelectedMonths([])
  }, [open])

  const handleToggleMonth = (pressed: boolean, month: string) => {
    if (pressed) {
      setSelectedMonths([...selectedMonths, month])
    } else {
      setSelectedMonths(selectedMonths.filter((m) => m !== month))
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Create</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <DialogHeader>
              <DialogTitle>Create a new expense</DialogTitle>
              <DialogDescription>
                Create a new expense here. Click save when you are done.
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
              <div className="flex gap-3 flex-wrap">
                {Months.map((month, index) => (
                  <Toggle
                    key={month.key + index}
                    variant="outline"
                    aria-label="Toggle italic"
                    onPressedChange={(value) =>
                      handleToggleMonth(value, month.key)
                    }
                  >
                    <p>{month.label}</p>
                  </Toggle>
                ))}
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
        </Form>
      </DialogContent>
    </Dialog>
  )
}
