/* eslint-disable react/prop-types */
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { createContext, useContext } from "react";
import { API_KEY, BASE_URL } from "../baseUrl";

const GenresContext = createContext();

const GenresProvider = ({ children }) => {
  const {
    data: movieGenres,
    isLoading: isMoviesLoading,
    isError: moviesError,
  } = useQuery({
    queryKey: ["movie-genres"],
    queryFn: () => axios.get(`${BASE_URL}/genre/movie/list?api_key=${API_KEY}`),
    select: (data) => data.data.genres,
  });

  const {
    data: tvShowGenres,
    isLoading: isTvShowsLoading,
    isError: tvShowsError,
  } = useQuery({
    queryKey: ["tv-genres"],
    queryFn: () => axios.get(`${BASE_URL}/genre/tv/list?api_key=${API_KEY}`),
    select: (data) => data.data.genres,
  });

  const getGenreNames = (genresIDS, genres) => {
    if (genres.length < 1) return [];
    return genresIDS.map((id) => {
      const genre = genres.find((item) => item.id === id);
      return genre ? genre.name : "Unknown";
    });
  };

  const values = {
    movieGenres: movieGenres || [],
    isMoviesLoading,
    moviesError,
    tvShowGenres: tvShowGenres || [],
    isTvShowsLoading,
    tvShowsError,
    getGenreNames,
  };
  return (
    <GenresContext.Provider value={values}>{children}</GenresContext.Provider>
  );
};

export default GenresProvider;

export const UseGlobalGenres = () => {
  return useContext(GenresContext);
};
