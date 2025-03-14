import { businesses } from "@/app/data/businesses"
import ProductDetail from "@/components/ProductDetail"
import { notFound } from "next/navigation"

export default function ProductDetailPage({ params }: { params: { id: string } }) {
  const productId = Number.parseInt(params.id)

  // Find the product and its business
  let foundProduct = null
  let foundBusiness = null

  for (const business of businesses) {
    const product = business.products.find((p) => p.id === productId)
    if (product) {
      foundProduct = product
      foundBusiness = business
      break
    }
  }

  if (!foundProduct || !foundBusiness) {
    return notFound()
  }

  return <ProductDetail product={foundProduct} business={foundBusiness} />
}

