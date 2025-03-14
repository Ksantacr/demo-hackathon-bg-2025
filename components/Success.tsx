"use client"

import { Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

export default function Success() {
  const router = useRouter()

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="text-center">
        <div className="w-16 h-16 rounded-full border-2 border-green-500 mx-auto flex items-center justify-center mb-6">
          <Check className="w-8 h-8 text-green-500" />
        </div>
        <h1 className="text-2xl font-bold mb-2">¡Se inicio el proceso de compra!</h1>
        <p className="text-gray-600 mb-8">Tu pago ha sido procesado correctamente</p>
        <Button onClick={() => router.push("/")}>Volver al inicio</Button>
      </div>
    </div>
  )
}

