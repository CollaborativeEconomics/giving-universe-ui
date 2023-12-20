'use client'

import { useEffect, useRef } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination, Navigation, Autoplay } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import InitiativeCardCompactShort from '../initiativeCardCompactShort'

export default function ImpactCarousel() {
  return (
    <div className="relative left-0 right-0">
      <Swiper
        slidesPerView={4}
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
