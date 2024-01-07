"use client"

import React, { useEffect } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import dayjs from "dayjs"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { cn } from "@/lib/utils"
import { PostBalanceSchema } from "@/lib/validations/balance"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

import { Icons } from "./icons"
import { Button } from "./ui/button"
import { Calendar } from "./ui/calendar"
import { Form, FormControl, FormField, FormItem } from "./ui/form"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover"

type FormData = z.infer<typeof PostBalanceSchema>

export const AddBalance: React.FC<{ accountId: string }> = ({ accountId }) => {
  const [isSaving, setIsSaving] = React.useState(false)
  const [open, setOpen] = React.useState(false)
  const router = useRouter()

  const form = useForm<FormData>({
    resolver: zodResolver(PostBalanceSchema),
  })

  const onSubmit = async (data: FormData) => {
    setIsSaving(true)

    const response = await fetch(`/api/balance`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        balance: data.balance,
        createdAt: data.createdAt,
        accountId: accountId,
      }),
    })

    setIsSaving(false)
    setOpen(false)
    form.reset()
    router.refresh()
  }

  useEffect(() => {
    form.reset()
  }, [open])

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="ml-auto mr-3">Add Balance</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <DialogHeader>
              <DialogTitle>Add balance</DialogTitle>
              <DialogDescription>
                Add balance to your account here. Click save when you are done.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Balance
                </Label>
                <div className="col-span-3">
                  <Input
                    id="name"
                    {...form.register("balance", { valueAsNumber: true })}
                  />
                  {form.formState.errors?.balance && (
                    <p className="px-1 py-2 text-xs text-red-600">
                      {form.formState.errors.balance.message}
                    </p>
                  )}
                </div>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Created at
                </Label>
                <div className="col-span-3">
                  <FormField
                    control={form.control}
                    name="createdAt"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant={"outline"}
                                className={cn(
                                  "w-[280px] pl-3 text-left font-normal",
                                  !field.value && "text-muted-foreground"
                                )}
                              >
                                {field.value ? (
                                  dayjs(field.value).format("DD/MMM/YYYY")
                                ) : (
                                  <span>Pick a date</span>
                                )}
                                <Icons.calendar className="ml-auto h-4 w-4 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={field.value}
                              onSelect={field.onChange}
                              disabled={(date: Date) =>
                                date > new Date() ||
                                date < new Date("1900-01-01")
                              }
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                        {form.formState.errors?.createdAt && (
                          <p className="px-1 text-xs text-red-600">
                            {form.formState.errors.createdAt.message}
                          </p>
                        )}
                      </FormItem>
                    )}
                  />
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
        </Form>
      </DialogContent>
    </Dialog>
  )
}
