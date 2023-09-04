import { redirect } from "next/navigation"
import { currentUser } from "@clerk/nextjs"

import { db } from "@/lib/db"
import { Card, CardContent } from "@/components/ui/card"
import { NetWorth } from "@/components/dashboard/networth"
import { NetWorthChart } from "@/components/dashboard/netWorthChart"

export default async function Home() {
  const user = await currentUser()

  if (!user) {
    redirect("/sign-in")
  }

  const userDb = await db.user.findUnique({
    where: {
      email: user?.emailAddresses[0].emailAddress ?? "",
    },
  })

  const accounts = await db.account.findMany({
    select: {
      id: true,
      name: true,
      userId: true,
      categoryId: true,
      category: {
        select: {
          id: true,
          name: true,
          type: true,
          userId: true,
        },
      },
      balance: {
        orderBy: {
          createdAt: "desc",
        },
      },
    },
    where: {
      userId: userDb?.id,
    },
  })

  const categories = await db.category.findMany({
    select: {
      id: true,
      name: true,
      userId: true,
      type: true,
    },
    where: {
      userId: userDb?.id,
    },
  })

  return (
    <div className="grid flex-1 gap-8 md:grid-cols-[300px_1fr]">
      <div className="flex-1 pb-6">
        <NetWorth accounts={accounts} categories={categories} />
      </div>
      <div className="flex flex-col flex-1 overflow-auto gap-3">
        <NetWorthChart accounts={accounts} />
        <div className="flex gap-3 flex-wrap lg:justify-between justify-normal">
          <Card className="flex flex-col md:w-fit w-full">
            <div className="flex flex-col gap-1 p-4">
              <p className="text-muted-foreground">Total net money</p>
              <h2 className="text-xl font-semibold tracking-tight">40 000 $</h2>
            </div>
          </Card>
          <Card className="flex flex-col md:w-fit w-full">
            <div className="flex flex-col gap-1 p-4">
              <p className="text-muted-foreground">Total invested money</p>
              <h2 className="text-xl font-semibold tracking-tight">40 000 $</h2>
            </div>
          </Card>
          <Card className="flex flex-col md:w-fit w-full">
            <div className="flex flex-col gap-1 p-4">
              <p className="text-muted-foreground">Total crypto money</p>
              <h2 className="text-xl font-semibold tracking-tight">40 000 $</h2>
            </div>
          </Card>
          <Card className="flex flex-col md:w-fit w-full">
            <div className="flex flex-col gap-1 p-4">
              <p className="text-muted-foreground">Net money + crypto money</p>
              <h2 className="text-xl font-semibold tracking-tight">40 000 $</h2>
            </div>
          </Card>
          <Card className="flex flex-col md:w-fit w-full">
            <div className="flex flex-col gap-1 p-4">
              <p className="text-muted-foreground">Invested this year</p>
              <h2 className="text-xl font-semibold tracking-tight">40 000 $</h2>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
