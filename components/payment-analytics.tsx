"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, CreditCard, RefreshCw } from "lucide-react"

const analyticsData = {
  totalRevenue: 125600,
  totalTransactions: 1247,
  successRate: 94.2,
  averageTransaction: 100.7,
  monthlyGrowth: 12.5,
  topMethods: [
    { name: "بطاقات الائتمان", percentage: 45, amount: 56520 },
    { name: "مدى", percentage: 30, amount: 37680 },
    { name: "PayPal", percentage: 15, amount: 18840 },
    { name: "STC Pay", percentage: 10, amount: 12560 },
  ],
  recentStats: [
    { period: "اليوم", revenue: 4200, transactions: 28, growth: 8.5 },
    { period: "هذا الأسبوع", revenue: 28400, transactions: 189, growth: 15.2 },
    { period: "هذا الشهر", revenue: 125600, transactions: 1247, growth: 12.5 },
  ],
}

export function PaymentAnalytics() {
  return (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">إجمالي الإيرادات</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analyticsData.totalRevenue.toLocaleString()} ر.س</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-accent">+{analyticsData.monthlyGrowth}%</span> من الشهر الماضي
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">عدد المعاملات</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analyticsData.totalTransactions.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-accent">+18%</span> من الشهر الماضي
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">معدل النجاح</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analyticsData.successRate}%</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-accent">+2.1%</span> من الشهر الماضي
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">متوسط المعاملة</CardTitle>
            <RefreshCw className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analyticsData.averageTransaction} ر.س</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-red-500">-3.2%</span> من الشهر الماضي
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Payment Methods Performance */}
      <Card>
        <CardHeader>
          <CardTitle>أداء طرق الدفع</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {analyticsData.topMethods.map((method, index) => (
              <div key={method.name} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-sm font-bold">
                    {index + 1}
                  </div>
                  <div>
                    <div className="font-medium">{method.name}</div>
                    <div className="text-sm text-muted-foreground">{method.amount.toLocaleString()} ر.س</div>
                  </div>
                </div>
                <Badge variant="secondary">{method.percentage}%</Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Period Statistics */}
      <Card>
        <CardHeader>
          <CardTitle>إحصائيات الفترات</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {analyticsData.recentStats.map((stat) => (
              <div key={stat.period} className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <div className="font-medium">{stat.period}</div>
                  <div className="text-sm text-muted-foreground">{stat.transactions} معاملة</div>
                </div>
                <div className="text-left">
                  <div className="font-bold">{stat.revenue.toLocaleString()} ر.س</div>
                  <div className="text-sm text-accent">+{stat.growth}%</div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
