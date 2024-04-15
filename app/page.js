import Image from 'next/image'
import CategoryList from './_components/CategoryList'
import ProductList from './_components/ProductList'
import Sliders from './_components/Sliders'
import Footer from './_components/Footer'
import { getAllProducts, getCategoryList, getSliders } from './_utils/globalApi'

export default async function Home() {
  const sliderList = await getSliders()
  const categoryList = await getCategoryList()
  const productList = await getAllProducts()

  return (
    <div className="p-5 md:p-10 px-16">
      {/* slider */}
      <Sliders sliderList={sliderList} />
      {/* categoryList */}
      <CategoryList categoryList={categoryList} />
      {/* product list */}
      <ProductList productList={productList} />
      {/* banner */}
      <Image
        src={`/banner.jpeg`}
        height={300}
        width={1000}
        className="object-cover w-[100vw] h-[400px] mt-8"
      />
      <Footer />
    </div>
  )
}
