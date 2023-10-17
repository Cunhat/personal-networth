import React, { useEffect } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { Category } from "@/lib/schemas/category"
import { PostCategorySchema } from "@/lib/validations/category"
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

type FormData = z.infer<typeof PostCategorySchema>

type EditCategoryProps = {
  data: Category
}

export const EditCategory: React.FC<EditCategoryProps> = ({ data }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(PostCategorySchema),
    defaultValues: {
      name: data?.name,
      type: data?.type,
    },
  })
  const [isSaving, setIsSaving] = React.useState(false)
  const [open, setOpen] = React.useState(false)
  const router = useRouter()

  const onSubmit = async (formData: FormData) => {
    setIsSaving(true)

    const response = await fetch(`/api/category/edit`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: data.id,
        name: formData.name,
        type: formData.type,
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
            <DialogTitle>Edit a category</DialogTitle>
            <DialogDescription>
              Create your new category here. Click save when you are done.
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
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Type
              </Label>
              <div className="col-span-3">
                <Input id="type" className="col-span-3" {...register("type")} />
                {errors?.type && (
                  <p className="px-1 py-2 text-xs text-red-600">
                    {errors.type.message}
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
