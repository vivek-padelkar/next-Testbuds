import Image from 'next/image'
import { TrashIcon } from 'lucide-react'

const CartItemList = ({ cartItemList, onDelteItem }) => {
  return (
    <div>
      <div className="p-2 mb-5 h-[500px] overflow-auto">
        {cartItemList.map((item, index) => (
          <div key={index} className="flex justify-between items-center">
            <div className="flex gap-6">
              <img
                className="border p-1 mb-2"
                src={item.image}
                width={70}
                height={70}
                alt={item.name}
              />
              <div className="flex flex-col">
                <h2 className="font-bold">{item.name}</h2>
                <h2>Quantity: {item.quantity}</h2>
                <h2 className="text-lg font-bold">{item.amount} &#8377;</h2>
              </div>
            </div>
            <TrashIcon
              className="cursor-pointer hover:text-red-700 hover:font-bold"
              onClick={() => {
                onDelteItem(item.id)
              }}
            />
          </div>
        ))}
      </div>
    </div>
  )
}

export default CartItemList
