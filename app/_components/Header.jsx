'use client'
import Image from 'next/image'
import Link from 'next/link'
import { LayoutGrid, Search, ShoppingBag, CircleUserRound } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { getCartItems, getCategory } from '../_utils/globalApi'
import { useContext, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { UpdateCartContext } from '../_context/UpdateCartContext'

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import CartItemList from './CartItemList'

const Header = () => {
  const router = useRouter()
  const { updateCart, setUpdateCart } = useContext(UpdateCartContext)
  const [categoryList, setCategoryList] = useState([])
  const [totalCartItem, setTotalCartItem] = useState(0)
  const [cartItemList, setCartItemList] = useState([])

  const token =
    typeof window !== 'undefined' ? sessionStorage.getItem('jwt') : null
  const user =
    typeof window !== 'undefined'
      ? JSON.parse(sessionStorage.getItem('user'))
      : null

  useEffect(() => {
    const getCategoies = async () => {
      const { data } = await getCategory()
      setCategoryList(data.data)
    }
    getCategoies()
  }, [])

  useEffect(() => {
    handleCartItems()
  }, [updateCart])

  const handleLogOut = () => {
    sessionStorage.clear()
    router.push('/sign-in')
  }

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
  return (
    <div className="flex flex-col items-center justify-center gap-2 sm:flex-row p-5 shadow-sm justify-between">
      <div className="flex items-center gap-8">
        <img
          className="w-[200px] h-[50px]"
          src={`/Logo.png`}
          alt="logo with hamburger"
        />

        <DropdownMenu>
          <DropdownMenuTrigger className="outline-none cursor-pointer">
            <h2 className="md:flex gap-2 items-center border rounded-full p-2 px-10 bg-slate-200 hidden">
              <LayoutGrid className="h-5 w-5" />
              Category
            </h2>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>
              {categoryList.length === 0 ? 'Loading...' : 'Browse Category'}
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            {categoryList.length > 0 &&
              categoryList.map(
                (cat) => (
                  <Link
                    key={cat?.attributes?.name}
                    href={`/product-category/${cat?.attributes?.name}`}
                  >
                    <DropdownMenuItem className="flex gap-2 items-center cursor-pointer">
                      <Image
                        src={`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}${cat?.attributes?.icon?.data[0]?.attributes?.url}`}
                        alt={`${cat?.attributes?.name}`}
                        width={30}
                        height={30}
                        unoptimized={true}
                      />
                      <h2 className="font-semibold">{cat?.attributes?.name}</h2>
                    </DropdownMenuItem>
                  </Link>
                )
                //
              )}
          </DropdownMenuContent>
        </DropdownMenu>

        <div className="md:flex gap-3 items-center border rounded-full p-2 mx-5 hidden">
          <Search />
          <input type="text" className="outline-none" placeholder="Search" />
        </div>
      </div>

      <div className="flex items-center gap-8">
        <h2 className="flex gap-2 items-center text-lg">
          <Sheet>
            <SheetTrigger>
              <ShoppingBag />
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle className="bg-primary text-white block mt-6 p-1 font-bold">
                  My cart
                </SheetTitle>
                <SheetDescription>
                  <CartItemList cartItemList={cartItemList} />
                </SheetDescription>
              </SheetHeader>
            </SheetContent>
          </Sheet>

          {totalCartItem > 0 && (
            <span className="bg-primary text-white px-2 rounded-full">
              {totalCartItem}
            </span>
          )}
        </h2>
        {!token ? (
          <Link
            className="bg-primary text-white p-2 hover:opacity-90 rounded-lg"
            href="/sign-in"
          >
            Login
          </Link>
        ) : (
          //

          <DropdownMenu className="cursor-pointer">
            <DropdownMenuTrigger>
              <CircleUserRound className="h-12 w-12 cursor-pointer bg-green-100 text-primary p-2 rounded-full" />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>My order</DropdownMenuItem>
              <DropdownMenuItem onClick={handleLogOut}>
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
    </div>
  )
}

export default Header
