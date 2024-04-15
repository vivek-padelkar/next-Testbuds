import React from 'react'
import ProductItem from './ProductItem'

const ProductList = ({ productList }) => {
  return (
    <div className="mt-10">
      <h2 className="mb-5 text-green-700 text-2xl font-bold">
        Our popular products
      </h2>
      <div className="grid gap-5 grid-cols-1 md:grid-cols-3 lg:grid-cols-4">
        {productList.map(
          (prod, index) =>
            index <= 7 && <ProductItem key={index} product={prod} />
        )}
      </div>
    </div>
  )
}

export default ProductList
