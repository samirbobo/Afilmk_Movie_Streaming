import { Box, Stack, Typography, useTheme } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import { API_KEY, BASE_URL } from "../../../baseUrl";
import MediaTabs from "../../../components/MediaTabs";
import { useNavigate } from "react-router-dom";
import MediaList from "../../../components/MediaList";

const TopRated = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const [tabIndex, setTabIndex] = useState(0);

  const handleChange = (event, newIndex) => {
    setTabIndex(newIndex);
  };

  const {
    data: topMovies,
    isLoading: isMovieLoading,
    isError: isMovieError,
  } = useQuery({
    queryKey: ["top-rated-movies"],
    queryFn: () => axios.get(`${BASE_URL}/movie/top_rated?api_key=${API_KEY}`),
    select: (data) => data.data.results,
  });

  const {
    data: topTvShows,
    isLoading: isTvShowsLoading,
    isError: isTvShowsError,
  } = useQuery({
    queryKey: ["top-rated-tvShows"],
    queryFn: () => axios.get(`${BASE_URL}/tv/top_rated?api_key=${API_KEY}`),
    select: (data) => data.data.results,
  });

  if (isMovieLoading || isTvShowsLoading) {
    return "Loading";
  }

  if (isMovieError || isTvShowsError) {
    return "fetch top rated error";
  }

  return (
    <Box
      component={"section"}
      className="top-rated"
      sx={{
        px: { xs: "1rem", sm: "3rem", md: "4rem" },
        py: 4,
        maxWidth: "1920px !important",
      }}
    >
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
          onClick={() => navigate("top-rated")}
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
          Top Rated
        </Typography>

        <MediaTabs tabIndex={tabIndex} handleChange={handleChange} />
      </Stack>

      <MediaList
        data={tabIndex === 0 ? topMovies : topTvShows}
        genresType={tabIndex}
      />
    </Box>
  );
};

export default TopRated;
