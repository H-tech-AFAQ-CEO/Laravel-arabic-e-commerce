"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Eye } from "lucide-react"

const recentOrders = [
  {
    id: "ORD-001",
    customer: "أحمد محمد",
    total: 1250,
    status: "pending",
    date: "منذ 5 دقائق",
  },
  {
    id: "ORD-002",
    customer: "فاطمة علي",
    total: 890,
    status: "completed",
    date: "منذ 15 دقيقة",
  },
  {
    id: "ORD-003",
    customer: "محمد سالم",
    total: 2100,
    status: "processing",
    date: "منذ 30 دقيقة",
  },
]

export function RecentOrders() {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return <Badge variant="secondary">في الانتظار</Badge>
      case "processing":
        return <Badge className="bg-blue-500 text-white">قيد المعالجة</Badge>
      case "completed":
        return <Badge className="bg-accent text-accent-foreground">مكتمل</Badge>
      default:
        return <Badge variant="secondary">غير محدد</Badge>
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>الطلبات الأخيرة</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recentOrders.map((order) => (
            <div key={order.id} className="flex items-center justify-between p-3 border rounded-lg">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-medium">{order.id}</span>
                  {getStatusBadge(order.status)}
                </div>
                <p className="text-sm text-muted-foreground">{order.customer}</p>
                <p className="text-xs text-muted-foreground">{order.date}</p>
              </div>
              <div className="text-left">
                <p className="font-bold">{order.total} ر.س</p>
                <Button variant="ghost" size="sm">
                  <Eye className="h-4 w-4 ml-1" />
                  عرض
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
