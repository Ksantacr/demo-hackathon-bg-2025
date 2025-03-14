"use client"

import { useEffect, useState } from "react"
import { Check, Loader2 } from "lucide-react"

interface PaymentStatusProps {
  onComplete?: () => void
}

export default function PaymentStatus({ onComplete }: PaymentStatusProps) {
  const [stage, setStage] = useState(0)

  const stages = ["Revisando crédito", "Aprobando crédito", "Transacción registrada"]

  useEffect(() => {
    const timer1 = setTimeout(() => setStage(1), 1000)
    const timer2 = setTimeout(() => setStage(2), 2000)
    const timer3 = setTimeout(() => {
      if (onComplete) onComplete()
    }, 3000)

    return () => {
      clearTimeout(timer1)
      clearTimeout(timer2)
      clearTimeout(timer3)
    }
  }, [onComplete])

  return (
    <div className="fixed inset-0 bg-white bg-opacity-90 backdrop-blur-sm flex items-center justify-center">
      <div className="text-center">
        {stage < 2 ? (
          <>
            <div className="w-16 h-16 mb-4 mx-auto">
              <Loader2 className="w-16 h-16 animate-spin text-blue-500" />
            </div>
            <p className="text-lg font-medium text-gray-900">{stages[stage]}</p>
          </>
        ) : (
          <div className="space-y-4">
            <div className="w-16 h-16 rounded-full border-2 border-green-500 mx-auto flex items-center justify-center">
              <Check className="w-8 h-8 text-green-500" />
            </div>
            <p className="text-lg font-medium text-gray-900">{stages[stage]}</p>
          </div>
        )}
      </div>
    </div>
  )
}

