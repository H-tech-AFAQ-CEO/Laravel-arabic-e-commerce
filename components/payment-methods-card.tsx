"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { CreditCard, Smartphone, Building, Settings } from "lucide-react"

interface PaymentMethod {
  id: string
  name: string
  nameEn: string
  type: "international" | "local"
  enabled: boolean
  icon: React.ComponentType<any>
  description: string
  fees: string
}

const paymentMethods: PaymentMethod[] = [
  {
    id: "stripe",
    name: "بطاقات الائتمان",
    nameEn: "Credit Cards",
    type: "international",
    enabled: true,
    icon: CreditCard,
    description: "فيزا، ماستركارد، أمريكان إكسبريس",
    fees: "2.9% + 2 ر.س",
  },
  {
    id: "paypal",
    name: "PayPal",
    nameEn: "PayPal",
    type: "international",
    enabled: true,
    icon: CreditCard,
    description: "محفظة PayPal الرقمية",
    fees: "3.4% + 2.5 ر.س",
  },
  {
    id: "mada",
    name: "مدى",
    nameEn: "Mada",
    type: "local",
    enabled: true,
    icon: CreditCard,
    description: "بطاقات مدى السعودية",
    fees: "1% + 1 ر.س",
  },
  {
    id: "stc_pay",
    name: "STC Pay",
    nameEn: "STC Pay",
    type: "local",
    enabled: false,
    icon: Smartphone,
    description: "محفظة STC الرقمية",
    fees: "1.5% + 1 ر.س",
  },
  {
    id: "bank_transfer",
    name: "التحويل البنكي",
    nameEn: "Bank Transfer",
    type: "local",
    enabled: false,
    icon: Building,
    description: "تحويل مباشر من البنك",
    fees: "5 ر.س ثابت",
  },
]

export function PaymentMethodsCard() {
  const [methods, setMethods] = useState(paymentMethods)
  const [apiKeys, setApiKeys] = useState({
    stripe_public: "pk_test_...",
    stripe_secret: "sk_test_...",
    paypal_client: "AYSq3RDGsmBLJE...",
    paypal_secret: "EGnHDxD_qRPdaLdZz8iCr8N7_MzF-YHPTkjs6NKzbQoOiV...",
  })

  const handleToggleMethod = (methodId: string) => {
    setMethods(methods.map((method) => (method.id === methodId ? { ...method, enabled: !method.enabled } : method)))
  }

  return (
    <div className="space-y-6">
      {/* Payment Methods */}
      <Card>
        <CardHeader>
          <CardTitle>طرق الدفع المتاحة</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {methods.map((method) => {
              const Icon = method.icon
              return (
                <div key={method.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-4">
                    <Icon className="h-8 w-8 text-muted-foreground" />
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-medium">{method.name}</h3>
                        <Badge variant={method.type === "international" ? "default" : "secondary"}>
                          {method.type === "international" ? "دولي" : "محلي"}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{method.description}</p>
                      <p className="text-xs text-muted-foreground">الرسوم: {method.fees}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Switch checked={method.enabled} onCheckedChange={() => handleToggleMethod(method.id)} />
                    <Button variant="ghost" size="icon">
                      <Settings className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* API Configuration */}
      <Card>
        <CardHeader>
          <CardTitle>إعدادات البوابات</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="stripe_public">Stripe Public Key</Label>
              <Input
                id="stripe_public"
                value={apiKeys.stripe_public}
                onChange={(e) => setApiKeys({ ...apiKeys, stripe_public: e.target.value })}
                className="ltr font-mono text-sm"
                placeholder="pk_test_..."
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="stripe_secret">Stripe Secret Key</Label>
              <Input
                id="stripe_secret"
                type="password"
                value={apiKeys.stripe_secret}
                onChange={(e) => setApiKeys({ ...apiKeys, stripe_secret: e.target.value })}
                className="ltr font-mono text-sm"
                placeholder="sk_test_..."
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="paypal_client">PayPal Client ID</Label>
              <Input
                id="paypal_client"
                value={apiKeys.paypal_client}
                onChange={(e) => setApiKeys({ ...apiKeys, paypal_client: e.target.value })}
                className="ltr font-mono text-sm"
                placeholder="AYSq3RDGsmBLJE..."
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="paypal_secret">PayPal Client Secret</Label>
              <Input
                id="paypal_secret"
                type="password"
                value={apiKeys.paypal_secret}
                onChange={(e) => setApiKeys({ ...apiKeys, paypal_secret: e.target.value })}
                className="ltr font-mono text-sm"
                placeholder="EGnHDxD_qRPdaLdZz8iCr8N7..."
              />
            </div>
          </div>
          <Button className="w-full">حفظ الإعدادات</Button>
        </CardContent>
      </Card>
    </div>
  )
}
