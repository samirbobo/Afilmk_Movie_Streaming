import { Container, Stack, Typography, useTheme } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_KEY, BASE_URL } from "../../../baseUrl";
import MediaTabs from "../../../components/MediaTabs";
import MediaList from "../../../components/MediaList";

// دالة مساعدة لجلب البيانات
const fetchTopRated = (type) =>
  axios
    .get(`${BASE_URL}/${type}/top_rated?api_key=${API_KEY}`)
    .then((res) => res.data.results.slice(0, 12));

const TopRated = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const [selectedTab, setSelectedTab] = useState(0);

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  const {
    data: topMovies = [],
    isLoading: isMovieLoading,
    isError: isMovieError,
  } = useQuery({
    queryKey: ["top-rated-movies"],
    queryFn: () => fetchTopRated("movie"),
  });

  const {
    data: topTvShows = [],
    isLoading: isTvShowsLoading,
    isError: isTvShowsError,
  } = useQuery({
    queryKey: ["top-rated-tv-shows"],
    queryFn: () => fetchTopRated("tv"),
  });

  if (isMovieLoading || isTvShowsLoading) {
    return "Loading";
  }

  if (isMovieError || isTvShowsError) {
    return "fetch top rated error";
  }

  return (
    <Container
      component="section"
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
          onClick={() => navigate("/top-rated")}
          sx={{
            fontSize: "24px",
            fontWeight: 900,
            letterSpacing: 0,
            lineHeight: "32px",
            cursor: "pointer",
            transition: "0.2s linear",
            "&:hover": {
              color: theme.palette.primary.main,
            },
          }}
        >
          Top Rated
        </Typography>
        <MediaTabs tabIndex={selectedTab} handleChange={handleTabChange} />
      </Stack>

      <MediaList
        data={selectedTab === 0 ? topMovies : topTvShows}
        genresType={selectedTab}
      />
    </Container>
  );
};

export default TopRated;
