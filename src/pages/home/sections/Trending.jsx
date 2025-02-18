import { Container, Stack, Typography } from "@mui/material";
import MediaCarousel from "../../../components/MediaCarousel";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { API_KEY, BASE_URL } from "../../../baseUrl";
import ShowMoreBtn from "../../../components/showMoreBtn";

const Trending = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["trending-media"],
    queryFn: () =>
      axios.get(`${BASE_URL}/trending/all/week?api_key=${API_KEY}`),
  });

  if (isLoading) {
    return "Loading...";
  }

  if (isError) {
    return "Error in fetch...";
  }

  return (
    <Container
      component={"section"}
      className="trending"
      sx={{
        px: { xs: "1rem", sm: "3rem", md: "4rem" },
        py: 2,
        maxWidth: "1920px !important",
      }}
    >
      <Stack
        flexDirection={"row"}
        justifyContent={"space-between"}
        alignItems={"center"}
        paddingBottom={"12px"}
      >
        <Typography
          variant="h2"
          sx={{
            fontSize: "24px",
            fontWeight: 900,
            letterSpacing: 0,
            lineHeight: "32px",
          }}
        >
          Trending
        </Typography>
        <ShowMoreBtn />
      </Stack>
      <MediaCarousel data={data} />
    </Container>
  );
};

export default Trending;
