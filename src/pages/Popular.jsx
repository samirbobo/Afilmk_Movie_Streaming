import {
  Container,
  Pagination,
  Toolbar,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { API_KEY, BASE_URL } from "../baseUrl";
import HeaderMediaType from "../components/HeaderMediaType";
import MediaList from "../components/MediaList";
import { useEffect, useState } from "react";
import FilterMenu from "../components/FilterMenu";
import Loading from "../components/Loading";
import ErrorMessage from "../components/ErrorMessage";

const MAX_PAGES = 40;
const ITEMS_PER_UI_PAGE = 60; // number of movies in one page

const Popular = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const [filters, setFilters] = useState({
    rate: "",
    year: null,
    mediaType: "Movies",
  });
  const [page, setPage] = useState(1);

  // بنجيب فقط أول صفحة عشان نعرف عدد النتائج الإجمالي
  const { data: firstPageMeta } = useQuery({
    queryKey: ["popular", filters.mediaType, filters],
    queryFn: () => {
      const isMovie = filters.mediaType === "Movies";
      const type = isMovie ? "movie" : "tv";
      const yearParam = filters.year
        ? isMovie
          ? `&primary_release_year=${filters.year}`
          : `&first_air_date_year=${filters.year}`
        : "";
      return axios.get(
        `${BASE_URL}/discover/${type}?api_key=${API_KEY}&language=en-US&page=1&sort_by=popularity.desc${yearParam}${
          filters.rate ? `&vote_average.gte=${filters.rate}` : ""
        }`
      );
    },
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

  const onApplyFilters = (filterData) => {
    setFilters(filterData); // Update parent state with filter data
    setPage(1);
  };

  const { data, isLoading, isError } = useQuery({
    queryKey: ["popular", filters.mediaType, page, filters],
    queryFn: async () => {
      const isMovie = filters.mediaType === "Movies";
      const type = isMovie ? "movie" : "tv";
      const yearParam = filters.year
        ? isMovie
          ? `&primary_release_year=${filters.year}`
          : `&first_air_date_year=${filters.year}`
        : "";

      const pages = getApiPages(page);
      const responses = await Promise.all(
        pages.map((p) =>
          axios.get(
            `${BASE_URL}/discover/${type}?api_key=${API_KEY}&language=en-US&page=${p}&sort_by=popularity.desc${yearParam}${
              filters.rate ? `&vote_average.gte=${filters.rate}` : ""
            }`
          )
        )
      );

      return responses
        .flatMap((res) => res.data.results)
        .slice(0, ITEMS_PER_UI_PAGE);
    },
    keepPreviousData: true,
  });

  // Scroll to top
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const title =
    filters.mediaType === "Movies" ? "Popular Movies" : "Popular TV Shows";

  const subTitle =
    filters.mediaType === "Movies"
      ? "Explore the most popular movies that everyone is talking about"
      : "Explore the most popular TV shows that everyone is watching";

  return (
    <>
      <Toolbar />
      <Container
        sx={{
          px: { xs: "1.25rem", md: "2.5rem", lg: "4rem" },
          py: 2,
          maxWidth: "1920px !important",
        }}
      >
        <HeaderMediaType title={title} subTitle={subTitle} />

        {!isError && (
          <FilterMenu onApplyFilters={onApplyFilters} section={"popular"} />
        )}

        {isLoading ? (
          <Loading />
        ) : isError ? (
          <ErrorMessage />
        ) : (
          <MediaList
            data={data}
            genresType={filters.mediaType === "Movies" ? 0 : 1}
            from={"Popular"}
          />
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

export default Popular;
