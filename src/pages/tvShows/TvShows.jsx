import { Box, Container, Stack, Toolbar, Typography } from "@mui/material";
import ShowMoreBtn from "../../components/showMoreBtn";
import { UseGlobalGenres } from "../../context/GenresContext";
import { useQueries } from "@tanstack/react-query";
import axios from "axios";
import { API_KEY, BASE_URL } from "../../baseUrl";
import MediaCarousel from "../../components/MediaCarousel";
import { useState, useEffect, useRef } from "react";

const TvShows = () => {
  const { tvShowGenres } = UseGlobalGenres();
  const [visibleSections, setVisibleSections] = useState(() => {
    const saved = sessionStorage.getItem("tv-visibleSections");
    return saved ? parseInt(saved, 10) : 4;
  }); // عدد السيكشنز المرئية
  const observerRef = useRef(null);
  const visibleGenres = tvShowGenres.slice(0, visibleSections) || [];

  const tvShowsQueries = useQueries({
    queries: visibleGenres.map((genre) => ({
      queryKey: ["tv-show", genre.name],
      queryFn: () =>
        axios.get(
          `${BASE_URL}/discover/tv?api_key=${API_KEY}&with_genres=${genre.id}&language=en-US&page=1&sort_by=popularity.desc`
        ),
      select: (data) => data.data.results.filter((item) => item.poster_path),
      enabled: !!tvShowGenres, // مش هيشتغل غير لما الأنواع تتحمل
    })),
  });

  // تحقق هل في تحميل لأي كويري حاليًا
  const isAnyLoading = tvShowsQueries.some((query) => query?.isFetching);

  // Intersection Observer للـ infinite scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (
          entries[0].isIntersecting &&
          visibleSections < tvShowGenres?.length &&
          !isAnyLoading
        ) {
          setVisibleSections((prev) => Math.min(prev + 4, tvShowGenres.length)); // بزود سيشكن تاني
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px 300px 0px" }
    );

    sessionStorage.setItem("tv-visibleSections", visibleSections.toString());

    if (observerRef.current) observer.observe(observerRef.current);

    return () => {
      if (observerRef.current) observer.unobserve(observerRef.current);
    };
  }, [tvShowGenres, visibleSections, isAnyLoading]);

  // Scroll to top
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <>
      <Toolbar />
      <Container
        className="Movies"
        sx={{
          px: { xs: "1rem", sm: "3rem", md: "4rem" },
          py: 2,
          maxWidth: "1920px !important",
        }}
      >
        {visibleGenres.map((genre, index) => {
          const {
            data: movies,
            isSuccess,
            error,
          } = tvShowsQueries[index] || {};

          if (error) {
            return (
              <Box key={genre.id} py={3}>
                <Typography color="error">
                  ❌ Failed to load Tv show for "{genre.name}".
                </Typography>
              </Box>
            );
          }

          if (isSuccess) {
            return (
              <Box
                component={"section"}
                key={genre.id}
                sx={{ padding: "2rem 0" }}
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
                    {genre.name}
                  </Typography>
                  <ShowMoreBtn link={genre.name.toLowerCase()} />
                </Stack>

                {movies && (
                  <MediaCarousel data={movies} type="tv" from="tv-shows" />
                )}
              </Box>
            );
          }
        })}
        {(visibleSections < tvShowGenres.length || isAnyLoading) && (
          <Box
            ref={observerRef}
            sx={{
              height: "60px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {isAnyLoading && <h1>Loading...</h1>}
          </Box>
        )}
      </Container>
    </>
  );
};

export default TvShows;
