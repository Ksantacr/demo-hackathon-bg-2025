"use client"

import { useState } from "react"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { ShoppingCart, CreditCard, BanknoteIcon as Bank } from "lucide-react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { CartItem } from "@/app/data/businesses"

interface CheckoutProps {
  cart: CartItem[]
  creditLimit: number
}

export default function Checkout({ cart, creditLimit = 10000 }: CheckoutProps) {
  const [paymentMethod, setPaymentMethod] = useState<"credit" | "transfer">("credit")

  const cartTotal = cart.reduce((sum, item) => sum + item.quantity * item.price, 0)
  const monthlyPayment = (cartTotal * 1.5) / 6 // 50% interest over 6 months

  return (
    <div className="flex h-full">
      <div className="flex-1 p-8 overflow-auto">
        <h1 className="text-3xl font-bold mb-8">Método de Pago</h1>

        <RadioGroup
          defaultValue={paymentMethod}
          onValueChange={(value) => setPaymentMethod(value as "credit" | "transfer")}
          className="space-y-4"
        >
          <div>
            <div
              className={`flex items-center space-x-2 rounded-lg border p-4 cursor-pointer
              ${paymentMethod === "credit" ? "border-blue-500 bg-blue-50" : ""}
            `}
            >
              <RadioGroupItem value="credit" id="credit" />
              <Label htmlFor="credit" className="flex items-center gap-2 cursor-pointer">
                <CreditCard className="w-5 h-5" />
                <span>Crédito pre aprobado por BG</span>
              </Label>
            </div>

            {paymentMethod === "credit" && (
              <div className="mt-4 ml-6">
                <Accordion type="single" collapsible defaultValue="credit-details">
                  <AccordionItem value="credit-details">
                    <AccordionTrigger>Ver detalles del crédito</AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-2 text-sm">
                        <p>Plazo de 6 meses</p>
                        <p>Cuota a pagar $950,79 </p>
                        <p>Interés: 15%</p>
                        <p>Total a pagar: $7722,74</p>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
            )}
          </div>

          <div
            className={`flex items-center space-x-2 rounded-lg border p-4 cursor-pointer
            ${paymentMethod === "transfer" ? "border-blue-500 bg-blue-50" : ""}
          `}
          >
            <RadioGroupItem value="transfer" id="transfer" />
            <Label htmlFor="transfer" className="flex items-center gap-2 cursor-pointer">
              <Bank className="w-5 h-5" />
              <span>Transferencia / TC</span>
            </Label>
          </div>
        </RadioGroup>
      </div>

      {/* Cart Panel */}
      <div className="w-80 border-l bg-gray-50 p-6 flex flex-col">
        <div className="flex items-center gap-2 mb-6">
          <ShoppingCart className="w-5 h-5" />
          <h2 className="text-lg font-semibold">Resumen</h2>
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
          <Button className="w-full">Pagar</Button>
        </div>
      </div>
    </div>
  )
}

