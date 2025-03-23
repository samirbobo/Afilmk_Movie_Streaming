import { Toolbar } from "@mui/material";
import { useParams } from "react-router-dom";
import { UseGlobalGenres } from "../../context/GenresContext";
import axios from "axios";
import { API_KEY, BASE_URL } from "../../baseUrl";
import { useQuery } from "@tanstack/react-query";

const TvType = () => {
  const { tvType } = useParams();
  const { tvShowGenres } = UseGlobalGenres();

  const tvId = tvShowGenres.find((item) => item.name.toLowerCase() === tvType);

  const { data, isLoading, error } = useQuery({
    queryKey: ["tv", tvType],
    queryFn: () =>
      axios.get(
        `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=${tvId.id}&language=en-US&page=1&sort_by=popularity.desc`
      ),
  });

  if (isLoading) {
    return "Loading...";
  }

  if (error) {
    return "fetch tv Type error";
  }

  console.log(data);

  return (
    <>
      <Toolbar />
      <div>tv Show Type Page {tvType}</div>
    </>
  );
};

export default TvType;