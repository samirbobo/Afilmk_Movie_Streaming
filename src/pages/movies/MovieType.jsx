import { Toolbar } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useParams } from "react-router-dom";
import { API_KEY, BASE_URL } from "../../baseUrl";
import { UseGlobalGenres } from "../../context/GenresContext";

const MovieType = () => {
  const { movieType } = useParams();
  const { movieGenres } = UseGlobalGenres();

  const movieId = movieGenres.find(
    (item) => item.name.toLowerCase() === movieType
  );

  const { data, isLoading, error } = useQuery({
    queryKey: ["movie", movieType],
    queryFn: () =>
      axios.get(
        `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=${movieId.id}&language=en-US&page=1&sort_by=popularity.desc`
      ),
  });

  if (isLoading) {
    return "Loading...";
  }

  if (error) {
    return "fetch movie Type error";
  }

  console.log(data);

  return (
    <>
      <Toolbar />
      <div>Movie Type Page {movieType}</div>
    </>
  );
};

export default MovieType;
