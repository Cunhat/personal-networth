"use client"

import React from "react"
import { useRouter } from "next/navigation"

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
} from "@/components/ui/alert-dialog"

import { Icons } from "../icons"
import { Button } from "../ui/button"

type DeleteProps = {
  id: string
}

const Delete: React.FC<DeleteProps> = ({ id }) => {
  const [isSaving, setIsSaving] = React.useState(false)
  const [open, setOpen] = React.useState(false)
  const router = useRouter()

  const onSubmit = async () => {
    setIsSaving(true)

    const response = await fetch(`/api/account/delete`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: id,
      }),
    })

    setIsSaving(false)
    setOpen(false)

    router.push("/accounts")
  }

  return (
    <AlertDialog open={open} onOpenChange={() => setOpen(!open)}>
      <AlertDialogTrigger asChild>
        <Button variant="outline">
          <Icons.trash className="w-3 h-3 hover:cursor-pointer" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            category and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <Button onClick={() => onSubmit()} disabled={isSaving}>
            {isSaving && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            Confirm
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default Delete
