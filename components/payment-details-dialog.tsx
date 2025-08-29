"use client"

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { CreditCard, User, Receipt, RefreshCw } from "lucide-react"

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

interface PaymentDetailsDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  transaction?: PaymentTransaction | null
  onClose?: () => void
}

export function PaymentDetailsDialog({ open, onOpenChange, transaction, onClose }: PaymentDetailsDialogProps) {
  if (!transaction) return null

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

  const getMethodName = (method: PaymentTransaction["method"]) => {
    switch (method) {
      case "credit_card":
        return "بطاقة ائتمان"
      case "paypal":
        return "PayPal"
      case "bank_transfer":
        return "تحويل بنكي"
      case "mada":
        return "مدى"
      case "stc_pay":
        return "STC Pay"
      default:
        return "غير محدد"
    }
  }

  const getGatewayName = (gateway: PaymentTransaction["gateway"]) => {
    switch (gateway) {
      case "stripe":
        return "Stripe"
      case "paypal":
        return "PayPal"
      case "local":
        return "بوابة محلية"
      default:
        return "غير محدد"
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

  const handleRefund = () => {
    // Mock refund - replace with actual API call
    console.log("Processing refund for transaction:", transaction.id)
    onClose?.()
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <CreditCard className="h-5 w-5" />
            تفاصيل المعاملة {transaction.id}
          </DialogTitle>
          <DialogDescription>معلومات شاملة عن المعاملة المالية</DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Transaction Status */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">حالة المعاملة</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span>الحالة:</span>
                {getStatusBadge(transaction.status)}
              </div>
              <div className="flex items-center justify-between">
                <span>طريقة الدفع:</span>
                <span className="font-medium">{getMethodName(transaction.method)}</span>
              </div>
              <div className="flex items-center justify-between">
                <span>البوابة:</span>
                <span className="font-medium">{getGatewayName(transaction.gateway)}</span>
              </div>
              <div className="flex items-center justify-between">
                <span>رقم المعاملة:</span>
                <span className="font-mono text-sm ltr">{transaction.transactionId}</span>
              </div>
            </CardContent>
          </Card>

          {/* Transaction Details */}
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <User className="h-4 w-4" />
                  معلومات العميل
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span>اسم العميل:</span>
                  <span className="font-medium">{transaction.customerName}</span>
                </div>
                <div className="flex justify-between">
                  <span>رقم الطلب:</span>
                  <span className="font-medium">{transaction.orderId}</span>
                </div>
                <div className="flex justify-between">
                  <span>تاريخ المعاملة:</span>
                  <span className="font-medium">{formatDate(transaction.createdAt)}</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Receipt className="h-4 w-4" />
                  التفاصيل المالية
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span>المبلغ الإجمالي:</span>
                  <span className="font-bold">{transaction.amount} ر.س</span>
                </div>
                <div className="flex justify-between">
                  <span>رسوم المعاملة:</span>
                  <span className="text-red-600">-{transaction.fees} ر.س</span>
                </div>
                <Separator />
                <div className="flex justify-between text-lg">
                  <span className="font-bold">المبلغ الصافي:</span>
                  <span className="font-bold text-accent">{transaction.netAmount} ر.س</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Actions */}
          {transaction.status === "completed" && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">الإجراءات المتاحة</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex gap-2">
                  <Button onClick={handleRefund} variant="outline" className="flex items-center gap-2 bg-transparent">
                    <RefreshCw className="h-4 w-4" />
                    استرداد المبلغ
                  </Button>
                  <Button variant="outline">تحميل الإيصال</Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
