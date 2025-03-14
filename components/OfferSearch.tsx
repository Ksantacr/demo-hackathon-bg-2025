"use client"

import type React from "react"

import { useState } from "react"
import { Search, Star } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { businesses } from "@/app/data/businesses"
import Link from "next/link"

export default function OfferSearch() {
  const [searchQuery, setSearchQuery] = useState("")
  const [hasSearched, setHasSearched] = useState(false)

  // Flatten all products from all businesses into a single array with business info
  const allProducts = businesses.flatMap((business) =>
    business.products.map((product) => ({
      ...product,
      businessName: business.name,
      businessId: business.id,
      businessRating: business.rating || 0,
      businessAvatar: business.avatar,
    })),
  )

  const filteredProducts = allProducts.filter(
    (product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value)
    setHasSearched(true)
  }

  return (
    <div className="flex-1 overflow-auto p-8">
      <h1 className="text-4xl font-bold mb-6">Buscar Ofertas</h1>

      {/* Search bar */}
      <div className="max-w-2xl mx-auto mb-12">
        <div className="relative">
          <Input
            type="text"
            placeholder="Buscar productos o servicios..."
            value={searchQuery}
            onChange={handleSearch}
            className="w-full pl-10 pr-4 py-3 text-lg rounded-lg"
          />
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Search className="w-5 h-5 text-gray-400" />
          </div>
        </div>
      </div>

      {/* Results or placeholder */}
      {!hasSearched || searchQuery === "" ? (
        <div className="text-center py-12">
          <div className="w-24 h-24 mx-auto mb-4">
            <img src="https://www.iconpacks.net/icons/2/free-search-icon-2911-thumb.png" alt="Search" className="w-full h-full opacity-50" />
          </div>
          <p className="text-lg text-gray-500">Ingresa un término de búsqueda para encontrar ofertas</p>
        </div>
      ) : filteredProducts.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-lg text-gray-500">No se encontraron resultados para "{searchQuery}"</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <div key={product.id} className="border border-gray-200 rounded-lg overflow-hidden">
              <div className="aspect-video relative bg-gray-100">
                <img
                  src={product.businessAvatar || "/placeholder.svg"}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-2 right-2 bg-white px-2 py-1 rounded-full text-sm font-medium">
                  ${product.price.toFixed(2)}
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-lg font-semibold mb-1">{product.name}</h3>
                <p className="text-sm text-gray-600 mb-3">{product.description}</p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    <span className="text-sm text-gray-700">{product.businessName}</span>
                    <div className="flex items-center ml-2">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-xs ml-1">{product.businessRating.toFixed(1)}</span>
                    </div>
                  </div>
                  <Button size="sm">
                  <Link href="/offers/1">
                  Ver detalle</Link>
                    </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

