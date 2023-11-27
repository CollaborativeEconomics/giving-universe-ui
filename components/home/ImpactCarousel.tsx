'use client';

import { useEffect, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import InitiativeCardCompact from '../initiativeCardCompact';

export default function ImpactCarousel() {
  return (
    <div className="absolute bottom-0 left-0 right-0">
      <Swiper
        slidesPerView={4}
        spaceBetween={30}
        pagination={{
          clickable: true,
        }}
        modules={[Pagination]}
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
          <InitiativeCardCompact />
        </SwiperSlide>
        <SwiperSlide>
          <InitiativeCardCompact />
        </SwiperSlide>
        <SwiperSlide>
          <InitiativeCardCompact />
        </SwiperSlide>
        <SwiperSlide>
          <InitiativeCardCompact />
        </SwiperSlide>
        <SwiperSlide>
          <InitiativeCardCompact />
        </SwiperSlide>
        <SwiperSlide>
          <InitiativeCardCompact />
        </SwiperSlide>
        <SwiperSlide>
          <InitiativeCardCompact />
        </SwiperSlide>
        <SwiperSlide>
          <InitiativeCardCompact />
        </SwiperSlide>
      </Swiper>
    </div>
  );
}
