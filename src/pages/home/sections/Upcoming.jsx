import { Container } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import axios from "axios";
import MediaList from "../../../components/MediaList";
import { API_KEY, BASE_URL } from "../../../baseUrl";
import HeaderSection from "../../../components/HeaderSection";

const Upcoming = () => {
  const [selectedTab, setSelectedTab] = useState(0);
  const today = new Date().toISOString().split("T")[0];

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  const {
    data: upComingMovies,
    isLoading: isMovieLoading,
    isError: isMovieError,
  } = useQuery({
    queryKey: ["Upcoming-movies"],
    queryFn: () => axios.get(`${BASE_URL}/movie/upcoming?api_key=${API_KEY}`),
    select: (data) =>
      data.data.results.filter((item) => item.poster_path).slice(0, 12),
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
    select: (data) =>
      data.data.results.filter((item) => item.poster_path).slice(0, 12),
  });

  if (isMovieLoading || isTvShowsLoading) {
    return "Loading";
  }

  if (isMovieError || isTvShowsError) {
    return "fetch top rated error";
  }

  return (
    <Container
      component={"section"}
      className="top-rated"
      sx={{
        px: { xs: "1rem", sm: "3rem", md: "4rem" },
        py: 4,
        maxWidth: "1920px !important",
      }}
    >
      {/* Header of section */}
      <HeaderSection
        link="/upcoming"
        title="Upcoming"
        selectedTab={selectedTab}
        handleTabChange={handleTabChange}
      />

      <MediaList
        data={selectedTab === 0 ? upComingMovies : upComingTvShows}
        genresType={selectedTab}
        section="Upcoming"
      />
    </Container>
  );
};

export default Upcoming;
