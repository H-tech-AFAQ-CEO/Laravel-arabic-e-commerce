"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { User, MapPin, Phone, Mail, ShoppingCart, Calendar, Ban, CheckCircle } from "lucide-react"

interface Customer {
  id: string
  name: string
  email: string
  phone: string
  status: "active" | "inactive" | "blocked"
  totalOrders: number
  totalSpent: number
  lastOrderDate: string
  joinDate: string
  avatar?: string
  address: string
  city: string
}

interface CustomerDetailsDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  customer?: Customer | null
  onClose?: () => void
}

const mockOrderHistory = [
  {
    id: "ORD-001",
    date: "2024-01-15T10:30:00Z",
    total: 1250,
    status: "delivered",
    items: 2,
  },
  {
    id: "ORD-002",
    date: "2024-01-10T14:20:00Z",
    total: 890,
    status: "delivered",
    items: 3,
  },
  {
    id: "ORD-003",
    date: "2024-01-05T09:15:00Z",
    total: 2100,
    status: "delivered",
    items: 1,
  },
]

export function CustomerDetailsDialog({ open, onOpenChange, customer, onClose }: CustomerDetailsDialogProps) {
  const [customerStatus, setCustomerStatus] = useState(customer?.status || "active")

  if (!customer) return null

  const getStatusBadge = (status: Customer["status"]) => {
    switch (status) {
      case "active":
        return <Badge className="bg-accent text-accent-foreground">نشط</Badge>
      case "inactive":
        return <Badge variant="secondary">غير نشط</Badge>
      case "blocked":
        return <Badge variant="destructive">محظور</Badge>
      default:
        return <Badge variant="secondary">غير محدد</Badge>
    }
  }

  const getOrderStatusBadge = (status: string) => {
    switch (status) {
      case "delivered":
        return <Badge className="bg-accent text-accent-foreground">تم التسليم</Badge>
      case "processing":
        return <Badge className="bg-blue-500 text-white">قيد المعالجة</Badge>
      case "cancelled":
        return <Badge variant="destructive">ملغي</Badge>
      default:
        return <Badge variant="secondary">غير محدد</Badge>
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("ar-SA", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const handleStatusUpdate = () => {
    // Mock status update - replace with actual API call
    console.log("Updating customer status:", customer.id, customerStatus)
    onClose?.()
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            تفاصيل العميل
          </DialogTitle>
          <DialogDescription>معلومات شاملة عن العميل وتاريخ المشتريات</DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Customer Header */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <Avatar className="h-20 w-20">
                  <AvatarImage src={customer.avatar || "/placeholder.svg"} alt={customer.name} />
                  <AvatarFallback className="text-2xl">{customer.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <h2 className="text-2xl font-bold">{customer.name}</h2>
                  <p className="text-muted-foreground">{customer.id}</p>
                  <div className="flex items-center gap-2 mt-2">
                    {getStatusBadge(customer.status)}
                    <span className="text-sm text-muted-foreground">عضو منذ {formatDate(customer.joinDate)}</span>
                  </div>
                </div>
                <div className="text-left">
                  <div className="text-2xl font-bold">{customer.totalSpent.toLocaleString()} ر.س</div>
                  <div className="text-sm text-muted-foreground">إجمالي المشتريات</div>
                  <div className="text-lg font-semibold mt-1">{customer.totalOrders} طلب</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Tabs defaultValue="info" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="info">المعلومات الأساسية</TabsTrigger>
              <TabsTrigger value="orders">تاريخ الطلبات</TabsTrigger>
              <TabsTrigger value="settings">الإعدادات</TabsTrigger>
            </TabsList>

            <TabsContent value="info" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">معلومات الاتصال</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      <span className="ltr">{customer.email}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      <span className="ltr">{customer.phone}</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <MapPin className="h-4 w-4 text-muted-foreground mt-1" />
                      <div>
                        <div>{customer.address}</div>
                        <div className="text-sm text-muted-foreground">{customer.city}</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">إحصائيات العميل</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex justify-between">
                      <span>إجمالي الطلبات:</span>
                      <span className="font-bold">{customer.totalOrders}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>إجمالي المشتريات:</span>
                      <span className="font-bold">{customer.totalSpent.toLocaleString()} ر.س</span>
                    </div>
                    <div className="flex justify-between">
                      <span>متوسط قيمة الطلب:</span>
                      <span className="font-bold">
                        {Math.round(customer.totalSpent / customer.totalOrders).toLocaleString()} ر.س
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>آخر طلب:</span>
                      <span className="font-bold">{formatDate(customer.lastOrderDate)}</span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="orders" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">تاريخ الطلبات</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {mockOrderHistory.map((order) => (
                      <div key={order.id} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center gap-3">
                          <ShoppingCart className="h-8 w-8 text-muted-foreground" />
                          <div>
                            <div className="font-medium">{order.id}</div>
                            <div className="text-sm text-muted-foreground">
                              {formatDate(order.date)} • {order.items} عنصر
                            </div>
                          </div>
                        </div>
                        <div className="text-left">
                          <div className="font-bold">{order.total} ر.س</div>
                          {getOrderStatusBadge(order.status)}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="settings" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">إدارة حالة العميل</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span>الحالة الحالية:</span>
                    {getStatusBadge(customer.status)}
                  </div>
                  <Separator />
                  <div className="space-y-2">
                    <label className="text-sm font-medium">تحديث حالة العميل:</label>
                    <Select value={customerStatus} onValueChange={setCustomerStatus}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="active">
                          <div className="flex items-center gap-2">
                            <CheckCircle className="h-4 w-4 text-green-500" />
                            نشط
                          </div>
                        </SelectItem>
                        <SelectItem value="inactive">
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-gray-500" />
                            غير نشط
                          </div>
                        </SelectItem>
                        <SelectItem value="blocked">
                          <div className="flex items-center gap-2">
                            <Ban className="h-4 w-4 text-red-500" />
                            محظور
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <Button onClick={handleStatusUpdate} className="w-full">
                      تحديث الحالة
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </DialogContent>
    </Dialog>
  )
}
