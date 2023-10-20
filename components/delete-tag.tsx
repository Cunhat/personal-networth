import React, { useEffect } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { Category } from "@/lib/schemas/category"
import { Tag } from "@/lib/schemas/tags"
import { PostCategorySchema } from "@/lib/validations/category"
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
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"

import { Icons } from "./icons"
import { Input } from "./ui/input"

type FormData = z.infer<typeof PostCategorySchema>

type DeleteTagProps = {
  id: Tag["id"]
}

export const DeleteTag: React.FC<DeleteTagProps> = ({ id }) => {
  const [isSaving, setIsSaving] = React.useState(false)
  const [open, setOpen] = React.useState(false)
  const router = useRouter()

  const onSubmit = async () => {
    setIsSaving(true)

    const response = await fetch(`/api/tag/delete`, {
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

    router.refresh()
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Icons.trash className="w-3 h-3 hover:cursor-pointer" />
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
          <AlertDialogAction onClick={() => onSubmit()}>
            {isSaving && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
