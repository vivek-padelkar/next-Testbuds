import { Button } from '@/components/ui/button'
import Image from 'next/image'
const ProductItem = ({ product }) => {
  return (
    <div
      className=" cursor-pointer p-2 md:p-6 flex flex-col 
    justify-center items-center gap-3 border rounded-lg
    truncate hover:scale-110 hover:shadow-md
    transition-all ease-in-out duration-200"
    >
      <Image
        src={
          process.env.NEXT_PUBLIC_BACKEND_BASE_URL +
          product?.attributes?.images?.data[0]?.attributes?.url
        }
        width={500}
        height={200}
        alt={product?.attributes?.name}
        className="h-[200px] w-[200px] object-contain"
      />
      <h2 className="text-green-800 font-semibold text-lg">
        {product?.attributes?.name}
      </h2>
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
      <Button
        variant="outline"
        className="text-primary hover:text-white hover:bg-primary"
      >
        Add to cart
      </Button>
    </div>
  )
}

export default ProductItem
