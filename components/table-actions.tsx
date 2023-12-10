"use client"

import React from "react"
import { useRouter } from "next/navigation"
import { CellContext, RowData } from "@tanstack/react-table"

import { Icons } from "./icons"
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
} from "./ui/alert-dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu"

export const TableActions: React.FC<CellContext<any, unknown>> = ({
  getValue,
  row,
  column,
  table,
}) => {
  const [isSaving, setIsSaving] = React.useState<boolean>(false)

  const router = useRouter()

  const onSubmit = async () => {
    setIsSaving(true)

    await fetch(`/api/balance/delete`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: row.original.id,
      }),
    })

    setIsSaving(false)
    router.refresh()
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Icons.moreVertical className="w-4 h-4" />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Table Actions</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <DropdownMenuItem
              className="fex gap-2"
              onSelect={(e) => e.preventDefault()}
            >
              <Icons.trash className="w-4 h-4 hover:cursor-pointer" />
              Delete
            </DropdownMenuItem>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>
                Are you sure you want to delete this record?
              </AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete this
                record and remove your data from our servers.
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
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
