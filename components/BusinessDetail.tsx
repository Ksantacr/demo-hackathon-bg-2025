"use client"

import { useState } from "react"
import { Search, Star, Plus, Minus, ShoppingCart } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { businesses, CartItem, Product } from "@/app/data/businesses"
import Link from "next/link"

export default function BusinessDetail() {
  const business = businesses[0] // For demo purposes, using first business
  const [searchQuery, setSearchQuery] = useState("")
  const [quantities, setQuantities] = useState<Record<number, number>>({})
  const [cart, setCart] = useState<CartItem[]>([])

  const filteredProducts = business.products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const updateQuantity = (productId: number, delta: number) => {
    setQuantities((prev) => ({
      ...prev,
      [productId]: Math.max(0, (prev[productId] || 0) + delta),
    }))
  }

  const addToCart = (product: Product) => {
    const quantity = quantities[product.id] || 0
    if (quantity <= 0) return

    setCart((prev) => {
      const existingItem = prev.find((item) => item.productId === product.id)
      if (existingItem) {
        return prev.map((item) =>
          item.productId === product.id ? { ...item, quantity: item.quantity + quantity } : item,
        )
      }
      return [
        ...prev,
        {
          productId: product.id,
          name: product.name,
          quantity,
          price: product.price,
        },
      ]
    })
    setQuantities((prev) => ({ ...prev, [product.id]: 0 }))
  }

  const cartTotal = cart.reduce((sum, item) => sum + item.quantity * item.price, 0)

  return (
    <div className="flex h-full">
      <div className="flex-1 p-8 overflow-auto">
        {/* Business Header */}
        <div className="mb-8">
          <div className="flex items-start gap-6">
            <div className="w-32 h-32 rounded-lg overflow-hidden bg-gray-100">
              <img
                src={business.avatar || "/placeholder.svg"}
                alt={business.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h1 className="text-3xl font-bold mb-2">{business.name}</h1>
              <div className="flex items-center gap-2 mb-2">
                <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                <span className="text-lg">{business.rating}</span>
              </div>
              <p className="text-gray-600">{business.email}</p>
            </div>
          </div>
        </div>

        {/* Credit Banner */}
        <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 mb-8 text-center text-blue-700">
          Tienes un crédito aprobado por ${business.creditLimit.toLocaleString()}
        </div>

        {/* Search */}
        <div className="relative mb-6">
          <Input
            type="text"
            placeholder="Buscar productos..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
          <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
        </div>

        {/* Products List */}
        <div className="space-y-4">
          {filteredProducts.map((product) => (
            <div key={product.id} className="border rounded-lg p-4 flex items-center justify-between">
              <div>
                <h3 className="font-medium">{product.name}</h3>
                <p className="text-sm text-gray-600">{product.description}</p>
                <p className="text-sm font-medium mt-1">${product.price.toFixed(2)}</p>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="icon" onClick={() => updateQuantity(product.id, -1)}>
                    <Minus className="w-4 h-4" />
                  </Button>
                  <span className="w-12 text-center">{quantities[product.id] || 0}</span>
                  <Button variant="outline" size="icon" onClick={() => updateQuantity(product.id, 1)}>
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
                <Button onClick={() => addToCart(product)}>Agregar</Button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Cart Panel */}
      <div className="w-80 border-l bg-gray-50 p-6 flex flex-col">
        <div className="flex items-center gap-2 mb-6">
          <ShoppingCart className="w-5 h-5" />
          <h2 className="text-lg font-semibold">Carrito</h2>
        </div>

        <div className="flex-1 overflow-auto">
          {cart.map((item) => (
            <div key={item.productId} className="flex justify-between py-2 border-b">
              <div>
                <p className="font-medium">{item.name}</p>
                <p className="text-sm text-gray-600">
                  {item.quantity} x ${item.price.toFixed(2)}
                </p>
              </div>
              <p className="font-medium">${(item.quantity * item.price).toFixed(2)}</p>
            </div>
          ))}
        </div>

        <div className="mt-6 pt-4 border-t">
          <div className="flex justify-between mb-4">
            <span className="font-semibold">Total:</span>
            <span className="font-semibold">${cartTotal.toFixed(2)}</span>
          </div>
          <Link href="/checkout">
            <Button className="w-full" disabled={cart.length === 0}>
              Continuar
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}

