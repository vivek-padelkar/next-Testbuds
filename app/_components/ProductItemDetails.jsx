'use client'
import { useState } from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { ShoppingBasket } from 'lucide-react'
const ProductItemDetails = ({ product }) => {
  let [quantity, setQuantity] = useState(1)
  const sellingPrice = product?.attributes?.sellingPrice
  const mrpPrice = product?.attributes?.mrp

  const [producTtotalPrice, setProducTtotalPrice] = useState(
    sellingPrice ? sellingPrice : mrpPrice
  )

  return (
    <div className="grid items-center grid-cols-1 gap-10 md:grid-cols-2 p-7 bg-white text-black">
      <Image
        src={
          process.env.NEXT_PUBLIC_BACKEND_BASE_URL +
          product.attributes?.images?.data[0]?.attributes?.url
        }
        width={300}
        height={300}
        alt="product"
        className="bg-slate-200 p-5 h-[340px] w-[320px] object-contain rounded-lg"
      />
      <div className="flex flex-col gap-3">
        {/* product name */}
        <h2 className="text-2xl font-bold">{product?.attributes?.name}</h2>
        {/* description */}
        <p className="text-sm text-gray-500">
          {product?.attributes?.description ||
            `Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt, aliquid? Deleniti, vero minima neque iure dolorem corrupti vel nostrum exercitationem est consectetur hic aliquam, voluptatibus in modi quia, necessitatibus omnis.
          Dolor soluta.`}
        </p>
        {/* price */}
        <div className="font-semibold text-lg">
          {sellingPrice && (
            <h2 className="">Offer Price: {sellingPrice} &#8377;</h2>
          )}
          <h2 className={`${sellingPrice && 'line-through text-red-500'}`}>
            Price: {mrpPrice} &#8377;
          </h2>
        </div>
        {/* default quantity */}
        <h2 className="text-lg font-medium">
          Quantity ({product?.attributes?.itemQuantityType})
        </h2>
        {/* quantity counter */}
        <div className="flex gap-2">
          <div className="flex gap-3 items-center justify-between border w-28">
            <button
              disabled={quantity === 1}
              className="flex items-center justify-center p-2 w-7 hover:bg-primary hover:text-white transition-all ease-in-out duration-200"
              onClick={() => setQuantity(quantity - 1)}
            >
              -
            </button>
            <h2>{quantity}</h2>
            <button
              className="flex items-center justify-center p-2 w-7 hover:bg-primary hover:text-white transition-all ease-in-out duration-200"
              onClick={() => setQuantity(quantity + 1)}
            >
              +
            </button>
          </div>
          <h2 className="text-lg mt-4 font-semibold">
            ={' '}
            <span className="font-semibold">
              {(quantity * producTtotalPrice).toFixed(2)} &#8377;
            </span>
          </h2>
        </div>
        <Button className="flex gap-3 outline-none mt-2">
          <ShoppingBasket /> Add to Cart
        </Button>
        {/* category type */}
        <h2 className="">
          <span className="font-semibold">Category: </span>
          {product?.attributes?.categories?.data[0]?.attributes?.name}
        </h2>
      </div>
    </div>
  )
}

export default ProductItemDetails
