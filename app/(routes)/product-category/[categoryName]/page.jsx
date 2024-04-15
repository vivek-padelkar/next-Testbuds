import {
  getAllProductsByCategory,
  getCategoryList,
} from '@/app/_utils/globalApi'
import TopCategoryList from '../_components/TopCategoryList'
import ProductList from '@/app/_components/ProductList'

const ProductCategory = async ({ params }) => {
  const productList = await getAllProductsByCategory(
    params?.categoryName || 'Fruits'
  )
  const categoryList = await getCategoryList()

  return (
    <div className="p-4">
      <h1 className="p-4 bg-primary text-white font-bold text-3xl text-center">
        {decodeURIComponent(params?.categoryName)}
      </h1>
      <TopCategoryList categoryList={categoryList} />
      <ProductList productList={productList} />
    </div>
  )
}

export default ProductCategory
