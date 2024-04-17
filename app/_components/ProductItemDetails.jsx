'use client'
import { useContext, useState } from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { ShoppingBasket } from 'lucide-react'
import { addToCart } from '../_utils/globalApi'
import { toast } from 'sonner'
import Link from 'next/link'
import { UpdateCartContext } from '../_context/UpdateCartContext'

const ProductItemDetails = ({ product }) => {
  let [quantity, setQuantity] = useState(1)
  const [loading, setLoading] = useState(false)
  const { updateCart, setUpdateCart } = useContext(UpdateCartContext)
  const jwt = sessionStorage.getItem('jwt')
  const user = JSON.parse(sessionStorage.getItem('user'))

  const sellingPrice = product?.attributes?.sellingPrice
  const mrpPrice = product?.attributes?.mrp

  const [producTtotalPrice, setProducTtotalPrice] = useState(
    sellingPrice ? sellingPrice : mrpPrice
  )

  const hanldeAddToCart = async () => {
    try {
      if (jwt && user) {
        setLoading(true)
        const data = {
          data: {
            quantity,
            amount: Number((quantity * producTtotalPrice).toFixed(2)),
            product: product?.id,
            users_permissions_user: user?.id,
            userid: user?.id,
          },
        }
        await addToCart(data, jwt)
        setLoading(false)
        setUpdateCart(!updateCart)
        toast('added to cart !')
      }
    } catch (error) {
      setLoading(false)
      toast(error.response?.data?.error?.message || error.message)
    }
  }

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
        <h2 className="text-sm text-gray-500">
          {product?.attributes?.description ||
            `Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt, aliquid? Deleniti, vero minima neque iure dolorem corrupti vel nostrum exercitationem est consectetur hic aliquam, voluptatibus in modi quia, necessitatibus omnis.
          Dolor soluta.`}
        </h2>
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
        {jwt ? (
          <Button disabled={loading} onClick={() => hanldeAddToCart()}>
            {loading ? (
              <>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 200 200"
                  width={38}
                  height={38}
                >
                  <radialGradient
                    id="a12"
                    cx=".66"
                    fx=".66"
                    cy=".3125"
                    fy=".3125"
                    gradientTransform="scale(1.5)"
                  >
                    <stop offset="0" stopColor="#FFFFFF"></stop>
                    <stop
                      offset=".3"
                      stopColor="#FFFFFF"
                      stop-opacity=".9"
                    ></stop>
                    <stop
                      offset=".6"
                      stopColor="#FFFFFF"
                      stop-opacity=".6"
                    ></stop>
                    <stop
                      offset=".8"
                      stopColor="#FFFFFF"
                      stop-opacity=".3"
                    ></stop>
                    <stop
                      offset="1"
                      stopColor="#FFFFFF"
                      stop-opacity="0"
                    ></stop>
                  </radialGradient>
                  <circle
                    transform-origin="center"
                    fill="none"
                    stroke="url(#a12)"
                    stroke-width="15"
                    stroke-linecap="round"
                    stroke-dasharray="200 1000"
                    stroke-dashoffset="0"
                    cx="100"
                    cy="100"
                    r="70"
                  >
                    <animateTransform
                      type="rotate"
                      attributeName="transform"
                      calcMode="spline"
                      dur="2"
                      values="360;0"
                      keyTimes="0;1"
                      keySplines="0 0 1 1"
                      repeatCount="indefinite"
                    ></animateTransform>
                  </circle>
                  <circle
                    transform-origin="center"
                    fill="none"
                    opacity=".2"
                    stroke="#FFFFFF"
                    stroke-width="15"
                    stroke-linecap="round"
                    cx="100"
                    cy="100"
                    r="70"
                  ></circle>
                </svg>
              </>
            ) : (
              <>
                <ShoppingBasket /> Add to Cart
              </>
            )}
          </Button>
        ) : (
          <Link
            className="p-2 rounded bg-green-50 font-bold hover:underline"
            href={'/sigin-in'}
          >
            Please, Login in To continue...
          </Link>
        )}

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
