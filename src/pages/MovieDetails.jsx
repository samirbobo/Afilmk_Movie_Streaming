import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useParams } from "react-router-dom";
import { API_KEY, BASE_URL } from "../baseUrl";
import { useEffect } from "react";
import {
  Box,
  Container,
  Stack,
  Toolbar,
  useMediaQuery,
  Typography,
} from "@mui/material";
import MediaTypeDetailsImage from "../components/MediaTypeDetailsImage";
import MediaTypeDescription from "../components/MediaTypeDescription";

import MediaTypeDetails from "../components/MediaTypeDetails";
import MediaTypeCast from "../components/MediaTypeCast";
import MediaTypeReviews from "../components/MediaTypeReviews";
import BreadcrumbsLinks from "../components/BreadcrumbsLinks";
import MediaList from "../components/MediaList";

const MovieDetails = () => {
  const { slug, id } = useParams();
  const matches = useMediaQuery("(max-width: 767.9px)");
  const { data, isLoading, error } = useQuery({
    queryKey: ["movie", slug, id],
    queryFn: () =>
      axios.get(
        `${BASE_URL}/movie/${id}?api_key=${API_KEY}&append_to_response=videos,credits,reviews,recommendations`
      ),
    select: (data) => data.data,
    enabled: !!id,
  });

  // Scroll to top
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  if (isLoading) {
    return "Loading...";
  }

  if (error) {
    return "Error...";
  }

  return (
    <>
      <Toolbar />
      <Container
        sx={{
          px: { xs: "1rem", sm: "3rem", md: "4rem" },
          py: 2,
          maxWidth: "1920px !important",
        }}
      >
        <BreadcrumbsLinks page={"movieDetails"} />

        {/* Image of Movie */}
        <MediaTypeDetailsImage data={data} />

        <Stack
          sx={{
            flexDirection: { xs: "column", md: "row" },
            justifyContent: "space-between",
            alignItems: "start",
            gap: 2.5,
          }}
        >
          <Box
            sx={{
              flexBasis: { xs: "100%", md: "calc(65% - 10px)" },
              maxWidth: { xs: "100%", md: "calc(65% - 10px)" },
              display: "flex",
              flexDirection: "column",
              gap: "20px",
            }}
          >
            <MediaTypeDescription data={data} />
            {matches && <MediaTypeDetails data={data} />}
            <MediaTypeCast data={data} />
            <MediaTypeReviews data={data} />
          </Box>

          {!matches && <MediaTypeDetails data={data} />}
        </Stack>

        {data?.recommendations.results.length > 0 && (
          <Box mt={5}>
            <Typography
              variant="h3"
              color="text.primary"
              sx={{ fontSize: { xs: 24, md: 36 }, mb: 1.25, py: 1.25 }}
            >
              Recommendations
            </Typography>
            <MediaList
              data={data?.recommendations.results.slice(0, 12)}
              genresType={0}
              section={"pageDetails"}
            />
          </Box>
        )}
      </Container>
    </>
  );
};

export default MovieDetails;
