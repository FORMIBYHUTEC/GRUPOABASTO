"use client"

import { useEffect, useState, useCallback, useMemo } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Plus, Pencil, Trash2, LogOut, Upload, X, Loader2, Search } from "lucide-react"
import { toast } from "sonner"

type Product = {
  id: string
  name: string
  description: string
  category: string
  image_url: string | null
  price: number | null
  is_active: boolean
  created_at: string
}

const categories = [
  { id: "limpieza-general", name: "Limpieza General" },
  { id: "utensilios", name: "Utensilios" },
  { id: "bolsas", name: "Bolsas" },
  { id: "papel", name: "Papel" },
  { id: "desechables", name: "Desechables" },
  { id: "vasos", name: "Vasos" },
  { id: "industrial", name: "Industrial" },
  { id: "papeleria", name: "Papelería" },
]

export default function AdminProductosPage() {
  const router = useRouter()
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [password, setPassword] = useState("")
  const [products, setProducts] = useState<Product[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [loading, setLoading] = useState(false)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)
  const [uploadingImage, setUploadingImage] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "",
    price: "",
    image_url: "",
    is_active: true,
  })

  const checkSession = useCallback(async () => {
    const res = await fetch("/api/admin/products", { method: "GET" })
    if (res.ok) {
      setIsLoggedIn(true)
      const data = await res.json()
      setProducts(data.products || [])
    } else {
      setIsLoggedIn(false)
    }
  }, [])

  useEffect(() => {
    checkSession()
  }, [checkSession])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    })

    if (res.ok) {
      setIsLoggedIn(true)
      setPassword("")
      checkSession()
      toast.success("Sesión iniciada")
    } else {
      toast.error("Contraseña incorrecta")
    }
  }

  const handleLogout = async () => {
    await fetch("/api/admin/logout", { method: "POST" })
    setIsLoggedIn(false)
    setProducts([])
    toast.success("Sesión cerrada")
  }

  const openCreateDialog = () => {
    setEditingProduct(null)
    setFormData({
      name: "",
      description: "",
      category: "",
      price: "",
      image_url: "",
      is_active: true,
    })
    setIsDialogOpen(true)
  }

  const openEditDialog = (product: Product) => {
    setEditingProduct(product)
    setFormData({
      name: product.name,
      description: product.description,
      category: product.category,
      price: product.price?.toString() || "",
      image_url: product.image_url || "",
      is_active: product.is_active,
    })
    setIsDialogOpen(true)
  }

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setUploadingImage(true)
    const uploadFormData = new FormData()
    uploadFormData.append("file", file)

    try {
      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: uploadFormData,
      })
      const data = await res.json()
      if (res.ok) {
        setFormData((prev) => ({ ...prev, image_url: data.url }))
        toast.success("Imagen subida")
      } else {
        toast.error(data.error || "Error al subir imagen")
      }
    } catch (error) {
      toast.error("Error al subir imagen")
    } finally {
      setUploadingImage(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const payload = {
        ...formData,
        price: formData.price ? parseFloat(formData.price) : null,
      }

      const url = "/api/admin/products"
      const method = editingProduct ? "PUT" : "POST"
      const body = editingProduct
        ? { id: editingProduct.id, ...payload }
        : payload

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      })

      if (res.ok) {
        toast.success(editingProduct ? "Producto actualizado" : "Producto creado")
        setIsDialogOpen(false)
        checkSession()
      } else {
        const data = await res.json()
        toast.error(data.error || "Error al guardar")
      }
    } catch (error) {
      toast.error("Error al guardar producto")
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm("¿Estás seguro de eliminar este producto?")) return

    try {
      const res = await fetch(`/api/admin/products?id=${id}`, { method: "DELETE" })
      if (res.ok) {
        toast.success("Producto eliminado")
        checkSession()
      } else {
        const data = await res.json()
        toast.error(data.error || "Error al eliminar")
      }
    } catch (error) {
      toast.error("Error al eliminar producto")
    }
  }

  const filteredProducts = useMemo(() => {
    if (!searchQuery.trim()) return products
    const query = searchQuery.toLowerCase()
    return products.filter(
      (p) =>
        p.name.toLowerCase().includes(query) ||
        p.description.toLowerCase().includes(query) ||
        categories.find((c) => c.id === p.category)?.name.toLowerCase().includes(query)
    )
  }, [products, searchQuery])

  const toggleActive = async (product: Product) => {
    try {
      const res = await fetch("/api/admin/products", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: product.id,
          is_active: !product.is_active,
        }),
      })

      if (res.ok) {
        toast.success("Estado actualizado")
        checkSession()
      } else {
        toast.error("Error al actualizar estado")
      }
    } catch (error) {
      toast.error("Error al actualizar estado")
    }
  }

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4" style={{ background: "#163347" }}>
        <div className="w-full max-w-md p-8 rounded-3xl shadow-2xl" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(58,158,69,0.2)" }}>
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">CMS Grupo Abasto</h1>
            <p className="text-white/60">Administra tu catálogo de productos</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <Label className="text-white/80">Contraseña</Label>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 bg-white/10 border-white/20 text-white placeholder:text-white/40"
                placeholder="Ingresa la contraseña de admin"
              />
            </div>
            <Button
              type="submit"
              className="w-full py-6 text-lg font-semibold rounded-xl"
              style={{ background: "#3a9e45" }}
            >
              Entrar al panel
            </Button>
          </form>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen p-4 md:p-8" style={{ background: "#f8fafc" }}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold" style={{ color: "#163347" }}>CMS de Productos</h1>
            <p className="text-gray-500">Administra el catálogo de Grupo Abasto</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                placeholder="Buscar productos..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 rounded-xl border-gray-300 min-w-[280px]"
              />
            </div>
            <Button
              onClick={openCreateDialog}
              className="rounded-xl px-6 py-5 font-semibold"
              style={{ background: "#3a9e45" }}
            >
              <Plus className="w-5 h-5 mr-2" />
              Nuevo producto
            </Button>
            <Button
              variant="outline"
              onClick={handleLogout}
              className="rounded-xl px-6 py-5 border-gray-300"
            >
              <LogOut className="w-5 h-5 mr-2" />
              Salir
            </Button>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 flex flex-col"
            >
              <div className="relative aspect-square bg-gray-50">
                {product.image_url ? (
                  <Image
                    src={product.image_url}
                    alt={product.name}
                    fill
                    className="object-contain p-4"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center text-gray-300">
                    Sin imagen
                  </div>
                )}
              </div>
              <div className="p-4 flex flex-col flex-grow">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <h3 className="font-bold text-gray-800 line-clamp-2">{product.name}</h3>
                  <span
                    className="px-2 py-1 rounded-full text-xs font-medium whitespace-nowrap"
                    style={{
                      background: categories.find(c => c.id === product.category)?.id
                        ? "#3a9e4515"
                        : "#f1f5f9",
                      color: "#3a9e45",
                    }}
                  >
                    {categories.find(c => c.id === product.category)?.name || product.category}
                  </span>
                </div>
                <p className="text-sm text-gray-500 line-clamp-2 mb-4 flex-grow">{product.description}</p>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-lg font-bold" style={{ color: "#163347" }}>
                    {product.price ? `$${product.price.toFixed(2)}` : "—"}
                  </span>
                  <div className="flex items-center gap-2">
                    <Switch
                      checked={product.is_active}
                      onCheckedChange={() => toggleActive(product)}
                    />
                    <span className="text-xs text-gray-500">{product.is_active ? "Activo" : "Inactivo"}</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => openEditDialog(product)}
                    className="flex-1 rounded-lg border-gray-300"
                  >
                    <Pencil className="w-4 h-4 mr-1" />
                    Editar
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDelete(product.id)}
                    className="rounded-lg border-red-300 text-red-600 hover:bg-red-50"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {products.length === 0 && (
          <div className="text-center py-20">
            <p className="text-gray-500 text-lg">No hay productos aún. Crea el primero.</p>
          </div>
        )}

        {products.length > 0 && filteredProducts.length === 0 && (
          <div className="text-center py-20">
            <p className="text-gray-500 text-lg">No se encontraron productos con "{searchQuery}"</p>
          </div>
        )}
      </div>

      {/* Product Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold" style={{ color: "#163347" }}>
              {editingProduct ? "Editar producto" : "Nuevo producto"}
            </DialogTitle>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-5 mt-4">
            <div>
              <Label>Nombre del producto</Label>
              <Input
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Ej: Limpiador Multiusos"
                required
              />
            </div>

            <div>
              <Label>Categoría</Label>
              <Select
                value={formData.category}
                onValueChange={(value) => setFormData({ ...formData, category: value })}
                required
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecciona una categoría" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((cat) => (
                    <SelectItem key={cat.id} value={cat.id}>
                      {cat.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Descripción</Label>
              <Textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Describe el producto..."
                rows={3}
                required
              />
            </div>

            <div className="p-4 rounded-xl border-2 border-[#3a9e45]/20 bg-[#3a9e45]/5">
              <Label className="font-semibold text-[#163347]">Precio final</Label>
              <div className="relative mt-1">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 font-semibold">$</span>
                <Input
                  type="number"
                  step="0.01"
                  min="0"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  placeholder="0.00"
                  className="pl-8 font-semibold text-[#163347]"
                />
              </div>
              <p className="text-xs text-gray-500 mt-1">Precio que verán los clientes (opcional)</p>
            </div>

            <div>
              <Label>Imagen del producto</Label>
              <div className="mt-2">
                {formData.image_url ? (
                  <div className="relative w-32 h-32 rounded-xl overflow-hidden border border-gray-200 mb-3">
                    <Image
                      src={formData.image_url}
                      alt="Preview"
                      fill
                      className="object-contain p-2"
                    />
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, image_url: "" })}
                      className="absolute top-1 right-1 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ) : null}
                <div className="flex items-center gap-3">
                  <Label
                    htmlFor="image-upload"
                    className="cursor-pointer inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors"
                  >
                    {uploadingImage ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <Upload className="w-4 h-4" />
                    )}
                    {uploadingImage ? "Subiendo..." : "Subir imagen"}
                  </Label>
                  <Input
                    id="image-upload"
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                    disabled={uploadingImage}
                  />
                  <Input
                    value={formData.image_url}
                    onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                    placeholder="O pega URL de imagen"
                    className="flex-1"
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Switch
                checked={formData.is_active}
                onCheckedChange={(checked) => setFormData({ ...formData, is_active: checked })}
              />
              <Label>Producto activo</Label>
            </div>

            <div className="flex gap-3 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsDialogOpen(false)}
                className="flex-1 rounded-xl py-5 border-gray-300"
              >
                Cancelar
              </Button>
              <Button
                type="submit"
                disabled={loading}
                className="flex-1 rounded-xl py-5 font-semibold"
                style={{ background: "#3a9e45" }}
              >
                {loading ? (
                  <Loader2 className="w-5 h-5 animate-spin mr-2" />
                ) : (
                  <Plus className="w-5 h-5 mr-2" />
                )}
                {editingProduct ? "Guardar cambios" : "Crear producto"}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}
