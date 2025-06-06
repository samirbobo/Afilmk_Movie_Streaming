import { Container } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import { API_KEY, BASE_URL } from "../../../baseUrl";
import MediaList from "../../../components/MediaList";
import HeaderSection from "../../../components/HeaderSection";
import Loading from "../../../components/Loading";

const fetchTopRated = (type) =>
  axios
    .get(`${BASE_URL}/${type}/top_rated?api_key=${API_KEY}`)
    .then((res) =>
      res.data.results.filter((item) => item.poster_path).slice(0, 12)
    );

const TopRated = () => {
  const [selectedTab, setSelectedTab] = useState(0);

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  const {
    data: topMovies = [],
    isLoading: isMovieLoading,
    isError: isMovieError,
    isSuccess: isMovieSuccess,
  } = useQuery({
    queryKey: ["top-rated-movies"],
    queryFn: () => fetchTopRated("movie"),
  });

  const {
    data: topTvShows = [],
    isLoading: isTvShowsLoading,
    isError: isTvShowsError,
    isSuccess: isTvSuccess,
  } = useQuery({
    queryKey: ["top-rated-tv-shows"],
    queryFn: () => fetchTopRated("tv"),
  });

  if (isMovieError || isTvShowsError) {
    return;
  }

  return (
    <Container
      component="section"
      sx={{
        px: { xs: "1.25rem", md: "2.5rem", lg: "4rem" },
        py: 4,
        maxWidth: "1920px !important",
      }}
    >
      {/* Header of section */}
      <HeaderSection
        link="/top-rated"
        title="Top Rated"
        selectedTab={selectedTab}
        handleTabChange={handleTabChange}
      />

      {(isMovieLoading || isTvShowsLoading) && <Loading />}
      {isMovieSuccess && isTvSuccess && (
        <MediaList
          data={selectedTab === 0 ? topMovies : topTvShows}
          genresType={selectedTab}
        />
      )}
    </Container>
  );
};

export default TopRated;
