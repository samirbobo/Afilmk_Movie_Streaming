import { useTheme } from "@emotion/react";
import { Box, Stack, Typography } from "@mui/material";
import MediaTabs from "../../../components/MediaTabs";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { API_KEY, BASE_URL } from "../../../baseUrl";
import MediaList from "../../../components/MediaList";

const Popular = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const [tabIndex, setTabIndex] = useState(0);

  const handleChange = (event, newIndex) => {
    setTabIndex(newIndex);
  };

  const {
    data: popularMovies,
    isLoading: isMovieLoading,
    isError: isMovieError,
  } = useQuery({
    queryKey: ["popular-movies"],
    queryFn: () => axios.get(`${BASE_URL}/movie/popular?api_key=${API_KEY}`),
    select: (data) => data.data.results,
  });

  const {
    data: popularTvShows,
    isLoading: isTvShowsLoading,
    isError: isTvShowsError,
  } = useQuery({
    queryKey: ["popular-tvShows"],
    queryFn: () => axios.get(`${BASE_URL}/tv/popular?api_key=${API_KEY}`),
    select: (data) => data.data.results,
  });

  if (isMovieLoading || isTvShowsLoading) {
    return "Loading";
  }

  if (isMovieError || isTvShowsError) {
    return "fetch Popular error";
  }

  return (
    <Box
      component={"section"}
      className="popular"
      sx={{
        px: { xs: "1rem", sm: "3rem", md: "4rem" },
        py: 4,
        maxWidth: "1920px !important",
      }}
    >
      {/* Header of section */}
      <Stack
        sx={{
          flexDirection: "row",
          alignItems: "center",
          paddingBottom: "30px",
          gap: { xs: 1, md: 4 },
        }}
      >
        <Typography
          variant="h2"
          onClick={() => navigate("popular")}
          sx={{
            fontSize: "24px",
            fontWeight: 900,
            letterSpacing: 0,
            lineHeight: "32px",
            cursor: "pointer",
            transition: "0.2s linear",
            ":hover": {
              color: theme.palette.primary.main,
            },
          }}
        >
          Popular
        </Typography>

        <MediaTabs tabIndex={tabIndex} handleChange={handleChange} />
      </Stack>

      <MediaList
        data={tabIndex === 0 ? popularMovies : popularTvShows}
        genresType={tabIndex}
      />
    </Box>
  );
};

export default Popular;
