"use client"

import React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cva } from "class-variance-authority"

const NavItem = cva(
  "text-sm font-medium transition-colors hover:text-primary",
  {
    variants: {
      active: {
        true: "text-primary",
        false: "text-muted-foreground",
      },
    },
  }
)

export const Navbar = () => {
  const pathName = usePathname()

  return (
    <nav className="bg-white space-x-4 flex items-center h-16 pl-4">
      <Link href="/" className={NavItem({ active: pathName === "/" })}>
        Overview
      </Link>
      <Link
        href="/accounts"
        className={NavItem({ active: pathName === "/accounts" })}
      >
        Accounts
      </Link>
      <Link
        href="/networth"
        className={NavItem({ active: pathName === "/networth" })}
      >
        NetWorth
      </Link>
      <Link
        href="/expenses"
        className={NavItem({ active: pathName === "/expenses" })}
      >
        Expenses
      </Link>
      <Link
        href="/accountsInfo"
        className={NavItem({ active: pathName === "/accountsInfo" })}
      >
        Accounts
      </Link>
    </nav>
  )
}
