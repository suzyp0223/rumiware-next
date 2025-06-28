"use client";
import Image from "next/image";

import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const Carousel = () => {
  return (
    <Swiper
      modules={[Navigation, Pagination, Autoplay]}
      slidesPerView={1} // 한 화면에 보일 슬라이드 수
      spaceBetween={0} // 슬라이드 간 간격 (px)
      loop // 슬라이드 반복 여부
      autoplay={{ delay: 3000, disableOnInteraction: false }} // 자동 재생 설정
      pagination={{ clickable: true }} // 페이지 점 표시 설정
      navigation={true} // 자동 재생 설정
      onSlideChange={(swiper) => {
        console.log("🔄 슬라이드 변경:", swiper.activeIndex);
      }}
      onInit={(swiper) => {
        swiper.update();
      }}
    >
      {Array.from({ length: 11 }).map((_, idx) => (
        <SwiperSlide key={idx}>
          <div className="w-full h-[500px] min-h-[500px] overflow-hidden bg-peach-300">
            {/* <div> */}
            <Image
              src={`/assets/carousel/carousel${idx + 1}.jpg`}
              alt={`배너${idx + 1}`}
              fill
              priority={idx === 0}
              className="object-cover"
            />
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default Carousel;
