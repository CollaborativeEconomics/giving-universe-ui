'use client'

import { useEffect, useRef, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination, Navigation, Autoplay } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import InitiativeCardCompactShort from '../initiativeCardCompactShort'

export default function ImpactCarousel() {
  const [screenWidth, setScreenWidth] = useState(window.innerWidth)
  const setDimension = () => {
    setScreenWidth(window.innerWidth)
  }
  useEffect(() => {
    window.addEventListener('resize', setDimension)

    return () => {
      window.removeEventListener('resize', setDimension)
    }
  }, [screenWidth])

  const slideCount = screenWidth / 400

  return (
    <div className="relative left-0 right-0">
      <Swiper
        slidesPerView={slideCount}
        spaceBetween={30}
        pagination={{
          clickable: true,
        }}
        className="impactCarousel"
        centeredSlides={true}
        navigation={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        modules={[Autoplay, Pagination, Navigation]}
        speed={800}
        loop
      >
        <SwiperSlide>
          <InitiativeCardCompactShort />
        </SwiperSlide>
        <SwiperSlide>
          <InitiativeCardCompactShort />
        </SwiperSlide>
        <SwiperSlide>
          <InitiativeCardCompactShort />
        </SwiperSlide>
        <SwiperSlide>
          <InitiativeCardCompactShort />
        </SwiperSlide>
        <SwiperSlide>
          <InitiativeCardCompactShort />
        </SwiperSlide>
        <SwiperSlide>
          <InitiativeCardCompactShort />
        </SwiperSlide>
        <SwiperSlide>
          <InitiativeCardCompactShort />
        </SwiperSlide>
        <SwiperSlide>
          <InitiativeCardCompactShort />
        </SwiperSlide>
      </Swiper>
    </div>
  )
}
