import Image from 'next/image'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'

const Sliders = ({ sliderList }) => {
  console.log(sliderList[0]?.attributes)
  return (
    <Carousel className="">
      <CarouselContent>
        {sliderList.map((slider, index) => (
          <CarouselItem key={index}>
            <Image
              src={
                process.env.NEXT_PUBLIC_BACKEND_BASE_URL +
                slider?.attributes?.image?.data[0]?.attributes?.url
              }
              width={1000}
              height={400}
              alt="Slider"
              className="w-full 200px md:h-[400px] object-cover rounded-xl"
            />
          </CarouselItem>
        ))}
        {/* <CarouselItem key={1}>...</CarouselItem>
        <CarouselItem key={1}>AAA</CarouselItem> */}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  )
}

export default Sliders
