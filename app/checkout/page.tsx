import Checkout from "@/components/Checkout"

// This would normally come from your cart state management
const sampleCart = [
  {
    productId: 1,
    name: "Cemento Premium",
    quantity: 1,
    price: 5000,
  },
]

export default function CheckoutPage() {
  return <Checkout cart={sampleCart} creditLimit={10000} />
}

