"use client";
import Image from "next/image";

import "swiper/css";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const Carousel = () => {
  return (
    // <Swiper spaceBetween={10} slidesPerView={1} loop={true} autoplay={{ delay: 3000 }}>
    <Swiper
      modules={[Navigation, Pagination, Autoplay]}
      spaceBetween={30} // 슬라이드 간 간격 (px)
      slidesPerView={1} // 한 화면에 보일 슬라이드 수
      navigation // 자동 재생 설정
      pagination={{ clickable: true }} // 페이지 점 표시 설정
      autoplay={{ delay: 3000, disableOnInteraction: false }} // 자동 재생 설정
      loop // 슬라이드 반복 여부
      className="w-full h-[500px]" // Tailwind로 크기 조절
    >
      <SwiperSlide>
        <div className="relative w-full h-[500px] min-h-[500px] bg-peach-300">
          <Image
            src="/assets/carousel/carousel1.jpg"
            alt="배너1"
            fill
            priority
            className="object-cover rounded-lg"
          />
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className="relative w-full h-[500px] min-h-[500px] bg-peach-300">
          <Image
            src="/assets/carousel/carousel2.jpg"
            alt="배너2"
            fill
            className="object-cover rounded-lg"
          />
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className="relative w-full h-[500px] min-h-[500px] bg-peach-300">
          <Image
            src="/assets/carousel/carousel3.jpg"
            alt="배너3"
            fill
            className="object-cover rounded-lg"
          />
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className="relative w-full h-[500px]">
          <Image
            src="/assets/carousel/carousel4.jpg"
            alt="배너4"
            fill
            className="object-cover rounded-lg"
          />
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className="relative w-full h-[500px]">
          <Image
            src="/assets/carousel/carousel5.jpg"
            alt="배너5"
            fill
            className="object-cover rounded-lg"
          />
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className="relative w-full h-[500px]">
          <Image
            src="/assets/carousel/carousel6.jpg"
            alt="배너6"
            fill
            className="object-cover rounded-lg"
          />
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className="relative w-full h-[500px]">
          <Image
            src="/assets/carousel/carousel7.jpg"
            alt="배너7"
            fill
            className="object-cover rounded-lg"
          />
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className="relative w-full h-[500px]">
          <Image
            src="/assets/carousel/carousel8.jpg"
            alt="배너8"
            fill
            className="object-cover rounded-lg"
          />
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className="relative w-full h-[500px]">
          <Image
            src="/assets/carousel/carousel9.jpg"
            alt="배너9"
            fill
            className="object-cover rounded-lg"
          />
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className="relative w-full h-[500px]">
          <Image
            src="/assets/carousel/carousel10.jpg"
            alt="배너10"
            fill
            className="object-cover rounded-lg"
          />
        </div>
      </SwiperSlide>
    </Swiper>
  );
};

export default Carousel;
