import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "./style.scss";
import { Autoplay, Navigation } from "swiper";
import MenuIcon from "@mui/icons-material/Menu";

function Slider({ handle, title }) {
  const imgdata = [
    "https://i0.wp.com/hypefun.vn/wp-content/uploads/2022/05/Screenshot-2022-05-21-at-4.06.59-PM.webp?resize=1160%2C680&ssl=1",
    "https://cdn-amz.woka.io/images/I/81HP3qJzYhL.jpg",
    "https://assets.entrepreneur.com/content/3x2/2000/20141205191530-married-entrepreneur-lots-shoes-fill.jpeg",
    "https://wallpapercave.com/wp/wp10343222.jpg",
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
