"use client"

import type React from "react"

import { useState, useEffect } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Upload } from "lucide-react"

interface Product {
  id: string
  name: string
  nameEn: string
  category: string
  price: number
  stock: number
  status: "active" | "inactive" | "out-of-stock"
  image: string
  createdAt: string
  description?: string
  descriptionEn?: string
}

interface ProductDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  product?: Product | null
  onClose?: () => void
}

const categories = ["إلكترونيات", "أزياء", "كتب", "رياضة", "منزل وحديقة", "جمال وعناية", "ألعاب", "طعام ومشروبات"]

export function ProductDialog({ open, onOpenChange, product, onClose }: ProductDialogProps) {
  const [formData, setFormData] = useState({
    name: "",
    nameEn: "",
    description: "",
    descriptionEn: "",
    category: "",
    price: "",
    stock: "",
    status: "active" as const,
  })

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name,
        nameEn: product.nameEn,
        description: product.description || "",
        descriptionEn: product.descriptionEn || "",
        category: product.category,
        price: product.price.toString(),
        stock: product.stock.toString(),
        status: product.status,
      })
    } else {
      setFormData({
        name: "",
        nameEn: "",
        description: "",
        descriptionEn: "",
        category: "",
        price: "",
        stock: "",
        status: "active",
      })
    }
  }, [product])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Mock save - replace with actual API call
    console.log("Saving product:", formData)
    onOpenChange(false)
    onClose?.()
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{product ? "تعديل المنتج" : "إضافة منتج جديد"}</DialogTitle>
          <DialogDescription>{product ? "قم بتعديل بيانات المنتج" : "أدخل بيانات المنتج الجديد"}</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="name">اسم المنتج (عربي)</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="أدخل اسم المنتج بالعربية"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="nameEn">اسم المنتج (إنجليزي)</Label>
              <Input
                id="nameEn"
                value={formData.nameEn}
                onChange={(e) => setFormData({ ...formData, nameEn: e.target.value })}
                placeholder="Enter product name in English"
                className="ltr"
                required
              />
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="category">الفئة</Label>
              <Select
                value={formData.category}
                onValueChange={(value) => setFormData({ ...formData, category: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="اختر الفئة" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="status">الحالة</Label>
              <Select
                value={formData.status}
                onValueChange={(value: "active" | "inactive") => setFormData({ ...formData, status: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">نشط</SelectItem>
                  <SelectItem value="inactive">غير نشط</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="price">السعر (ر.س)</Label>
              <Input
                id="price"
                type="number"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                placeholder="0.00"
                min="0"
                step="0.01"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="stock">الكمية في المخزون</Label>
              <Input
                id="stock"
                type="number"
                value={formData.stock}
                onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                placeholder="0"
                min="0"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">الوصف (عربي)</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="أدخل وصف المنتج بالعربية"
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="descriptionEn">الوصف (إنجليزي)</Label>
            <Textarea
              id="descriptionEn"
              value={formData.descriptionEn}
              onChange={(e) => setFormData({ ...formData, descriptionEn: e.target.value })}
              placeholder="Enter product description in English"
              className="ltr"
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label>صورة المنتج</Label>
            <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center">
              <Upload className="mx-auto h-12 w-12 text-muted-foreground" />
              <div className="mt-4">
                <Button type="button" variant="secondary">
                  اختر صورة
                </Button>
                <p className="mt-2 text-sm text-muted-foreground">PNG, JPG, GIF حتى 10MB</p>
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              إلغاء
            </Button>
            <Button type="submit">{product ? "حفظ التغييرات" : "إضافة المنتج"}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
