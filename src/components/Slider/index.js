import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "./style.scss";
import { Autoplay, Navigation } from "swiper";
import MenuIcon from "@mui/icons-material/Menu";

function Slider({ handle, title }) {
  const imgdata = [
    "http://danangcanho.com.vn/wp-content/uploads/2018/06/Forest-City-banner.jpg",
    "https://aquacityvn.vn/wp-content/uploads/2015/01/banner-aqua-city-2.jpg",
    "https://drh.vn/FileUpload/Images/shutterstock_711277162.jpg",
    "https://upload.wikimedia.org/wikipedia/commons/5/5f/New_York_City_skyline_banner.jpg",
  ];

  return (
    <>
      <Swiper
        slidesPerView={1}
        loop={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        navigation={true}
        modules={[Autoplay, Navigation]}
        className="mySwiper"
      >
        <div className="nav-toggle" onClick={handle}>
          <MenuIcon
            sx={{
              fontSize: 40,
              padding: ".5rem",
              transition: "all .3s",
            }}
            className="nav-button"
          />
        </div>
        <h1 className="slider-title">{title}</h1>
        {imgdata.map((item, key) => (
          <SwiperSlide
            key={key}
            style={{
              backgroundImage: `url(${item})`,
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
              boxShadow: "inset 0 0 0 2000px #0000002B",
            }}
          ></SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}

export default Slider;
