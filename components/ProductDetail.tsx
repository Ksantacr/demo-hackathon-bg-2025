"use client"

import { useState, useEffect } from "react"
import { Star, Minus, Plus, ShoppingBag, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import ProgressBar from "@/components/ProgressBar"
import Link from "next/link"
import { Business, Product } from "@/app/data/businesses"

interface ProductDetailProps {
  product: Product
  business: Business
}

export default function ProductDetail({ product, business }: ProductDetailProps) {
  const [quantity, setQuantity] = useState(1)
  // Virtual stock that changes as user selects quantity
  const [virtualStock, setVirtualStock] = useState(product.currentStock)

  // Update virtual stock whenever quantity changes
  useEffect(() => {
    setVirtualStock(product.currentStock - quantity)
  }, [quantity, product.currentStock])

  const updateQuantity = (delta: number) => {
    const newQuantity = Math.max(1, Math.min(product.currentStock, quantity + delta))
    setQuantity(newQuantity)
  }

  const addToCart = () => {
    // Here you would typically dispatch to a cart state manager
    console.log(`Added ${quantity} of ${product.name} to cart`)
    alert(`Agregado al carrito: ${quantity} x ${product.name}`)
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      <Link href="/offers" className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-6">
        <ArrowLeft className="w-4 h-4 mr-1" />
        Volver a ofertas
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Product Image */}
        <div className="rounded-lg overflow-hidden bg-gray-100">
          <img
            src={product.imageUrl || "/placeholder.svg?height=400&width=600"}
            alt={product.name}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Product Details */}
        <div>
          <h1 className="text-3xl font-bold mb-2">{product.name}</h1>

          <div className="flex items-center gap-4 mb-4">
            <div className="flex items-center">
              <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
              <span className="ml-1 text-lg">{business.rating.toFixed(1)}</span>
            </div>
            <span className="text-gray-600">{business.name}</span>
          </div>

          <div className="text-2xl font-bold mb-4">${product.price.toFixed(2)}</div>

          <p className="text-gray-700 mb-6">{product.description}</p>

          {/* Stock Progress Bar - Now using virtualStock to show real-time updates */}
          <div className="mb-6">
            <ProgressBar value={virtualStock} max={product.totalStock} label="Indicador de demanda" />
            {quantity > 1 && (
              <p className="text-sm text-blue-600 mt-2">
                La demanda incluye tu selección actual de {quantity} {quantity === 1 ? "unidad" : "unidades"}
              </p>
            )}
          </div>

          {/* Quantity Selector */}
          <div className="flex items-center gap-4 mb-6">
            <span className="text-gray-700">Cantidad:</span>
            <div className="flex items-center">
              <Button variant="outline" size="icon" onClick={() => updateQuantity(-1)} disabled={quantity <= 1}>
                <Minus className="w-4 h-4" />
              </Button>
              <span className="w-12 text-center font-medium">{quantity}</span>
              <Button
                variant="outline"
                size="icon"
                onClick={() => updateQuantity(1)}
                disabled={quantity >= product.currentStock}
              >
                <Plus className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Add to Cart Button */}
          <Button size="lg" className="w-full" disabled={product.currentStock === 0}>
            <Link href="/checkout">
            <ShoppingBag className="w-5 h-5 mr-2" />
            Agregar al carrito
            </Link>            
          </Button>

          {/* Business Info */}
          <div className="mt-8 p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-200">
                <img
                  src={business.avatar || "/placeholder.svg"}
                  alt={business.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h3 className="font-medium">{business.name}</h3>
                <p className="text-sm text-gray-600">{business.email}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

