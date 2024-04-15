import Image from 'next/image'
import Link from 'next/link'

const TopCategoryList = ({ categoryList }) => {
  return (
    <div className="mt-5">
      <h2 className="mb-5 text-green-700 text-2xl font-bold">
        Shop by Category
      </h2>
      <div className="flex gap-5 mt-2 overflow-scroll mx-7 md:mx-20">
        {categoryList.map((cat, index) => (
          <Link
            href={`/product-category/${cat?.attributes?.name}`}
            className="p-4 cursor-pointer rounded-xl flex items-center 
          flex-col bg-green-50 gap-2 hover:bg-green-200 w-[150px] min-w-[100px]"
          >
            <Image
              key={cat.attributes.name}
              src={
                process.env.NEXT_PUBLIC_BACKEND_BASE_URL +
                cat.attributes.icon.data[0].attributes.url
              }
              width={50}
              height={60}
              alt="icon"
              className="hover:scale-125 transition-all ease-in-out"
            />
            <h2 className="text-green-800 font-semibold overflow-hidden text-ellipsis whitespace-nowrap">
              {cat.attributes.name}
            </h2>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default TopCategoryList
