import {
  Container,
  Pagination,
  Toolbar,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import HeaderMediaType from "../components/HeaderMediaType";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { API_KEY, BASE_URL } from "../baseUrl";
import axios from "axios";
import MediaList from "../components/MediaList";
import Loading from "../components/Loading";
import ErrorMessage from "../components/ErrorMessage";

const MAX_PAGES = 40;
const ITEMS_PER_UI_PAGE = 60; // number of movies in one page

const Trending = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const [page, setPage] = useState(1);

  const { data: firstPageMeta } = useQuery({
    queryKey: ["trending-media-firstPageMeta"],
    queryFn: () =>
      axios.get(`${BASE_URL}/trending/all/week?api_key=${API_KEY}`),
    select: (res) => ({
      totalResults: res.data.total_results,
    }),
  });

  // بنحسب عدد صفحاتنا المخصصة (max 40)
  const totalCustomPages = Math.min(
    Math.ceil((firstPageMeta?.totalResults || 0) / ITEMS_PER_UI_PAGE),
    MAX_PAGES
  );

  const getApiPages = (page) => {
    const start = (page - 1) * 3 + 1;
    return [start, start + 1, start + 2];
  };

  const { data, isLoading, isError } = useQuery({
    queryKey: ["all-trending-media-data", page],
    queryFn: async () => {
      const pages = getApiPages(page);
      const responses = await Promise.all(
        pages.map((page) =>
          axios.get(
            `${BASE_URL}/trending/all/week?api_key=${API_KEY}&page=${page}`
          )
        )
      );
      return responses
        .flatMap((res) => res.data.results)
        .slice(0, ITEMS_PER_UI_PAGE); // Limit to 60 items per page
    },
    keepPreviousData: true,
  });

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
          px: { xs: "1.25rem", md: "2.5rem", lg: "4rem" },
          py: 2,
          maxWidth: "1920px !important",
        }}
      >
        <HeaderMediaType
          title={`Trending Now`}
          subTitle={`Explore top trending content, curated just for you`}
        />

        {isLoading ? (
          <Loading />
        ) : isError ? (
          <ErrorMessage />
        ) : (
          <MediaList data={data} from="Trending" />
        )}

        {data && !isError && totalCustomPages > 1 && (
          <Pagination
            count={totalCustomPages}
            size={isSmallScreen ? "small" : "medium"}
            page={page}
            onChange={(e, value) => {
              setPage(value);
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            sx={{
              mt: 4,
              display: "flex",
              justifyContent: "center",
              "& .MuiPaginationItem-root.Mui-selected": {
                backgroundColor: theme.palette.custom.favBackLight,
                color: "#fff",
                "&:hover": {
                  backgroundColor: theme.palette.custom.favBackLight,
                },
              },
            }}
          />
        )}
      </Container>
    </>
  );
};

export default Trending;
