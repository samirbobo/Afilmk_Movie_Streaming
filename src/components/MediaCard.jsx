/* eslint-disable react/prop-types */
import { Card, CardMedia, Typography, Box, useTheme } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import SlideshowIcon from "@mui/icons-material/Slideshow";
import { memo } from "react";
import { UseGlobalGenres } from "../context/GenresContext";
import { Link } from "react-router-dom";
import comingSoon from "../images/coming-soon-5.jpg";

const MediaCard = ({ item, genresType, section, from }) => {
  const { getGenreNames, movieGenres, tvShowGenres } = UseGlobalGenres();
  const theme = useTheme();

  if (!item) return <Box sx={{ height: "100%" }} />;

  const isMovie =
    genresType === undefined ? item?.media_type === "movie" : genresType === 0;
  const isMediaType = isMovie ? "movie" : "tv";
  const genres = isMovie ? movieGenres : tvShowGenres;
  const genre_ids = item.genre_ids ? item.genre_ids : [];
  const genreName = getGenreNames(genre_ids.slice(0, 1), genres).join("");
  let today = new Date().toISOString().split("T")[0];
  const time = item?.first_air_date ? item?.first_air_date : item?.release_date;
  const releaseDate = today === time ? "Today" : time;

  return (
    <Card
      title={item.name || item.title}
      sx={{
        borderRadius: 2,
        position: "relative",
        cursor: "pointer",
        height: "100%",
        "&:hover .layout": {
          transform: "scale(1)",
          opacity: 1,
          borderRadius: 0,
        },
        "&:hover .layout .icon": {
          transform: "translate(-50%,-50%) scale(1)",
          opacity: 1,
        },
      }}
    >
      <Link
        to={`/${isMediaType}/${item.name || item.title}/${item.id}`}
        state={{ from }}
      >
        <CardMedia
          component="img"
          loading="lazy"
          image={`https://image.tmdb.org/t/p/w342${item.poster_path}`}
          srcSet={`
          https://image.tmdb.org/t/p/w185${item.poster_path} 185w,
          https://image.tmdb.org/t/p/w342${item.poster_path} 342w,
          https://image.tmdb.org/t/p/w500${item.poster_path} 500w
        `}
          sizes="(max-width: 768px) 185px, (max-width: 1200px) 342px, 500px"
          alt={item.title || item.name}
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = comingSoon; // ضع مسار الصورة البديلة هنا
            e.target.srcset = ""; // عشان يمنع تحميل أي srcSet تاني فاشل
          }}
          sx={{ borderRadius: 2, height: "100%", objectFit: "cover" }}
        />

        {/* Overlay */}
        <Box
          className="layout"
          sx={{
            position: "absolute",
            inset: 0,
            background: "#0a0a0aba",
            transform: "scale(0)",
            borderRadius: "50%",
            transition: "all .3s ease",
            opacity: 0,
          }}
        >
          <Box
            className="icon"
            sx={{
              position: "absolute",
              top: "51%",
              left: "50%",
              transform: "translate(-50%, -50%) scale(0)",
              color: "#fff",
              overflow: "hidden",
              transition: "all .3s 0.1s ease",
              opacity: 0,
            }}
          >
            <SlideshowIcon sx={{ fontSize: 50 }} />
          </Box>
        </Box>

        {/* title of media type */}
        <Box
          sx={{
            position: "absolute",
            bottom: 0,
            right: "50%",
            transform: "translateX(50%)",
            background: "linear-gradient(180deg, #1d1d1d00, #000 70%)",
            padding: "40px 10px 10px",
            width: "100%",
            textAlign: "center",
          }}
        >
          <Typography
            variant="h6"
            sx={{
              fontSize: "14px",
              textAlign: "center",
              color: "#fff",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              overflow: "hidden",
            }}
          >
            {item.title || item.name}
          </Typography>
        </Box>

        {/* rate and type of movie or tv */}
        <Box
          sx={{
            position: "absolute",
            top: "10px",
            right: "10px",
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-end",
            gap: "0.25rem",
            width: "calc(100% - 20px)",
          }}
        >
          {genreName && section !== "MovieType" && (
            <Typography
              sx={{
                color: theme.palette.text.primary,
                backgroundColor: theme.palette.primary.main,
                padding: "5px 8px",
                borderRadius: "50px",
                fontSize: "13px",
                fontWeight: 800,
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
                overflow: "hidden",
                width: "100%",
                maxWidth: "fit-content",
              }}
            >
              {genreName}
            </Typography>
          )}
          {item?.media_type && section !== "pageDetails" && (
            <Typography
              variant="body2"
              sx={{
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
          {(section === "Upcoming" || section === "LatestAdditions") &&
            time && (
              <Typography
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 0.25,
                  color: theme.palette.text.primary,
                  backgroundColor: theme.palette.primary.main,
                  padding: "3px 6px",
                  borderRadius: "50px",
                  fontSize: "12px",
                  fontWeight: 500,
                }}
              >
                {releaseDate}
              </Typography>
            )}
          {item.vote_average > 0 && section !== "Upcoming" && (
            <Typography
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 0.25,
                color: theme.palette.text.primary,
                backgroundColor: theme.palette.primary.main,
                padding: "3px 6px",
                borderRadius: "50px",
                fontSize: "12px",
                fontWeight: 500,
              }}
            >
              {item.vote_average.toFixed(1)}
              <StarIcon sx={{ fontSize: 14 }} />
            </Typography>
          )}
          {/* Popular ممكن اضيف عدد المشاهدات لكل فيلم او مسلسل في كل الاقسام او قسم ال

                    ديه الفانكشن الي هترجع ليا عدد المشاهدات بشكل تقريبي 
                    const getPopularityViews = (popularity, maxPopularity) => {
                      return Math.floor(popularity / 1000)
                    };

                    <Typography
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 0.25,
                        color: theme.palette.text.primary,
                        backgroundColor: theme.palette.primary.main,
                        padding: "3px 6px",
                        borderRadius: "50px",
                        fontSize: "12px",
                        fontWeight: 500,
                      }}
                    >
                      +1K views
                    </Typography> 
                  */}
        </Box>
      </Link>
    </Card>
  );
};

export default memo(MediaCard);
