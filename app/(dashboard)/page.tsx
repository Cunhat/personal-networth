import { redirect } from "next/navigation"
import { currentUser } from "@clerk/nextjs"

import { db } from "@/lib/db"
import { Networth } from "@/components/dashboard/networth"
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
        <Networth accounts={accounts} categories={categories} />
      </div>
      <div className="flex-1 overflow-auto">
        <NetWorthChart accounts={accounts} />
      </div>
    </div>
  )
}
