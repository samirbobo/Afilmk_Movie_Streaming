/* eslint-disable react/prop-types */
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

// import required modules
import { Navigation } from "swiper/modules";
import { Box, Card, CardMedia, Typography, useTheme } from "@mui/material";
import { UseGlobalGenres } from "../context/GenresContext";

const MediaCarousel = ({ data, type }) => {
  const { movieGenres, tvShowGenres, getGenreNames } = UseGlobalGenres();
  const theme = useTheme();

  return (
    <Swiper
      navigation // لعرض أزرار التنقل
      modules={[Navigation]}
      spaceBetween={10} // المسافة بين الصور
      slidesPerView={5} // عدد الصور المعروضه في كل مرة
      slidesPerGroup={1} // عند التنقل بالسهم يتحرك بـ 5 دفعة واحدة
      breakpoints={{
        1024: { slidesPerView: 5, slidesPerGroup: 1 },
        768: { slidesPerView: 4, slidesPerGroup: 1 },
        480: { slidesPerView: 3, slidesPerGroup: 1 },
        0: { slidesPerView: 2, slidesPerGroup: 1 },
      }}
    >
      {data.map((item) => {
        const isMediaType = item?.media_type ? item.media_type : type;
        const isMovie = isMediaType === "movie";
        const genres = isMovie ? movieGenres : tvShowGenres;
        if (!genres || genres.length < 1) return null;
        const genreNames = getGenreNames(item?.genre_ids, genres);

        return (
          <SwiperSlide
            key={item.id}
            style={{
              borderRadius: "8px",
            }}
          >
            <Card
              title={item.name || item.title}
              sx={{
                borderRadius: 2,
                position: "relative",
                cursor: "pointer",
                ":hover .genres": { opacity: 1, transform: "translateY(0px)" },
              }}
            >
              <CardMedia
                component="img"
                loading="lazy"
                image={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                alt={item.title || "poster path"}
                sx={{
                  borderRadius: 2,
                  transition: "transform 0.3s",
                  "&:hover": {
                    transform: "scale(1.1)",
                  },
                }}
              />
              <Box
                sx={{
                  position: "absolute",
                  bottom: 0,
                  right: "50%",
                  transform: " translateX(50%)",
                  background: "linear-gradient(180deg, #1d1d1d00, #000 70%)",
                  padding: "70px 10px 10px",
                  width: "100%",
                }}
              >
                <Typography
                  variant="h6"
                  sx={{
                    fontSize: "14px",
                    textAlign: "center",
                    color: "#fff",
                    textOverflow: "ellipsis",
                    textWrapMode: "nowrap",
                    overflow: "hidden",
                  }}
                >
                  {item.name || item.title}
                </Typography>
              </Box>

              <Box
                className="genres"
                sx={{
                  width: "100%",
                  position: "absolute",
                  bottom: "20%",
                  transform: "translateY(130px)",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  flexWrap: "wrap",
                  opacity: 0,
                  transition: "transform 0.3s",
                }}
              >
                {genreNames.map((name) => (
                  <Typography
                    key={name}
                    title={name}
                    variant="body2"
                    sx={{
                      color: theme.palette.text.primary,
                      backgroundColor: theme.palette.primary.main,
                      padding: "5px 8px",
                      borderRadius: "50px",
                      margin: "1px 3px",
                      fontSize: "12px",
                      fontWeight: 800,
                      textOverflow: "ellipsis",
                      textWrapMode: "nowrap",
                      overflow: "hidden",
                    }}
                  >
                    {name}
                  </Typography>
                ))}
              </Box>

              {item?.media_type && (
                <Typography
                  variant="body2"
                  sx={{
                    position: "absolute",
                    top: 10,
                    right: 10,
                    color: theme.palette.text.primary,
                    backgroundColor: theme.palette.primary.main,
                    padding: "5px 8px",
                    borderRadius: "50px",
                    fontSize: "13px",
                    fontWeight: 800,
                    textOverflow: "ellipsis",
                    textWrapMode: "nowrap",
                    overflow: "hidden",
                  }}
                >
                  {item.media_type}
                </Typography>
              )}
            </Card>
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
};

export default MediaCarousel;
