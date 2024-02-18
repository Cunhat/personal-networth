"use client"

import React from "react"
import { useSearchParams } from "next/navigation"

import { Account } from "./account"

export const SelectedAccount = () => {
  const searchParams = useSearchParams()

  return <Account params={{ accountId: searchParams.get("accountId") ?? "" }} />
}
