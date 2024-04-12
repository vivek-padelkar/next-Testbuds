import Sliders from './_components/Sliders'
import { getSliders } from './_utils/globalApi'

export default async function Home() {
  const sliderList = await getSliders()
  console.log(sliderList)
  return (
    <div className="p-5 md:p-10 px-16">
      <Sliders sliderList={sliderList} />
    </div>
  )
}
