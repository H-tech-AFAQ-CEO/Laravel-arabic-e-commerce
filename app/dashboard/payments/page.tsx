"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PaymentTransactionsTable } from "@/components/payment-transactions-table"
import { PaymentMethodsCard } from "@/components/payment-methods-card"
import { PaymentAnalytics } from "@/components/payment-analytics"
import { Search, Download, Settings } from "lucide-react"

export default function PaymentsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [dateFilter, setDateFilter] = useState("all")

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-balance">إدارة المدفوعات</h1>
            <p className="text-muted-foreground">متابعة وإدارة جميع المعاملات المالية</p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline">
              <Download className="ml-2 h-4 w-4" />
              تصدير التقرير
            </Button>
            <Button variant="outline">
              <Settings className="ml-2 h-4 w-4" />
              إعدادات الدفع
            </Button>
          </div>
        </div>

        <Tabs defaultValue="transactions" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="transactions">المعاملات</TabsTrigger>
            <TabsTrigger value="methods">طرق الدفع</TabsTrigger>
            <TabsTrigger value="analytics">التحليلات</TabsTrigger>
          </TabsList>

          <TabsContent value="transactions" className="space-y-4">
            <div className="flex items-center gap-4 flex-wrap">
              <div className="relative flex-1 max-w-sm">
                <Search className="absolute right-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="البحث في المعاملات..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pr-8"
                />
              </div>

              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="حالة المعاملة" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">جميع الحالات</SelectItem>
                  <SelectItem value="completed">مكتملة</SelectItem>
                  <SelectItem value="pending">في الانتظار</SelectItem>
                  <SelectItem value="failed">فاشلة</SelectItem>
                  <SelectItem value="refunded">مستردة</SelectItem>
                </SelectContent>
              </Select>

              <Select value={dateFilter} onValueChange={setDateFilter}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="الفترة الزمنية" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">جميع الفترات</SelectItem>
                  <SelectItem value="today">اليوم</SelectItem>
                  <SelectItem value="week">هذا الأسبوع</SelectItem>
                  <SelectItem value="month">هذا الشهر</SelectItem>
                  <SelectItem value="quarter">هذا الربع</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <PaymentTransactionsTable searchQuery={searchQuery} statusFilter={statusFilter} dateFilter={dateFilter} />
          </TabsContent>

          <TabsContent value="methods" className="space-y-4">
            <PaymentMethodsCard />
          </TabsContent>

          <TabsContent value="analytics" className="space-y-4">
            <PaymentAnalytics />
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}
