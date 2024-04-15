'use client'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { LayoutGrid, Search, ShoppingBag } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { getCategory } from '../_utils/globalApi'
import { useEffect, useState } from 'react'

const Header = () => {
  const [categoryList, setCategoryList] = useState([])
  useEffect(() => {
    const getCategoies = async () => {
      const { data } = await getCategory()
      setCategoryList(data.data)
      console.log(data.data[0].id)
    }
    getCategoies()
  }, [])

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
                  <Link href={`/product-category/${cat?.attributes?.name}`}>
                    <DropdownMenuItem
                      key={cat?.attributes?.name}
                      className="flex gap-2 items-center cursor-pointer"
                    >
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
          <ShoppingBag />0
        </h2>

        <Button>Log in</Button>
      </div>
    </div>
  )
}

export default Header
