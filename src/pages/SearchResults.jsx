import {
  CircularProgress,
  Container,
  Pagination,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { API_KEY } from "../baseUrl";
import { useEffect, useState } from "react";
import MediaList from "../components/MediaList";

const useSearchQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const MAX_PAGES = 40;
const ITEMS_PER_UI_PAGE = 60; // number of movies in one page

const SearchResults = () => {
  const theme = useTheme();
  const query = useSearchQuery();
  const searchTerm = query.get("query");
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const [page, setPage] = useState(1);

  // بنجيب فقط أول صفحة عشان نعرف عدد النتائج الإجمالي
  const { data: firstPageMeta } = useQuery({
    queryKey: ["view-all-search", searchTerm],
    queryFn: () =>
      axios.get("https://api.themoviedb.org/3/search/multi", {
        params: {
          api_key: API_KEY,
          query: searchTerm,
        },
      }),
    select: (res) => ({
      totalResults: res.data.total_results,
    }),
    enabled: !!searchTerm,
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
    queryKey: ["view-all-search", page, searchTerm],
    queryFn: async () => {
      const pages = getApiPages(page);
      const responses = await Promise.all(
        pages.map((p) =>
          axios.get("https://api.themoviedb.org/3/search/multi", {
            params: {
              api_key: API_KEY,
              query: searchTerm,
              page: p,
            },
          })
        )
      );

      return responses
        .flatMap((res) => res.data.results)
        .filter((item) => item.media_type !== "person")
        .slice(0, ITEMS_PER_UI_PAGE);
    },
    keepPreviousData: true,
    enabled: !!searchTerm,
  });

  // Scroll to top
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

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
        <Typography
          variant="h2"
          color="text.primary"
          sx={{
            fontSize: { xs: "1.5rem", md: "2.5rem" },
            pb: "2rem",
            mb: "2.5rem",
            textAlign: "center",
            borderBottomWidth: "1px",
            borderBottomStyle: "solid",
            borderBottomColor: "text.secondary",
          }}
        >
          {searchTerm
            ? `Search Results for ${searchTerm}🎬`
            : "Please enter a search term to see results 🔍"}
        </Typography>

        {isLoading ? (
          <Typography sx={{ textAlign: "center", py: 4, height: "40vh" }}>
            <CircularProgress />
          </Typography>
        ) : isError ? (
          <Typography sx={{ textAlign: "center", py: 4, height: "40vh" }}>
            Error
          </Typography>
        ) : (
          data && <MediaList data={data} />
        )}

        {totalCustomPages > 1 && (
          <Pagination
            count={totalCustomPages}
            size={isSmallScreen ? "small" : "medium"}
            page={page}
            onChange={(e, value) => {
              setPage(value);
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            color="primary"
            sx={{ mt: 4, display: "flex", justifyContent: "center" }}
          />
        )}
      </Container>
    </>
  );
};

export default SearchResults;
