import { Container } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import axios from "axios";
import MediaList from "../../../components/MediaList";
import { API_KEY, BASE_URL } from "../../../baseUrl";
import HeaderSection from "../../../components/HeaderSection";

const fetchPopularMedia = (type) =>
  axios
    .get(`${BASE_URL}/${type}/popular?api_key=${API_KEY}`)
    .then((data) =>
      data.data.results.filter((item) => item.poster_path).slice(0, 12)
    );

const Popular = () => {
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
      <HeaderSection
        link="/popular"
        title="Popular"
        selectedTab={selectedTab}
        handleTabChange={handleTabChange}
      />

      <MediaList
        data={selectedTab === 0 ? popularMovies : popularTvShows}
        genresType={selectedTab}
      />
    </Container>
  );
};

export default Popular;
