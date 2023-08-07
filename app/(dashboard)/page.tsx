import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Networth } from "@/components/dashboard/networth"

export default function Home() {
  return (
    <div className="grid flex-1 gap-8 md:grid-cols-[250px_1fr]">
      <div className="col-span-1 flex-1 pb-6">
        <Networth />
      </div>
      <div className="bg-pink-500 flex-1">ssss</div>
    </div>
  )
}
