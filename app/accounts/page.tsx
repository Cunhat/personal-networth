"use client"

import { useUser } from "@clerk/clerk-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Account } from "@/components/account-component"
import { Categories } from "@/components/categories-components"

export default function Accounts() {
  const { isSignedIn, user, isLoaded } = useUser()

  if (isLoaded) {
    console.log(user)
  }

  return (
    <main className="flex min-h-screen flex-col p-5 gap-3">
      <h2 className="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
        Accounts
      </h2>
      <Categories />

      <Card className="">
        <CardHeader>
          <div className="flex justify-between">
            <CardTitle>Accounts list</CardTitle>
            <Button>Create Account</Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-4">
            <Account />
            <Account />
            <Account />
            <Account />
            <Account />
          </div>
        </CardContent>
      </Card>
    </main>
  )
}
