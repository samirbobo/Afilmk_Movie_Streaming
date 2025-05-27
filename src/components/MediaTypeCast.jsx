/* eslint-disable react/prop-types */
import { Box, Stack, Typography, useMediaQuery, useTheme } from "@mui/material";
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
import person from "../images/person.png";

const MediaTypeCast = ({ data }) => {
  const [selectedPerson, setSelectedPerson] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const theme = useTheme();
  const cast = data?.credits?.cast || [];
  const isLg = useMediaQuery("(min-width:1024px)");
  const isMd = useMediaQuery("(min-width:768px) and (max-width:1023px)");
  const isSm = useMediaQuery("(min-width:480px) and (max-width:767px)");
  const isXsSm = useMediaQuery("(min-width:0px) and (max-width:479px)");
  let shouldShowArrows = false;

  if (isLg && cast.length > 8) {
    shouldShowArrows = true;
  } else if (isMd && cast.length > 6) {
    shouldShowArrows = true;
  } else if (isSm && cast.length > 4) {
    shouldShowArrows = true;
  } else if (isXsSm && cast.length > 3) {
    shouldShowArrows = true;
  }

  const handleOpenModal = async (id) => {
    setShowModal(true);
    setLoading(true);
    const response = await axios.get(
      `${BASE_URL}/person/${id}?api_key=${API_KEY}&language=en-US`
    );

    const data = await response.data;
    setSelectedPerson(data);
    setLoading(false);
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
        background: theme.palette.background.paper,
        boxShadow:
          theme.palette.mode === "light"
            ? "0 2px 8px rgba(0, 0, 0, 0.12)"
            : "0 2px 10px rgba(255, 255, 255, 0.05)",
        p: { xs: "24px", md: "40px" },
        borderRadius: "10px",
        border:
          theme.palette.mode === "dark"
            ? "1px solid #404040"
            : "1px solid #e5e5e5",
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
            color: theme.palette.text.primary,
            fontSize: { xs: 16, md: 18 },
          }}
        >
          Cast
        </Typography>

        {/* arrow Icons */}
        {shouldShowArrows && (
          <SliderArrowIcons prev={"custom-prev"} next={"custom-next"} />
        )}
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
                  src={
                    actor?.profile_path
                      ? `https://image.tmdb.org/t/p/original${actor.profile_path}`
                      : person
                  }
                  alt={actor.name}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = person; // صورة بديلة عند فشل التحميل
                  }}
                />
              </SwiperSlide>
            );
          })}
        </Swiper>
      </Box>

      <CastSection
        showModal={showModal}
        selectedPerson={selectedPerson}
        handleClose={handleClose}
        loading={loading}
      />
    </Box>
  );
};

export default MediaTypeCast;
