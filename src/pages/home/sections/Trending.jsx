import { Container, Stack, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { API_KEY, BASE_URL } from "../../../baseUrl";
import ShowMoreBtn from "../../../components/showMoreBtn";
import MediaCarousel from "../../../components/MediaCarousel";
import Loading from "../../../components/Loading";

const Trending = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["trending-media"],
    queryFn: () =>
      axios.get(`${BASE_URL}/trending/all/week?api_key=${API_KEY}`),
    select: (data) =>
      data.data.results.filter(
        (item) => item.media_type !== "person" && item.poster_path
      ),
  });

  if (isError) {
    return;
  }

  return (
    <Container
      component={"section"}
      className="trending"
      sx={{
        px: { xs: "1.25rem", md: "2.5rem", lg: "4rem" },
        py: 2,
        maxWidth: "1920px !important",
      }}
    >
      {/* Header section */}
      <Stack
        flexDirection={"row"}
        justifyContent={"space-between"}
        alignItems={"center"}
        paddingBottom={"12px"}
      >
        <Typography
          variant="h2"
          sx={{
            fontSize: { xs: "18px", sm: "24px" },
            fontWeight: { xs: 700, sm: 900 },
            letterSpacing: 0,
            lineHeight: "32px",
          }}
        >
          Trending
        </Typography>
        <ShowMoreBtn link={"trending"} />
      </Stack>

      {isLoading && <Loading />}
      {data && <MediaCarousel data={data} />}
    </Container>
  );
};

export default Trending;
