"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Eye, Edit, Ban } from "lucide-react"
import { CustomerDetailsDialog } from "@/components/customer-details-dialog"

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

const mockCustomers: Customer[] = [
  {
    id: "CUST-001",
    name: "أحمد محمد علي",
    email: "ahmed@example.com",
    phone: "+966501234567",
    status: "active",
    totalOrders: 12,
    totalSpent: 15600,
    lastOrderDate: "2024-01-15T10:30:00Z",
    joinDate: "2023-06-15T08:00:00Z",
    address: "حي النخيل، شارع الملك فهد، مبنى 123",
    city: "الرياض",
  },
  {
    id: "CUST-002",
    name: "فاطمة علي حسن",
    email: "fatima@example.com",
    phone: "+966507654321",
    status: "active",
    totalOrders: 8,
    totalSpent: 7200,
    lastOrderDate: "2024-01-14T14:20:00Z",
    joinDate: "2023-08-20T10:15:00Z",
    address: "حي الصفا، شارع التحلية، مبنى 456",
    city: "جدة",
  },
  {
    id: "CUST-003",
    name: "محمد سالم أحمد",
    email: "mohammed@example.com",
    phone: "+966509876543",
    status: "inactive",
    totalOrders: 3,
    totalSpent: 2800,
    lastOrderDate: "2023-12-10T09:15:00Z",
    joinDate: "2023-09-05T14:30:00Z",
    address: "حي الفيصلية، شارع الأمير محمد، مبنى 789",
    city: "الدمام",
  },
  {
    id: "CUST-004",
    name: "نورا خالد محمد",
    email: "nora@example.com",
    phone: "+966502468135",
    status: "active",
    totalOrders: 15,
    totalSpent: 22400,
    lastOrderDate: "2024-01-12T16:45:00Z",
    joinDate: "2023-04-10T12:00:00Z",
    address: "حي العزيزية، شارع إبراهيم الخليل، مبنى 321",
    city: "مكة المكرمة",
  },
  {
    id: "CUST-005",
    name: "عبدالله يوسف",
    email: "abdullah@example.com",
    phone: "+966505555555",
    status: "blocked",
    totalOrders: 2,
    totalSpent: 450,
    lastOrderDate: "2023-11-20T11:30:00Z",
    joinDate: "2023-10-15T09:45:00Z",
    address: "حي الملز، شارع العليا، مبنى 654",
    city: "الرياض",
  },
]

interface CustomersTableProps {
  searchQuery: string
  statusFilter: string
}

export function CustomersTable({ searchQuery, statusFilter }: CustomersTableProps) {
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const filteredCustomers = mockCustomers.filter((customer) => {
    const matchesSearch =
      customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.phone.includes(searchQuery)

    const matchesStatus = statusFilter === "all" || customer.status === statusFilter

    return matchesSearch && matchesStatus
  })

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

  const handleViewCustomer = (customer: Customer) => {
    setSelectedCustomer(customer)
    setIsDialogOpen(true)
  }

  const handleBlockCustomer = (customerId: string) => {
    // Mock block customer - replace with actual API call
    console.log("Blocking customer:", customerId)
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("ar-SA", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>قائمة العملاء ({filteredCustomers.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>العميل</TableHead>
                <TableHead>معلومات الاتصال</TableHead>
                <TableHead>عدد الطلبات</TableHead>
                <TableHead>إجمالي المشتريات</TableHead>
                <TableHead>آخر طلب</TableHead>
                <TableHead>الحالة</TableHead>
                <TableHead>الإجراءات</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCustomers.map((customer) => (
                <TableRow key={customer.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={customer.avatar || "/placeholder.svg"} alt={customer.name} />
                        <AvatarFallback>{customer.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{customer.name}</div>
                        <div className="text-sm text-muted-foreground">{customer.id}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <div className="text-sm ltr">{customer.email}</div>
                      <div className="text-sm text-muted-foreground ltr">{customer.phone}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="font-medium">{customer.totalOrders}</div>
                  </TableCell>
                  <TableCell>
                    <div className="font-bold">{customer.totalSpent.toLocaleString()} ر.س</div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">{formatDate(customer.lastOrderDate)}</div>
                  </TableCell>
                  <TableCell>{getStatusBadge(customer.status)}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="icon" onClick={() => handleViewCustomer(customer)}>
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <Edit className="h-4 w-4" />
                      </Button>
                      {customer.status !== "blocked" && (
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleBlockCustomer(customer.id)}
                          className="text-destructive hover:text-destructive"
                        >
                          <Ban className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <CustomerDetailsDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        customer={selectedCustomer}
        onClose={() => {
          setSelectedCustomer(null)
          setIsDialogOpen(false)
        }}
      />
    </>
  )
}
