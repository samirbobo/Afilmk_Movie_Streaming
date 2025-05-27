/* eslint-disable react/prop-types */
import {
  Box,
  Button,
  Rating,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import parse from "html-react-parser";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

// import required modules
import { Navigation } from "swiper/modules";

import SliderArrowIcons from "./SliderArrowIcons";
import StarRoundedIcon from "@mui/icons-material/StarRounded";
import ContentReviewDialog from "./ContentReviewDialog";
import { useState } from "react";

const MediaTypeReviews = ({ data }) => {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [scroll, setScroll] = useState("paper");
  const [selectedReview, setSelectedReview] = useState(null);
  const reviews = data?.reviews?.results || [];
  const isLg = useMediaQuery("(min-width:1024px)");
  const isMd = useMediaQuery("(min-width:768px) and (max-width:1023px)");
  const isSm = useMediaQuery("(min-width:480px) and (max-width:767px)");
  const isXsSm = useMediaQuery("(min-width:0px) and (max-width:479px)");
  let shouldShowArrows = false;

  if (isLg && reviews.length > 2) {
    shouldShowArrows = true;
  } else if (isMd && reviews.length > 2) {
    shouldShowArrows = true;
  } else if (isSm && reviews.length > 2) {
    shouldShowArrows = true;
  } else if (isXsSm && reviews.length > 2) {
    shouldShowArrows = true;
  }

  const handleClickOpen = (scrollType, reviewContent) => () => {
    setSelectedReview(reviewContent);
    setOpen(true);
    setScroll(scrollType);
  };
  const handleClose = () => {
    setOpen(false);
  };

  if (reviews.length < 1) return;

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
          Reviews
        </Typography>

        {/* arrow Icons */}
        {shouldShowArrows && (
          <SliderArrowIcons
            prev={"custom-prev-review"}
            next={"custom-next-review"}
          />
        )}
      </Stack>

      {/* Swiper Data */}
      <Box>
        <Swiper
          navigation={{
            nextEl: ".custom-next-review", // هعمل شكل جديد للسهم الايمن والكلاس هو الي بيربط الشكل دا بالوجيك الخاص بالسوابير
            prevEl: ".custom-prev-review", // هعمل شكل جديد للسهم الايسر والكلاس هو الي بيربط الشكل دا بالوجيك الخاص بالسوابير
          }}
          modules={[Navigation]}
          allowTouchMove={false}
          spaceBetween={16} // المسافة بين الصور
          slidesPerView={2} // عدد الصور المعروضه في كل مرة
          slidesPerGroup={2} // عند التنقل بالسهم يتحرك بـ 2 دفعة واحدة
          breakpoints={{
            1024: { slidesPerView: 2, slidesPerGroup: 2 },
            0: { slidesPerView: 1, slidesPerGroup: 1 },
          }}
        >
          {reviews.map((review) => {
            const content =
              review.content.slice(0, 400) +
              (review.content.length > 400 ? "..." : "");

            const rating = review?.author_details?.rating
              ? Math.min(review.author_details.rating / 2, 5)
              : 0;

            return (
              <SwiperSlide
                key={review.id}
                style={{
                  borderRadius: "12px",
                  background: theme.palette.background.default,
                  border:
                    theme.palette.mode === "dark"
                      ? "1px solid #404040"
                      : "1px solid #e5e5e5",
                  overflow: "hidden",
                  boxSizing: "border-box",
                }}
              >
                <Box
                  sx={{
                    padding: "24px",
                    borderRadius: "12px",
                  }}
                >
                  {/* Header of Card */}
                  <Stack
                    sx={{
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "space-between",
                      gap: "10px",
                      flexWrap: "wrap",
                      mb: "16px",
                    }}
                  >
                    <Typography
                      variant="h4"
                      title={review.author}
                      sx={{
                        fontSize: 18,
                        color: theme.palette.text.primary,
                        maxWidth: "155px",
                        minWidth: "100px",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        textWrap: "nowrap",
                        flex: 1,
                        textAlign: "left",
                      }}
                    >
                      {review.author}
                    </Typography>

                    {/* Rating Of Movie */}
                    <Stack
                      sx={{
                        flexDirection: "row",
                        alignItems: "center",
                        gap: 0.5,
                        p: "4px 8px",
                        borderRadius: "50px",
                        background: theme.palette.background.paper,
                        border:
                          theme.palette.mode === "dark"
                            ? "1px solid #404040"
                            : "1px solid #e5e5e5",
                      }}
                    >
                      <Rating
                        name="half-rating-read"
                        defaultValue={rating}
                        precision={0.5}
                        readOnly
                        emptyIcon={<StarRoundedIcon fontSize="inherit" />}
                        sx={{
                          "& .MuiRating-iconFilled": {
                            color: "#ffac00", // لون النجوم المملوءة
                          },
                          "& .MuiRating-iconEmpty": {
                            color: theme.palette.text.secondary, // لون النجوم الفارغة (اختياري)
                          },
                        }}
                      />

                      <Typography
                        variant="body1"
                        sx={{
                          color: theme.palette.text.secondary,
                          fontSize: "14px",
                        }}
                      >
                        {rating}
                      </Typography>
                    </Stack>
                  </Stack>

                  {/* content of Review */}
                  <Typography
                    variant="body1"
                    sx={{
                      fontSize: 16,
                      color: theme.palette.text.secondary,
                      textAlign: "start",
                      display: "-webkit-box",
                      WebkitLineClamp: 5, // ✅ عدد السطور
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      mb: "30px",
                    }}
                  >
                    {parse(content)}
                  </Typography>

                  {review.content.length > 400 && (
                    <Button
                      size="small"
                      variant="contained"
                      onClick={handleClickOpen("paper", review)}
                      sx={{
                        background: theme.palette.custom.favBackLight,
                        color: theme.palette.custom.white,
                        transition: "0.2s linear",
                        "&:hover": {
                          background: theme.palette.custom.favBackDark,
                        },
                      }}
                    >
                      Show more
                    </Button>
                  )}
                </Box>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </Box>

      {/* Dialog */}
      {selectedReview && (
        <ContentReviewDialog
          open={open}
          scroll={scroll}
          handleClose={handleClose}
          review={selectedReview}
        />
      )}
    </Box>
  );
};

export default MediaTypeReviews;
