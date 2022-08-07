import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/thumbs";
import "./styles.scss";
import { FreeMode, Thumbs } from "swiper";

export default function ThumbGallery({ images }) {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  console.log(images);
  return images.length > 0 ? (
    <div className="thumb-gallery">
      <Swiper
        style={{
          "--swiper-navigation-color": "#fff",
          "--swiper-pagination-color": "#fff",
        }}
        spaceBetween={10}
        thumbs={{
          swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
        }}
        modules={[FreeMode, Thumbs]}
        className="mySwiper2"
      >
        {images?.map((item) => {
          return (
            <SwiperSlide key={item.mahinh}>
              <img src={`${item.duongdan}`} alt={item.mahinh} />
            </SwiperSlide>
          );
        })}
      </Swiper>
      <Swiper
        onSwiper={setThumbsSwiper}
        spaceBetween={10}
        slidesPerView={4}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Thumbs]}
        className="mySwiper"
      >
        {images?.map((item) => {
          return (
            <SwiperSlide>
              <img src={`${item.duongdan}`} alt={item.mahinh} />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  ) : (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <p>Không có dữ liệu hình ảnh</p>
    </div>
  );
}
