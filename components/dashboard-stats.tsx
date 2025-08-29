"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Package, ShoppingCart, Users, TrendingUp } from "lucide-react"

const stats = [
  {
    name: "إجمالي المنتجات",
    value: "1,234",
    change: "+12%",
    changeType: "positive" as const,
    icon: Package,
  },
  {
    name: "الطلبات الجديدة",
    value: "89",
    change: "+23%",
    changeType: "positive" as const,
    icon: ShoppingCart,
  },
  {
    name: "العملاء النشطون",
    value: "456",
    change: "+8%",
    changeType: "positive" as const,
    icon: Users,
  },
  {
    name: "المبيعات اليوم",
    value: "12,345 ر.س",
    change: "+15%",
    changeType: "positive" as const,
    icon: TrendingUp,
  },
]

export function DashboardStats() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => {
        const Icon = stat.icon
        return (
          <Card key={stat.name}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.name}</CardTitle>
              <Icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-accent">{stat.change}</span> من الشهر الماضي
              </p>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
