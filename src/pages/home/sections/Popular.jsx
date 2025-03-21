import { Container, Stack, Typography, useTheme } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import MediaTabs from "../../../components/MediaTabs";
import MediaList from "../../../components/MediaList";
import { API_KEY, BASE_URL } from "../../../baseUrl";

const fetchPopularMedia = (type) =>
  axios
    .get(`${BASE_URL}/${type}/popular?api_key=${API_KEY}`)
    .then((data) => data.data.results.slice(0, 12));

const Popular = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const [selectedTab, setSelectedTab] = useState(0);

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  const {
    data: popularMovies,
    isLoading: isMovieLoading,
    isError: isMovieError,
  } = useQuery({
    queryKey: ["popular-movies"],
    queryFn: () => fetchPopularMedia("movie"),
  });

  const {
    data: popularTvShows,
    isLoading: isTvShowsLoading,
    isError: isTvShowsError,
  } = useQuery({
    queryKey: ["popular-tvShows"],
    queryFn: () => fetchPopularMedia("tv"),
  });

  if (isMovieLoading || isTvShowsLoading) {
    return "Loading";
  }

  if (isMovieError || isTvShowsError) {
    return "fetch Popular error";
  }

  return (
    <Container
      component={"section"}
      className="popular"
      sx={{
        px: { xs: "1rem", sm: "3rem", md: "4rem" },
        py: 4,
        maxWidth: "1920px !important",
      }}
    >
      {/* Header of section */}
      <Stack direction="row" alignItems="center" pb={4} gap={{ xs: 1, md: 4 }}>
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

        <MediaTabs tabIndex={selectedTab} handleChange={handleTabChange} />
      </Stack>

      <MediaList
        data={selectedTab === 0 ? popularMovies : popularTvShows}
        genresType={selectedTab}
      />
    </Container>
  );
};

export default Popular;
