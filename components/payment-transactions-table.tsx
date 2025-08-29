"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Eye, RefreshCw, Download } from "lucide-react"
import { PaymentDetailsDialog } from "@/components/payment-details-dialog"

interface PaymentTransaction {
  id: string
  orderId: string
  customerName: string
  amount: number
  method: "credit_card" | "paypal" | "bank_transfer" | "mada" | "stc_pay"
  status: "completed" | "pending" | "failed" | "refunded"
  gateway: "stripe" | "paypal" | "local"
  transactionId: string
  createdAt: string
  fees: number
  netAmount: number
}

const mockTransactions: PaymentTransaction[] = [
  {
    id: "PAY-001",
    orderId: "ORD-001",
    customerName: "أحمد محمد علي",
    amount: 1250,
    method: "credit_card",
    status: "completed",
    gateway: "stripe",
    transactionId: "txn_1234567890",
    createdAt: "2024-01-15T10:30:00Z",
    fees: 37.5,
    netAmount: 1212.5,
  },
  {
    id: "PAY-002",
    orderId: "ORD-002",
    customerName: "فاطمة علي حسن",
    amount: 890,
    method: "paypal",
    status: "completed",
    gateway: "paypal",
    transactionId: "PAYID-ABCDEFG",
    createdAt: "2024-01-14T14:20:00Z",
    fees: 26.7,
    netAmount: 863.3,
  },
  {
    id: "PAY-003",
    orderId: "ORD-003",
    customerName: "محمد سالم أحمد",
    amount: 2100,
    method: "mada",
    status: "pending",
    gateway: "local",
    transactionId: "MADA-789123",
    createdAt: "2024-01-13T09:15:00Z",
    fees: 21,
    netAmount: 2079,
  },
  {
    id: "PAY-004",
    orderId: "ORD-004",
    customerName: "نورا خالد محمد",
    amount: 1600,
    method: "stc_pay",
    status: "completed",
    gateway: "local",
    transactionId: "STC-456789",
    createdAt: "2024-01-12T16:45:00Z",
    fees: 16,
    netAmount: 1584,
  },
  {
    id: "PAY-005",
    orderId: "ORD-005",
    customerName: "عبدالله يوسف",
    amount: 450,
    method: "credit_card",
    status: "failed",
    gateway: "stripe",
    transactionId: "txn_failed_123",
    createdAt: "2024-01-11T11:30:00Z",
    fees: 0,
    netAmount: 0,
  },
]

interface PaymentTransactionsTableProps {
  searchQuery: string
  statusFilter: string
  dateFilter: string
}

export function PaymentTransactionsTable({ searchQuery, statusFilter, dateFilter }: PaymentTransactionsTableProps) {
  const [selectedTransaction, setSelectedTransaction] = useState<PaymentTransaction | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const filteredTransactions = mockTransactions.filter((transaction) => {
    const matchesSearch =
      transaction.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      transaction.orderId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      transaction.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      transaction.transactionId.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesStatus = statusFilter === "all" || transaction.status === statusFilter

    // Simple date filtering - in real app, you'd parse dates properly
    const matchesDate = dateFilter === "all" || true // Simplified for demo

    return matchesSearch && matchesStatus && matchesDate
  })

  const getStatusBadge = (status: PaymentTransaction["status"]) => {
    switch (status) {
      case "completed":
        return <Badge className="bg-accent text-accent-foreground">مكتملة</Badge>
      case "pending":
        return <Badge variant="secondary">في الانتظار</Badge>
      case "failed":
        return <Badge variant="destructive">فاشلة</Badge>
      case "refunded":
        return <Badge className="bg-orange-500 text-white">مستردة</Badge>
      default:
        return <Badge variant="secondary">غير محدد</Badge>
    }
  }

  const getMethodBadge = (method: PaymentTransaction["method"]) => {
    switch (method) {
      case "credit_card":
        return <Badge variant="outline">بطاقة ائتمان</Badge>
      case "paypal":
        return <Badge variant="outline">PayPal</Badge>
      case "bank_transfer":
        return <Badge variant="outline">تحويل بنكي</Badge>
      case "mada":
        return <Badge variant="outline">مدى</Badge>
      case "stc_pay":
        return <Badge variant="outline">STC Pay</Badge>
      default:
        return <Badge variant="outline">غير محدد</Badge>
    }
  }

  const handleViewTransaction = (transaction: PaymentTransaction) => {
    setSelectedTransaction(transaction)
    setIsDialogOpen(true)
  }

  const handleRefund = (transactionId: string) => {
    // Mock refund - replace with actual API call
    console.log("Processing refund for transaction:", transactionId)
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("ar-SA", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>المعاملات المالية ({filteredTransactions.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>رقم المعاملة</TableHead>
                <TableHead>رقم الطلب</TableHead>
                <TableHead>العميل</TableHead>
                <TableHead>المبلغ</TableHead>
                <TableHead>طريقة الدفع</TableHead>
                <TableHead>الحالة</TableHead>
                <TableHead>التاريخ</TableHead>
                <TableHead>الإجراءات</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTransactions.map((transaction) => (
                <TableRow key={transaction.id}>
                  <TableCell>
                    <div className="font-medium">{transaction.id}</div>
                    <div className="text-xs text-muted-foreground ltr">{transaction.transactionId}</div>
                  </TableCell>
                  <TableCell>
                    <div className="font-medium">{transaction.orderId}</div>
                  </TableCell>
                  <TableCell>
                    <div className="font-medium">{transaction.customerName}</div>
                  </TableCell>
                  <TableCell>
                    <div className="font-bold">{transaction.amount} ر.س</div>
                    {transaction.status === "completed" && (
                      <div className="text-xs text-muted-foreground">صافي: {transaction.netAmount} ر.س</div>
                    )}
                  </TableCell>
                  <TableCell>{getMethodBadge(transaction.method)}</TableCell>
                  <TableCell>{getStatusBadge(transaction.status)}</TableCell>
                  <TableCell>
                    <div className="text-sm">{formatDate(transaction.createdAt)}</div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="icon" onClick={() => handleViewTransaction(transaction)}>
                        <Eye className="h-4 w-4" />
                      </Button>
                      {transaction.status === "completed" && (
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleRefund(transaction.id)}
                          className="text-orange-600 hover:text-orange-600"
                        >
                          <RefreshCw className="h-4 w-4" />
                        </Button>
                      )}
                      <Button variant="ghost" size="icon">
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <PaymentDetailsDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        transaction={selectedTransaction}
        onClose={() => {
          setSelectedTransaction(null)
          setIsDialogOpen(false)
        }}
      />
    </>
  )
}
