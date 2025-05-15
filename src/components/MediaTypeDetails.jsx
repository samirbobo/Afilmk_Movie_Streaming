/* eslint-disable react/prop-types */
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import TranslateIcon from "@mui/icons-material/Translate";
import StarOutlineRoundedIcon from "@mui/icons-material/StarOutlineRounded";
import GridViewIcon from "@mui/icons-material/GridView";
import RecentActorsIcon from "@mui/icons-material/RecentActors";
import MusicNoteOutlinedIcon from "@mui/icons-material/MusicNoteOutlined";
import { Box, Stack, Typography, useTheme } from "@mui/material";

const MediaTypeDetails = ({ data }) => {
  const theme = useTheme();
  const director = data?.credits?.crew.find((c) => c.job === "Director");
  const composer = data?.credits?.crew.find(
    (person) => person.job === "Original Music Composer"
  );

  return (
    <Box
      component={"aside"}
      sx={{
        flexBasis: "calc(35% - 10px)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "24px",
        background: "#1A1A1A",
        p: "40px",
        borderRadius: "10px",
        border: "1px solid #262626",
      }}
    >
      {/* Year */}
      <Box width={"100%"}>
        <Stack flexDirection={"row"} alignItems={"start"} gap={0.5} mb={1.25}>
          <CalendarTodayOutlinedIcon
            sx={{ color: theme.palette.text.secondary }}
            fontSize="small"
          />
          <Typography
            variant="h4"
            sx={{
              color: theme.palette.text.secondary,
              fontSize: "16px",
            }}
          >
            Released Year
          </Typography>
        </Stack>
        <Typography
          variant="body1"
          sx={{
            color: theme.palette.text.primary,
            p: "6px 12px",
            borderRadius: "50px",
            background: "#141414",
            border: "1px solid #262626",
            width: "fit-content",
          }}
        >
          {data?.release_date}
        </Typography>
      </Box>

      {/* Languages */}
      <Box width={"100%"}>
        <Stack flexDirection={"row"} alignItems={"start"} gap={0.5} mb={1.25}>
          <TranslateIcon
            sx={{ color: theme.palette.text.secondary }}
            fontSize="small"
          />
          <Typography
            variant="h4"
            sx={{
              color: theme.palette.text.secondary,
              fontSize: "16px",
            }}
          >
            Available Languages
          </Typography>
        </Stack>
        <Stack
          flexDirection={"row"}
          alignItems={"center"}
          gap={1.25}
          flexWrap={"wrap"}
        >
          {data?.spoken_languages.map((language) => (
            <Typography
              key={language.english_name}
              variant="body1"
              sx={{
                color: theme.palette.text.primary,
                fontSize: "14px",
                py: "6px",
                px: "12px",
                borderRadius: "6px",
                background: "#141414",
                border: "1px solid #262626",
                width: "fit-content",
              }}
            >
              {language.english_name}
            </Typography>
          ))}
        </Stack>
      </Box>

      {/* Rating */}
      <Box width={"100%"}>
        <Stack flexDirection={"row"} alignItems={"start"} gap={0.5} mb={1.25}>
          <StarOutlineRoundedIcon
            sx={{ color: theme.palette.text.secondary }}
            fontSize="small"
          />
          <Typography
            variant="h4"
            sx={{
              color: theme.palette.text.secondary,
              fontSize: "16px",
            }}
          >
            Ratings
          </Typography>
        </Stack>
        <Typography
          variant="body1"
          sx={{
            color: theme.palette.text.primary,
            p: "6px 12px",
            borderRadius: "50px",
            background: "#141414",
            border: "1px solid #262626",
            width: "fit-content",
          }}
        >
          {data?.vote_average.toFixed(1)}
        </Typography>
      </Box>

      {/* Genres */}
      <Box width={"100%"}>
        <Stack flexDirection={"row"} alignItems={"start"} gap={0.5} mb={1.25}>
          <GridViewIcon
            sx={{ color: theme.palette.text.secondary }}
            fontSize="small"
          />
          <Typography
            variant="h4"
            sx={{
              color: theme.palette.text.secondary,
              fontSize: "16px",
            }}
          >
            Genres
          </Typography>
        </Stack>
        <Stack
          flexDirection={"row"}
          alignItems={"center"}
          gap={1.25}
          flexWrap={"wrap"}
        >
          {data?.genres.map((genre) => (
            <Typography
              key={genre.name}
              variant="body1"
              sx={{
                color: theme.palette.text.primary,
                fontSize: "14px",
                py: "6px",
                px: "12px",
                borderRadius: "6px",
                background: "#141414",
                border: "1px solid #262626",
                width: "fit-content",
              }}
            >
              {genre.name}
            </Typography>
          ))}
        </Stack>
      </Box>

      {/* Director */}
      {director && (
        <Box width={"100%"}>
          <Stack flexDirection={"row"} alignItems={"start"} gap={0.5} mb={1.25}>
            <RecentActorsIcon
              sx={{ color: theme.palette.text.secondary }}
              fontSize="small"
            />
            <Typography
              variant="h4"
              sx={{
                color: theme.palette.text.secondary,
                fontSize: "16px",
              }}
            >
              Director
            </Typography>
          </Stack>
          <Stack
            flexDirection={"row"}
            alignItems={"center"}
            gap={2}
            flexWrap={"wrap"}
            sx={{
              p: "12px",
              borderRadius: "8px",
              background: "#141414",
              border: "1px solid #262626",
            }}
          >
            <img
              loading="lazy"
              src={`https://image.tmdb.org/t/p/w500${director.profile_path}`}
              alt={`${director.name || "Director Name"}`}
              style={{
                borderRadius: "6px",
                width: "50px",
                height: "50px",
                objectFit: "cover",
              }}
            />
            <Typography
              variant="body1"
              sx={{
                color: theme.palette.text.primary,
                fontSize: "16px",
                flex: 1,
              }}
            >
              {director.name}
            </Typography>
          </Stack>
        </Box>
      )}

      {/* Composer Music */}
      {composer && (
        <Box width={"100%"}>
          <Stack flexDirection={"row"} alignItems={"start"} gap={0.5} mb={1.25}>
            <MusicNoteOutlinedIcon
              sx={{ color: theme.palette.text.secondary }}
              fontSize="small"
            />
            <Typography
              variant="h4"
              sx={{
                color: theme.palette.text.secondary,
                fontSize: "16px",
              }}
            >
              Music
            </Typography>
          </Stack>
          <Stack
            flexDirection={"row"}
            alignItems={"center"}
            gap={2}
            flexWrap={"wrap"}
            sx={{
              p: "12px",
              borderRadius: "8px",
              background: "#141414",
              border: "1px solid #262626",
            }}
          >
            <img
              loading="lazy"
              src={`https://image.tmdb.org/t/p/w500${composer.profile_path}`}
              alt={`${composer.name || "Director Name"}`}
              style={{
                borderRadius: "6px",
                width: "50px",
                height: "50px",
                objectFit: "cover",
              }}
            />
            <Typography
              variant="body1"
              sx={{
                color: theme.palette.text.primary,
                fontSize: "16px",
                flex: 1,
              }}
            >
              {composer.name}
            </Typography>
          </Stack>
        </Box>
      )}
    </Box>
  );
};

export default MediaTypeDetails;
