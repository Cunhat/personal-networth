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
    <nav className="bg-white border-b space-x-4 flex items-center h-16 pl-4">
      <Link href="/" className={NavItem({ active: pathName === "/" })}>
        Overview
      </Link>
      <Link
        href="/accounts"
        className={NavItem({ active: pathName === "teste" })}
      >
        Teste
      </Link>
    </nav>
  )
}
