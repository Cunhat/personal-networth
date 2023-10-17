import React, { useEffect } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { PostCategorySchema } from "@/lib/validations/category"
import { PostTagSchema } from "@/lib/validations/tag"
import { Button } from "@/components/ui/button"
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

import { Icons } from "./icons"
import { Input } from "./ui/input"

const PostEditTagSchema = z.object({
  name: z.string(),
  id: z.string(),
})

type FormData = z.infer<typeof PostTagSchema>

type EditTagProps = {
  data: z.infer<typeof PostEditTagSchema>
}

export const EditTag: React.FC<EditTagProps> = ({ data }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(PostTagSchema),
    defaultValues: {
      name: data.name,
    },
  })
  const [isSaving, setIsSaving] = React.useState(false)
  const [open, setOpen] = React.useState(false)
  const router = useRouter()

  const onSubmit = async (formData: FormData) => {
    setIsSaving(true)

    const response = await fetch(`/api/tag/edit`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: formData.name,
        id: data.id,
      }),
    })

    setIsSaving(false)
    setOpen(false)

    // if (!response?.ok) {
    //   return toast({
    //     title: "Something went wrong.",
    //     description: "Your post was not saved. Please try again.",
    //     variant: "destructive",
    //   })
    // }

    router.refresh()
  }

  useEffect(() => {
    reset()
  }, [open])

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Icons.pencil className="w-3 h-3 hover:cursor-pointer" />
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogHeader>
            <DialogTitle>Edit a tag</DialogTitle>
            <DialogDescription>
              Edit your tag here. Click save when you are done.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <div className="col-span-3">
                <Input id="name" {...register("name")} />
                {errors?.name && (
                  <p className="px-1 py-2 text-xs text-red-600">
                    {errors.name.message}
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
