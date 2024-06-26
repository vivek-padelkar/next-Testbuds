import Image from 'next/image'
import Link from 'next/link'
// import {Link} from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTrigger,
} from '@/components/ui/dialog'
import ProductItemDetails from './ProductItemDetails'

const ProductItem = ({ key, product }) => {
  const productName = product?.attributes?.name
  return (
    <div
      className=" cursor-pointer p-2 md:p-6 flex flex-col 
    justify-center items-center gap-3 border rounded-lg
    truncate hover:scale-110 hover:shadow-md
    transition-all ease-in-out duration-200"
      key={key}
    >
      <Image
        src={
          process.env.NEXT_PUBLIC_BACKEND_BASE_URL +
          product?.attributes?.images?.data[0]?.attributes?.url
        }
        width={500}
        height={200}
        alt={productName}
        className="h-[200px] w-[200px] object-contain"
      />
      <h2 className="text-green-800 font-semibold text-lg">{productName}</h2>
      <div className="flex gap-2">
        {product?.attributes?.sellingPrice && (
          <h2 className="`text-green-800 font-semibold text-lg">
            {product?.attributes?.sellingPrice} &#8377;
          </h2>
        )}
        <h2
          className={`text-green-800 font-semibold text-lg 
      ${product?.attributes?.sellingPrice && 'line-through text-red-500'}`}
        >
          {product?.attributes?.mrp} &#8377;
        </h2>
      </div>

      <Dialog>
        <DialogTrigger className="text-primary p-2 rounded-xl border border-primary hover:text-white hover:bg-primary">
          Add to cart
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogDescription>
              <ProductItemDetails product={product} />
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default ProductItem
