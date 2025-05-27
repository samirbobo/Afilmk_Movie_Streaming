/* eslint-disable react/prop-types */
import {
  Box,
  Button,
  Checkbox,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import PlayArrowRoundedIcon from "@mui/icons-material/PlayArrowRounded";
import ThumbUpOffAltOutlinedIcon from "@mui/icons-material/ThumbUpOffAltOutlined";
import ThumbUpOffAltRoundedIcon from "@mui/icons-material/ThumbUpOffAltRounded";
import { useState } from "react";
import TrailerDialog from "./TrailerDialog";
import comingSoon from "../images/coming-soon-3.jpg";

const MediaTypeDetailsImage = ({ data }) => {
  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const LOCAL_STORAGE_KEY = `liked-movie-${data.id}`;
  const [checked, setChecked] = useState(
    localStorage.getItem(LOCAL_STORAGE_KEY)
      ? JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
      : false
  );

  const trailer = data.videos?.results?.find(
    (video) => video.type === "Trailer" && video.site === "YouTube"
  );

  const teaser = data.videos?.results?.find(
    (video) => video.type === "Teaser" && video.site === "YouTube"
  );

  const videoToShow = trailer || teaser;

  const handleChange = (event) => {
    const newValue = event.target.checked;
    setChecked(newValue);

    localStorage.setItem(LOCAL_STORAGE_KEY, newValue);
  };

  return (
    <Box
      sx={{
        width: { xs: "85vw", sm: "70vw" },
        margin: "0 auto",
        position: "relative",
        borderRadius: "12px",
        overflow: "hidden",
        mb: "40px",
      }}
    >
      <img
        loading="lazy"
        src={
          data.backdrop_path
            ? `https://image.tmdb.org/t/p/original${data.backdrop_path}`
            : data.poster_path
            ? `https://image.tmdb.org/t/p/original${data.poster_path}`
            : comingSoon // صورة بديلة محلياً
        }
        alt={`Backdrop for ${data.title || "Movie"}`}
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = comingSoon; // صورة بديلة عند فشل التحميل
        }}
        style={{
          borderRadius: "12px",
          width: "100%",
          height: "100%",
          aspectRatio: 4 / 2,
          objectFit: "cover",
          display: "block",
        }}
      />

      {/* Overlay */}
      <Box
        sx={{
          position: "absolute",
          bottom: 0,
          left: 0,
          width: "100%",
          height: "100%",
          background:
            "linear-gradient(to bottom, rgba(20, 20, 20, 0) 0%, rgba(20, 20, 20, 0.8) 100%)",
          zIndex: 1,
        }}
      />

      {/* Title and tagline of movie and buttons */}
      <Box
        sx={{
          position: "absolute",
          bottom: 0,
          right: "50%",
          transform: "translateX(50%)",
          padding: "10px 15px",
          width: "100%",
          textAlign: "center",
          zIndex: 1,
        }}
      >
        <Typography
          variant="h3"
          sx={{
            fontSize: { xs: "20px", md: "30px" },
            fontWeight: "bold",
            textAlign: "center",
            color: "#fff",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            overflow: "hidden",
            mb: { md: 0.25 },
          }}
        >
          {data?.title || data?.name}
        </Typography>

        {data?.tagline && (
          <Typography
            variant="body1"
            sx={{
              fontSize: "16px",
              color: "#B3B3B3",
              display: { xs: "none", md: "block" },
              maxWidth: "750px",
              margin: "0 auto",
            }}
          >
            {data.tagline}
          </Typography>
        )}

        <Stack
          sx={{
            flexDirection: "row",
            justifyContent: "center",
            gap: 2.5,
            alignItems: "center",
            mt: { xs: 1, md: 1.5 },
          }}
        >
          {videoToShow?.key && (
            <Button
              variant="contained"
              onClick={() => setOpen(true)}
              startIcon={<PlayArrowRoundedIcon />}
              sx={{
                background: theme.palette.custom.favBackLight,
                color: "custom.white",
                textTransform: "capitalize",
                transition: "0.2s linear",
                "&:hover": {
                  background: theme.palette.custom.favBackDark,
                },
                "& .MuiButton-startIcon": {
                  mr: 0.5,
                },
              }}
            >
              Watch Trailer
            </Button>
          )}

          <Box sx={{ background: "#0F0F0F", borderRadius: "8px" }}>
            <Checkbox
              checked={checked}
              onChange={handleChange}
              icon={
                <ThumbUpOffAltOutlinedIcon
                  fontSize="small"
                  sx={{ color: "#fff" }}
                />
              }
              checkedIcon={
                <ThumbUpOffAltRoundedIcon
                  sx={{ color: theme.palette.custom.favBackLight }}
                  fontSize="small"
                />
              }
              sx={{
                p: "8px",
              }}
            />
          </Box>
        </Stack>
      </Box>

      <TrailerDialog
        trailerKey={trailer?.key}
        open={open}
        onClose={() => setOpen(false)}
      />
    </Box>
  );
};

export default MediaTypeDetailsImage;
