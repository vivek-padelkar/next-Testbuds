import Image from 'next/image'
import { TrashIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
const CartItemList = ({ cartItemList }) => {
  return (
    <div>
      <div className="p-2 mb-5">
        {cartItemList.map((item, index) => (
          <div key={index} className="flex justify-between items-center">
            <div className="flex gap-6">
              <Image
                className="border p-1 mb-2"
                src={item.image}
                width={70}
                height={70}
                alt={item.name}
              />

              <div className="flex flex-col">
                <h2 className="font-bold">{item.name}</h2>
                <h2>Quantity: {item.quantity}</h2>
                <h2 className="text-lg font-bold">{item.amount}&#8377;</h2>
              </div>
            </div>
            <TrashIcon className="cursor-pointer hover:text-red-700 hover:font-bold" />
          </div>
        ))}
      </div>
      <div className="">
        <h2>
          Subtotal<span>22</span>
          <Button>View Cart</Button>
        </h2>
      </div>
    </div>
  )
}

export default CartItemList
