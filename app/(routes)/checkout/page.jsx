'use client'
import { useEffect, useState } from 'react'
import { ArrowBigRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { useRouter } from 'next/navigation'
import { PayPalButtons } from '@paypal/react-paypal-js'
import {
  deleteCartItem,
  getCartItems,
  getCategory,
} from '../../_utils/globalApi'
import { toast } from 'sonner'

const Checkout = () => {
  const router = useRouter()
  const [userData, setUserData] = useState({
    username: '',
    email: '',
    address: '',
    phone: '',
    zip: '',
  })
  const [totalCartItem, setTotalCartItem] = useState(0)
  const [cartItemList, setCartItemList] = useState([])
  const [subTotal, setSubTotal] = useState(0)
  const [tax, setTax] = useState(0)
  const [total, setTotal] = useState(0)

  const token =
    typeof window !== 'undefined' ? sessionStorage.getItem('jwt') : null
  const user =
    typeof window !== 'undefined'
      ? JSON.parse(sessionStorage.getItem('user'))
      : null

  useEffect(() => {
    if (!token) {
      router.push('/sign-in')
    } else {
      handleCartItems()
    }
  }, [])

  const handleCartItems = async () => {
    try {
      if (token && user) {
        const cartItemsList = await getCartItems(user.id, token)
        setTotalCartItem(cartItemsList?.length)
        setCartItemList(cartItemsList)
      }
    } catch (error) {
      toast(error.response?.data?.error?.message || error.message)
    }
  }

  useEffect(() => {
    let total = 0
    cartItemList.forEach((item) => {
      total = total + Number(item.amount.toString(2))
    })
    const tax = (total * (2 / 100)).toFixed(2)
    setTotal(Number(tax) + Number(subTotal) + 10)
    setSubTotal(total)
    setTax(tax)
  }, [cartItemList])

  const calculateAmout = () => {
    const finalTotal = Number(tax) + Number(subTotal) + 10
    return finalTotal
  }

  const handleChange = (e) => {
    e.preventDefault()
    setUserData((prev) => ({
      ...prev,
      [e.target.id]: e.target.value,
    }))

    console.log(userData)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    toast('data added')
  }
  const onApprove = (data) => {
    console.log(data)
    console.log(cartItemList)

    userData.paymentId = data.paymentID
    userData.totalOrderAmount = total
    console.log(userData)
    const payload = {
      data: {
        ...userData,
        orderItemList: cartItemList,
      },
    }

    console.log(payload)
  }
  return (
    <div className="">
      <h2 className="p-3 bg-primary text-xl font-bold text-center text-white">
        Checkout
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="flex p-10 gap-10 flex-col sm:flex-row">
          <div className="w-full sm:w-[70%] ">
            <h2 className="font-bold text-3xl">Billing Details</h2>
            <div className="grid grid-cols-2 gap-10 mt-3">
              <Input
                type="text"
                id={`username`}
                placeholder="Name"
                required
                onChange={handleChange}
              />
              <Input
                type="email"
                id={`email`}
                placeholder="Email"
                required
                onChange={handleChange}
              />
            </div>
            <div className="grid grid-cols-2 gap-10 mt-3">
              <Input
                type="text"
                id={`phone`}
                placeholder="Phone"
                required
                maxLength={10}
                minLength={10}
                onChange={handleChange}
              />
              <Input
                type="text"
                id={`zip`}
                placeholder="zip"
                maxLength={6}
                minLength={6}
                onChange={handleChange}
              />
            </div>
            <div className="grid grid-cols-1 gap-10 mt-3">
              <Textarea
                type="text"
                id={`address`}
                placeholder="Address"
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="border w-full sm:w-[30%]">
            <h2 className="p-3 bg-gray-300 font-bold text-center">
              Total Cart ({totalCartItem})
            </h2>
            <div className="p-4 flex flex-col gap-4">
              <h2 className="font-bold flex justify-between">
                Subtotal:<span>{subTotal.toFixed(2)} &#8377;</span>
              </h2>
              <hr></hr>
              <h2 className="flex justify-between">
                Delivery:<span>{'10.00'} &#8377;</span>
              </h2>
              <h2 className="flex justify-between">
                Tax (2%):<span>{tax} &#8377;</span>
              </h2>
              <hr></hr>
              <h2 className="font-bold flex justify-between">
                Total:<span>{calculateAmout()} &#8377;</span>
              </h2>
              {/* 4032031893631019 
              08/2026
              788
              pin 89012
              */}
              <PayPalButtons
                type="submit"
                style={{ layout: 'horizontal' }}
                onApprove={onApprove}
                createOrder={(data, actions) => {
                  return actions.order.create({
                    purchase_units: [
                      {
                        amount: {
                          value: total,
                          currency_code: `USD`,
                        },
                      },
                    ],
                  })
                }}
              ></PayPalButtons>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}

export default Checkout
