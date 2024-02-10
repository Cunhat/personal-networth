"use client"

import React, { useState } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { CellContext } from "@tanstack/react-table"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { ExpensesSchema } from "@/lib/validations/expenses"

import { Icons } from "../icons"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog"
import { Button } from "../ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu"
import { Form } from "../ui/form"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { Toggle } from "../ui/toggle"

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

type FormData = z.infer<typeof ExpensesSchema>

export const EditExpense: React.FC<CellContext<any, unknown>> = ({ row }) => {
  const [isSaving, setIsSaving] = useState<boolean>(false)
  const [open, setOpen] = useState(false)
  const [selectedMonths, setSelectedMonths] = useState<string[]>(
    row.original.months.split("|")
  )
  const form = useForm<FormData>({
    resolver: zodResolver(ExpensesSchema),
    defaultValues: {
      name: row.original.name,
      amount: row.original.amount,
    },
  })
  const router = useRouter()

  console.log(row.original)

  const onSubmit = async (mutateData: FormData) => {
    setIsSaving(true)

    await fetch(`/api/expenses/edit`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: row.original.id,
        name: mutateData.name,
        amount: mutateData.amount,
        months: selectedMonths.join("|"),
      }),
    })

    setIsSaving(false)
    setOpen(false)
    router.refresh()
  }

  const handleToggleMonth = (pressed: boolean, month: string) => {
    if (pressed) {
      setSelectedMonths([...selectedMonths, month])
    } else {
      setSelectedMonths(selectedMonths.filter((m) => m !== month))
    }
  }

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <DropdownMenuItem
          className="fex gap-2"
          onSelect={(e) => e.preventDefault()}
        >
          <Icons.pencil className="w-4 h-4 hover:cursor-pointer" />
          Edit
        </DropdownMenuItem>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <AlertDialogHeader>
              <AlertDialogTitle>Edit an expense</AlertDialogTitle>
              <AlertDialogDescription>
                Edit an expense here. Click save when you are done.
              </AlertDialogDescription>
            </AlertDialogHeader>
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
                    pressed={selectedMonths.includes(month.key)}
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
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <Button type="submit" disabled={isSaving}>
                {isSaving && (
                  <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                )}
                Save changes
              </Button>
            </AlertDialogFooter>
          </form>
        </Form>
      </AlertDialogContent>
    </AlertDialog>
  )
}
