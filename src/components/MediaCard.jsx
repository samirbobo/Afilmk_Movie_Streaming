/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */
import { Card, CardMedia, Typography, Box, useTheme } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import SlideshowIcon from "@mui/icons-material/Slideshow";
import { memo } from "react";
import { UseGlobalGenres } from "../context/GenresContext";

const MediaCard = ({ item, genresType, section }) => {
  const { getGenreNames, movieGenres, tvShowGenres } = UseGlobalGenres();
  const theme = useTheme();

  if (!item) return <Box sx={{ height: "100%" }} />;

  const isMovie = genresType === 0;
  const genres = isMovie ? movieGenres : tvShowGenres;
  const genreName = getGenreNames(item.genre_ids.slice(0, 1), genres).join("");
  let today = new Date().toISOString().split("T")[0];
  const releaseDate =
    today === item?.first_air_date ? "Today" : item?.first_air_date;

  return (
    <Card
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
      <CardMedia
        component="img"
        loading="lazy"
        image={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
        alt={item.title || item.name}
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
        {genreName && (
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
        {section === "Upcoming" && item?.first_air_date && (
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
        {item.vote_average > 0 && (
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
    </Card>
  );
};

export default memo(MediaCard);
