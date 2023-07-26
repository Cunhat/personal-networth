import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Account } from "@/components/account-component"

export default function Accounts() {
  return (
    <main className="flex min-h-screen flex-col p-5 gap-3">
      <h2 className="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
        Accounts
      </h2>
      <Card className="">
        <CardHeader>
          <div className="flex justify-between">
            <CardTitle>Categories</CardTitle>
            <Button>Create Category</Button>
          </div>
        </CardHeader>
        <CardContent className="flex gap-2 flex-wrap">
          <Badge variant="secondary">Secondary</Badge>
          <Badge variant="secondary">Secondary</Badge>
          <Badge variant="secondary">Secondary</Badge>
          <Badge variant="secondary">Secondary</Badge>
        </CardContent>
      </Card>

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
