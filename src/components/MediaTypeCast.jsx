/* eslint-disable react/prop-types */
import { Box, Stack, Typography, useTheme } from "@mui/material";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

// import required modules
import { Navigation } from "swiper/modules";
import SliderArrowIcons from "./SliderArrowIcons";
import axios from "axios";
import { API_KEY, BASE_URL } from "../baseUrl";
import { useState } from "react";
import CastSection from "./CastSection";

const MediaTypeCast = ({ data }) => {
  const [selectedPerson, setSelectedPerson] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const theme = useTheme();
  const cast = data?.credits?.cast || [];

  const handleOpenModal = async (id) => {
    const response = await axios.get(
      `${BASE_URL}/person/${id}?api_key=${API_KEY}&language=en-US`
    );

    const data = await response.data;
    setSelectedPerson(data);
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
    setSelectedPerson(null);
  };

  if (cast.length < 1) return;

  return (
    <Box
      component={"article"}
      sx={{
        background: "#1A1A1A",
        p: { xs: "24px", md: "40px" },
        borderRadius: "10px",
        border: "1px solid #262626",
        overflow: "hidden",
      }}
    >
      {/* article Header */}
      <Stack
        sx={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "30px",
          mb: { xs: "1rem", md: "20px" },
        }}
      >
        <Typography
          variant="h3"
          sx={{
            color: theme.palette.text.secondary,
            fontSize: { xs: 16, md: 18 },
          }}
        >
          Cast
        </Typography>

        {/* arrow Icons */}
        <SliderArrowIcons prev={"custom-prev"} next={"custom-next"} />
      </Stack>

      {/* Swiper Data */}
      <Box>
        <Swiper
          modules={[Navigation]}
          navigation={{
            nextEl: ".custom-next", // هعمل شكل جديد للسهم الايمن والكلاس هو الي بيربط الشكل دا بالوجيك الخاص بالسوابير
            prevEl: ".custom-prev", // هعمل شكل جديد للسهم الايسر والكلاس هو الي بيربط الشكل دا بالوجيك الخاص بالسوابير
          }}
          spaceBetween={10} // المسافة بين الصور
          slidesPerView={8} // عدد الصور المعروضه في كل مرة
          slidesPerGroup={4} // عند التنقل بالسهم يتحرك بـ 1 دفعة واحدة
          breakpoints={{
            1024: { slidesPerView: 8, slidesPerGroup: 8 },
            768: { slidesPerView: 6, slidesPerGroup: 6 },
            480: { slidesPerView: 4, slidesPerGroup: 4 },
            0: { slidesPerView: 3, slidesPerGroup: 3 },
          }}
        >
          {cast.map((actor) => {
            if (actor.profile_path) {
              return (
                <SwiperSlide
                  key={actor.id}
                  style={{
                    borderRadius: "10px",
                    aspectRatio: "1",
                    overflow: "hidden",
                    cursor: "pointer",
                  }}
                  onClick={() => handleOpenModal(actor.id)}
                >
                  <img
                    src={`https://image.tmdb.org/t/p/w200${actor.profile_path}`}
                    alt={actor.name}
                  />
                </SwiperSlide>
              );
            }
          })}
        </Swiper>
      </Box>

      <CastSection
        showModal={showModal}
        selectedPerson={selectedPerson}
        handleClose={handleClose}
      />
    </Box>
  );
};

export default MediaTypeCast;
