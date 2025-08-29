"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Edit, Trash2 } from "lucide-react"
import { ProductDialog } from "@/components/product-dialog"

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
}

const mockProducts: Product[] = [
  {
    id: "1",
    name: "هاتف ذكي سامسونج",
    nameEn: "Samsung Smartphone",
    category: "إلكترونيات",
    price: 2500,
    stock: 45,
    status: "active",
    image: "/samsung-smartphone.png",
    createdAt: "2024-01-15",
  },
  {
    id: "2",
    name: "حقيبة يد جلدية",
    nameEn: "Leather Handbag",
    category: "أزياء",
    price: 450,
    stock: 0,
    status: "out-of-stock",
    image: "/leather-handbag.png",
    createdAt: "2024-01-14",
  },
  {
    id: "3",
    name: "ساعة رياضية ذكية",
    nameEn: "Smart Sports Watch",
    category: "إلكترونيات",
    price: 800,
    stock: 23,
    status: "active",
    image: "/smartwatch-lifestyle.png",
    createdAt: "2024-01-13",
  },
  {
    id: "4",
    name: "كتاب تطوير الذات",
    nameEn: "Self Development Book",
    category: "كتب",
    price: 75,
    stock: 100,
    status: "active",
    image: "/open-book-library.png",
    createdAt: "2024-01-12",
  },
]

interface ProductsTableProps {
  searchQuery: string
}

export function ProductsTable({ searchQuery }: ProductsTableProps) {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const filteredProducts = mockProducts.filter(
    (product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.nameEn.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.category.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const getStatusBadge = (status: Product["status"]) => {
    switch (status) {
      case "active":
        return <Badge className="bg-accent text-accent-foreground">نشط</Badge>
      case "inactive":
        return <Badge variant="secondary">غير نشط</Badge>
      case "out-of-stock":
        return <Badge variant="destructive">نفد المخزون</Badge>
      default:
        return <Badge variant="secondary">غير محدد</Badge>
    }
  }

  const handleEdit = (product: Product) => {
    setSelectedProduct(product)
    setIsDialogOpen(true)
  }

  const handleDelete = (productId: string) => {
    // Mock delete - replace with actual API call
    console.log("Deleting product:", productId)
  }

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>قائمة المنتجات ({filteredProducts.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>المنتج</TableHead>
                <TableHead>الفئة</TableHead>
                <TableHead>السعر</TableHead>
                <TableHead>المخزون</TableHead>
                <TableHead>الحالة</TableHead>
                <TableHead>الإجراءات</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredProducts.map((product) => (
                <TableRow key={product.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <img
                        src={product.image || "/placeholder.svg"}
                        alt={product.name}
                        className="h-10 w-10 rounded-md object-cover"
                      />
                      <div>
                        <div className="font-medium">{product.name}</div>
                        <div className="text-sm text-muted-foreground ltr">{product.nameEn}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{product.category}</TableCell>
                  <TableCell>{product.price} ر.س</TableCell>
                  <TableCell>{product.stock}</TableCell>
                  <TableCell>{getStatusBadge(product.status)}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="icon" onClick={() => handleEdit(product)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => handleDelete(product.id)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <ProductDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        product={selectedProduct}
        onClose={() => {
          setSelectedProduct(null)
          setIsDialogOpen(false)
        }}
      />
    </>
  )
}
