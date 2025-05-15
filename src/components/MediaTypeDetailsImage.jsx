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

const MediaTypeDetailsImage = ({ data }) => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        width: { xs: "90vw", sm: "70vw" },
        margin: "0 auto",
        position: "relative",
        borderRadius: "12px",
        overflow: "hidden",
        mb: "40px",
      }}
    >
      <img
        loading="lazy"
        src={`https://image.tmdb.org/t/p/original${data.backdrop_path}`}
        alt={`Backdrop for ${data.title || "Movie"}`}
        style={{
          borderRadius: "12px",
          width: "100%",
          height: "100%",
          minHeight: 400,
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
            fontSize: { xs: "24px", sm: "30px" },
            fontWeight: "bold",
            textAlign: "center",
            color: "#fff",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            overflow: "hidden",
          }}
        >
          {data.title}
        </Typography>

        <Typography
          variant="body1"
          sx={{
            fontSize: "16px",
            color: theme.palette.text.secondary,
            display: { xs: "none", sm: "block" },
            maxWidth: "750px",
            margin: "0 auto",
          }}
        >
          {data.tagline}
        </Typography>

        <Stack
          sx={{
            flexDirection: "row",
            justifyContent: "center",
            gap: 2.5,
            alignItems: "center",
            mt: { xs: 1, sm: 1.5 },
          }}
        >
          <Button
            variant="contained"
            startIcon={<PlayArrowRoundedIcon />}
            sx={{
              textTransform: "capitalize",
              "& .MuiButton-startIcon": {
                mr: 0.5,
              },
            }}
          >
            Play Now
          </Button>

          <Box sx={{ background: "#0F0F0F", borderRadius: "8px" }}>
            <Checkbox
              icon={
                <ThumbUpOffAltOutlinedIcon
                  fontSize="small"
                  sx={{ color: "#fff" }}
                />
              }
              checkedIcon={
                <ThumbUpOffAltRoundedIcon
                  sx={{ color: theme.palette.primary }}
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
    </Box>
  );
};

export default MediaTypeDetailsImage;
