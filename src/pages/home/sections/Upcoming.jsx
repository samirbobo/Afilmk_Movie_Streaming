import { Box, Stack, Typography, useTheme } from "@mui/material";
import MediaTabs from "../../../components/MediaTabs";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { API_KEY, BASE_URL } from "../../../baseUrl";
import { useNavigate } from "react-router-dom";
import MediaList from "../../../components/MediaList";

const Upcoming = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const [tabIndex, setTabIndex] = useState(0);
  const today = new Date().toISOString().split("T")[0];

  const handleChange = (event, newIndex) => {
    setTabIndex(newIndex);
  };

  const {
    data: upComingMovies,
    isLoading: isMovieLoading,
    isError: isMovieError,
  } = useQuery({
    queryKey: ["Upcoming-movies"],
    queryFn: () => axios.get(`${BASE_URL}/movie/upcoming?api_key=${API_KEY}`),
    select: (data) => data.data.results,
  });

  const {
    data: upComingTvShows,
    isLoading: isTvShowsLoading,
    isError: isTvShowsError,
  } = useQuery({
    queryKey: ["Upcoming-tvShows"],
    queryFn: () =>
      axios.get(
        `${BASE_URL}/discover/tv?api_key=${API_KEY}&sort_by=first_air_date.asc&first_air_date.gte=${today}`
      ),
    select: (data) => data.data.results.filter((item) => item.poster_path),
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
          onClick={() => navigate("upcoming")}
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
          Upcoming
        </Typography>

        <MediaTabs tabIndex={tabIndex} handleChange={handleChange} />
      </Stack>

      <MediaList
        data={tabIndex === 0 ? upComingMovies : upComingTvShows}
        genresType={tabIndex}
        section="Upcoming"
      />
    </Box>
  );
};

export default Upcoming;
