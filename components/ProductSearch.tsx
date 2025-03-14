"use client"

import type React from "react"

import { useState } from "react"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { businesses } from "@/app/data/businesses"
import Link from "next/link"
//import { businesses } from "/data"

export default function ProductSearch() {
  const [searchQuery, setSearchQuery] = useState("")
  const [hasSearched, setHasSearched] = useState(false)

  const filteredBusinesses = businesses.filter((business) =>
    business.products.some(
      (product) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase()),
    ),
  )

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value)
    setHasSearched(true)
  }

  const handleApply = (businessId: number) => {
    // Here you would typically make an API call to update the applicants count
    console.log(`Applied to business ${businessId}`)
  }

  return (
    <div className="flex-1 overflow-auto p-8">
      <h1 className="text-4xl font-bold mb-6">Buscar Productos y Servicios</h1>

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
          <p className="text-lg text-gray-500">Ingresa un término de búsqueda para encontrar productos y servicios</p>
        </div>
      ) : filteredBusinesses.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-lg text-gray-500">No se encontraron resultados para "{searchQuery}"</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBusinesses.map((business) => (
            <div key={business.id} className="border border-gray-200 rounded-lg overflow-hidden">
              <div className="aspect-video relative bg-gray-100">
                <img
                  src={business.avatar || "/placeholder.svg"}
                  alt={business.name}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="p-6">
                <h3 className="text-lg font-semibold mb-4">{business.name}</h3>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">
                    {business.applicants}/{business.maxApplicants} solicitantes
                  </span>
                  
                  <Button
                    disabled={business.applicants >= business.maxApplicants}
                    variant={business.applicants >= business.maxApplicants ? "outline" : "default"}
                  ><Link href="/pymes/1">
                    Solicitar</Link>
                    
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

