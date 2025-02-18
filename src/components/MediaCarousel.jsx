/* eslint-disable react/prop-types */
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

// import required modules
import { Navigation } from "swiper/modules";
import { Card, CardMedia } from "@mui/material";

const MediaCarousel = ({ data }) => {
  console.log(data.data.results);
  return (
    <Swiper
      navigation // لعرض أزرار التنقل
      modules={[Navigation]}
      spaceBetween={10} // المسافة بين الصور
      slidesPerView={5} // عدد الصور المعروضه في كل مرة
      slidesPerGroup={5} // عند التنقل بالسهم يتحرك بـ 5 دفعة واحدة
      breakpoints={{
        1024: { slidesPerView: 5, slidesPerGroup: 1 },
        768: { slidesPerView: 4, slidesPerGroup: 1 },
        480: { slidesPerView: 3, slidesPerGroup: 1 },
        0: { slidesPerView: 2, slidesPerGroup: 1 },
      }}
    >
      {data.data.results.map((item) => (
        <SwiperSlide
          key={item.id}
          style={{
            borderRadius: "8px",
          }}
        >
          <Card sx={{ borderRadius: 2 }}>
            <CardMedia
              component="img"
              image={`https://image.tmdb.org/t/p/w500/${item.poster_path}`}
              alt={item.title || "poster path"}
              sx={{
                borderRadius: 2,
                transition: "transform 0.3s",
                "&:hover": {
                  transform: "scale(1.1)",
                },
              }}
            />
          </Card>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default MediaCarousel;
