"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Package } from "lucide-react"

const lowStockProducts = [
  {
    id: "1",
    name: "هاتف ذكي سامسونج",
    stock: 5,
    status: "low-stock",
  },
  {
    id: "2",
    name: "حقيبة يد جلدية",
    stock: 0,
    status: "out-of-stock",
  },
  {
    id: "3",
    name: "ساعة رياضية ذكية",
    stock: 3,
    status: "low-stock",
  },
]

export function ProductsOverview() {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "low-stock":
        return <Badge variant="secondary">مخزون منخفض</Badge>
      case "out-of-stock":
        return <Badge variant="destructive">نفد المخزون</Badge>
      default:
        return <Badge variant="secondary">غير محدد</Badge>
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>تنبيهات المخزون</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {lowStockProducts.map((product) => (
            <div key={product.id} className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex items-center gap-3">
                <Package className="h-8 w-8 text-muted-foreground" />
                <div>
                  <p className="font-medium">{product.name}</p>
                  <p className="text-sm text-muted-foreground">الكمية: {product.stock}</p>
                </div>
              </div>
              <div className="text-left">{getStatusBadge(product.status)}</div>
            </div>
          ))}
        </div>
        <Button variant="outline" className="w-full mt-4 bg-transparent">
          عرض جميع المنتجات
        </Button>
      </CardContent>
    </Card>
  )
}
