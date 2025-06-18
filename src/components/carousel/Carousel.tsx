// components/Carousel.tsx
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
      className="w-full h-64" // Tailwind로 크기 조절
    >
      <SwiperSlide>
        <img
          src="/images/banner1.jpg"
          alt="배너1"
          className="w-full h-full object-cover rounded-lg"
        />
      </SwiperSlide>
      <SwiperSlide>
        <img
          src="/images/banner2.jpg"
          alt="배너2"
          className="w-full h-full object-cover rounded-lg"
        />
      </SwiperSlide>
      <SwiperSlide>
        <img
          src="/images/banner3.jpg"
          alt="배너3"
          className="w-full h-full object-cover rounded-lg"
        />
      </SwiperSlide>
    </Swiper>
  );
};

export default Carousel;
