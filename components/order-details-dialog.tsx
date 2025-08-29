"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Package, MapPin, Phone, Mail, CreditCard } from "lucide-react"

interface Order {
  id: string
  customerName: string
  customerEmail: string
  customerPhone: string
  total: number
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled"
  paymentStatus: "pending" | "paid" | "failed" | "refunded"
  createdAt: string
  shippingAddress: string
  items: Array<{
    id: string
    name: string
    quantity: number
    price: number
    image: string
  }>
}

interface OrderDetailsDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  order?: Order | null
  onClose?: () => void
}

export function OrderDetailsDialog({ open, onOpenChange, order, onClose }: OrderDetailsDialogProps) {
  const [orderStatus, setOrderStatus] = useState(order?.status || "pending")

  if (!order) return null

  const getStatusBadge = (status: Order["status"]) => {
    switch (status) {
      case "pending":
        return <Badge variant="secondary">في الانتظار</Badge>
      case "processing":
        return <Badge className="bg-blue-500 text-white">قيد المعالجة</Badge>
      case "shipped":
        return <Badge className="bg-orange-500 text-white">تم الشحن</Badge>
      case "delivered":
        return <Badge className="bg-accent text-accent-foreground">تم التسليم</Badge>
      case "cancelled":
        return <Badge variant="destructive">ملغي</Badge>
      default:
        return <Badge variant="secondary">غير محدد</Badge>
    }
  }

  const getPaymentStatusBadge = (status: Order["paymentStatus"]) => {
    switch (status) {
      case "pending":
        return <Badge variant="outline">في الانتظار</Badge>
      case "paid":
        return <Badge className="bg-accent text-accent-foreground">مدفوع</Badge>
      case "failed":
        return <Badge variant="destructive">فشل</Badge>
      case "refunded":
        return <Badge variant="secondary">مسترد</Badge>
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
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const handleStatusUpdate = () => {
    // Mock status update - replace with actual API call
    console.log("Updating order status:", order.id, orderStatus)
    onClose?.()
  }

  const subtotal = order.items.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const shipping = 50 // Mock shipping cost
  const tax = subtotal * 0.15 // 15% VAT

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Package className="h-5 w-5" />
            تفاصيل الطلب {order.id}
          </DialogTitle>
          <DialogDescription>تم إنشاء الطلب في {formatDate(order.createdAt)}</DialogDescription>
        </DialogHeader>

        <div className="grid gap-6 md:grid-cols-2">
          {/* Order Status */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">حالة الطلب</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span>الحالة الحالية:</span>
                {getStatusBadge(order.status)}
              </div>
              <div className="flex items-center justify-between">
                <span>حالة الدفع:</span>
                {getPaymentStatusBadge(order.paymentStatus)}
              </div>
              <Separator />
              <div className="space-y-2">
                <label className="text-sm font-medium">تحديث حالة الطلب:</label>
                <Select value={orderStatus} onValueChange={setOrderStatus}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pending">في الانتظار</SelectItem>
                    <SelectItem value="processing">قيد المعالجة</SelectItem>
                    <SelectItem value="shipped">تم الشحن</SelectItem>
                    <SelectItem value="delivered">تم التسليم</SelectItem>
                    <SelectItem value="cancelled">ملغي</SelectItem>
                  </SelectContent>
                </Select>
                <Button onClick={handleStatusUpdate} className="w-full">
                  تحديث الحالة
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Customer Information */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">معلومات العميل</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-2">
                <Package className="h-4 w-4 text-muted-foreground" />
                <span className="font-medium">{order.customerName}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <span className="ltr">{order.customerEmail}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <span className="ltr">{order.customerPhone}</span>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="h-4 w-4 text-muted-foreground mt-1" />
                <span className="text-sm">{order.shippingAddress}</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Order Items */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">عناصر الطلب</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {order.items.map((item) => (
                <div key={item.id} className="flex items-center gap-4 p-3 border rounded-lg">
                  <img
                    src={item.image || "/placeholder.svg"}
                    alt={item.name}
                    className="h-16 w-16 rounded-md object-cover"
                  />
                  <div className="flex-1">
                    <h4 className="font-medium">{item.name}</h4>
                    <p className="text-sm text-muted-foreground">الكمية: {item.quantity}</p>
                  </div>
                  <div className="text-left">
                    <p className="font-bold">{item.price * item.quantity} ر.س</p>
                    <p className="text-sm text-muted-foreground">
                      {item.price} ر.س × {item.quantity}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Order Summary */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <CreditCard className="h-5 w-5" />
              ملخص الطلب
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>المجموع الفرعي:</span>
                <span>{subtotal} ر.س</span>
              </div>
              <div className="flex justify-between">
                <span>الشحن:</span>
                <span>{shipping} ر.س</span>
              </div>
              <div className="flex justify-between">
                <span>ضريبة القيمة المضافة (15%):</span>
                <span>{tax.toFixed(2)} ر.س</span>
              </div>
              <Separator />
              <div className="flex justify-between font-bold text-lg">
                <span>المجموع الإجمالي:</span>
                <span>{order.total} ر.س</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </DialogContent>
    </Dialog>
  )
}
