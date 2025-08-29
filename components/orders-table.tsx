"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Eye } from "lucide-react"
import { OrderDetailsDialog } from "@/components/order-details-dialog"

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

const mockOrders: Order[] = [
  {
    id: "ORD-001",
    customerName: "أحمد محمد علي",
    customerEmail: "ahmed@example.com",
    customerPhone: "+966501234567",
    total: 1250,
    status: "pending",
    paymentStatus: "pending",
    createdAt: "2024-01-15T10:30:00Z",
    shippingAddress: "الرياض، حي النخيل، شارع الملك فهد، مبنى 123",
    items: [
      {
        id: "1",
        name: "هاتف ذكي سامسونج",
        quantity: 1,
        price: 1250,
        image: "/samsung-smartphone.png",
      },
    ],
  },
  {
    id: "ORD-002",
    customerName: "فاطمة علي حسن",
    customerEmail: "fatima@example.com",
    customerPhone: "+966507654321",
    total: 890,
    status: "delivered",
    paymentStatus: "paid",
    createdAt: "2024-01-14T14:20:00Z",
    shippingAddress: "جدة، حي الصفا، شارع التحلية، مبنى 456",
    items: [
      {
        id: "2",
        name: "حقيبة يد جلدية",
        quantity: 1,
        price: 450,
        image: "/leather-handbag.png",
      },
      {
        id: "3",
        name: "ساعة رياضية ذكية",
        quantity: 1,
        price: 440,
        image: "/smartwatch-lifestyle.png",
      },
    ],
  },
  {
    id: "ORD-003",
    customerName: "محمد سالم أحمد",
    customerEmail: "mohammed@example.com",
    customerPhone: "+966509876543",
    total: 2100,
    status: "processing",
    paymentStatus: "paid",
    createdAt: "2024-01-13T09:15:00Z",
    shippingAddress: "الدمام، حي الفيصلية، شارع الأمير محمد، مبنى 789",
    items: [
      {
        id: "1",
        name: "هاتف ذكي سامسونج",
        quantity: 1,
        price: 1250,
        image: "/samsung-smartphone.png",
      },
      {
        id: "3",
        name: "ساعة رياضية ذكية",
        quantity: 1,
        price: 800,
        image: "/smartwatch-lifestyle.png",
      },
      {
        id: "4",
        name: "كتاب تطوير الذات",
        quantity: 1,
        price: 50,
        image: "/open-book-library.png",
      },
    ],
  },
  {
    id: "ORD-004",
    customerName: "نورا خالد محمد",
    customerEmail: "nora@example.com",
    customerPhone: "+966502468135",
    total: 1600,
    status: "shipped",
    paymentStatus: "paid",
    createdAt: "2024-01-12T16:45:00Z",
    shippingAddress: "مكة المكرمة، حي العزيزية، شارع إبراهيم الخليل، مبنى 321",
    items: [
      {
        id: "1",
        name: "هاتف ذكي سامسونج",
        quantity: 1,
        price: 1250,
        image: "/samsung-smartphone.png",
      },
      {
        id: "2",
        name: "حقيبة يد جلدية",
        quantity: 1,
        price: 350,
        image: "/leather-handbag.png",
      },
    ],
  },
]

interface OrdersTableProps {
  searchQuery: string
  statusFilter: string
  dateFilter: string
}

export function OrdersTable({ searchQuery, statusFilter, dateFilter }: OrdersTableProps) {
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const filteredOrders = mockOrders.filter((order) => {
    const matchesSearch =
      order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customerEmail.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesStatus = statusFilter === "all" || order.status === statusFilter

    // Simple date filtering - in real app, you'd parse dates properly
    const matchesDate = dateFilter === "all" || true // Simplified for demo

    return matchesSearch && matchesStatus && matchesDate
  })

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

  const handleViewOrder = (order: Order) => {
    setSelectedOrder(order)
    setIsDialogOpen(true)
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

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>قائمة الطلبات ({filteredOrders.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>رقم الطلب</TableHead>
                <TableHead>العميل</TableHead>
                <TableHead>المبلغ الإجمالي</TableHead>
                <TableHead>حالة الطلب</TableHead>
                <TableHead>حالة الدفع</TableHead>
                <TableHead>التاريخ</TableHead>
                <TableHead>الإجراءات</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredOrders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell>
                    <div className="font-medium">{order.id}</div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <div className="font-medium">{order.customerName}</div>
                      <div className="text-sm text-muted-foreground ltr">{order.customerEmail}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="font-bold">{order.total} ر.س</div>
                  </TableCell>
                  <TableCell>{getStatusBadge(order.status)}</TableCell>
                  <TableCell>{getPaymentStatusBadge(order.paymentStatus)}</TableCell>
                  <TableCell>
                    <div className="text-sm">{formatDate(order.createdAt)}</div>
                  </TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm" onClick={() => handleViewOrder(order)}>
                      <Eye className="h-4 w-4 ml-1" />
                      عرض
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <OrderDetailsDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        order={selectedOrder}
        onClose={() => {
          setSelectedOrder(null)
          setIsDialogOpen(false)
        }}
      />
    </>
  )
}
