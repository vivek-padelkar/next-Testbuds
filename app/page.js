import CategoryList from './_components/CategoryList'
import Sliders from './_components/Sliders'
import { getCategoryList, getSliders } from './_utils/globalApi'

export default async function Home() {
  const sliderList = await getSliders()
  const categoryList = await getCategoryList()

  return (
    <div className="p-5 md:p-10 px-16">
      {/* slider */}
      <Sliders sliderList={sliderList} />
      {/* categoryList */}
      <CategoryList categoryList={categoryList} />
    </div>
  )
}
