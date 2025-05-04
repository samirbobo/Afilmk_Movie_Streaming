import {
  Container,
  Pagination,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { API_KEY, BASE_URL } from "../baseUrl";
import HeaderMediaType from "../components/HeaderMediaType";
import MediaList from "../components/MediaList";
import { useState } from "react";
import FilterMenu from "../components/FilterMenu";

const MAX_PAGES = 40;
const ITEMS_PER_UI_PAGE = 60; // number of movies in one page

const TopRated = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const [filters, setFilters] = useState({
    sort: "",
    year: null,
    mediaType: "Movies",
  });
  const [page, setPage] = useState(1);

  // بنجيب فقط أول صفحة عشان نعرف عدد النتائج الإجمالي
  const { data: firstPageMeta } = useQuery({
    queryKey: ["top-rated", filters.mediaType, filters],
    queryFn: () => {
      const isMovie = filters.mediaType === "Movies";
      const type = isMovie ? "movie" : "tv";
      const yearParam = filters.year
        ? isMovie
          ? `&primary_release_year=${filters.year}`
          : `&first_air_date_year=${filters.year}`
        : "";
      return axios.get(
        `${BASE_URL}/discover/${type}?api_key=${API_KEY}&language=en-US&page=1${
          filters.sort
            ? `&sort_by=${filters.sort}`
            : "&sort_by=vote_average.desc"
        }${yearParam}&vote_count.gte=200`
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
    console.log(filterData);
    setFilters(filterData); // Update parent state with filter data
    setPage(1);
  };

  const { data, isLoading, isError } = useQuery({
    queryKey: ["top-rated", filters.mediaType, page, filters],
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
            `${BASE_URL}/discover/${type}?api_key=${API_KEY}&language=en-US&page=${p}${
              filters.sort
                ? `&sort_by=${filters.sort}`
                : "&sort_by=vote_average.desc"
            }${yearParam}&vote_count.gte=200`
          )
        )
      );

      return responses
        .flatMap((res) => res.data.results)
        .filter((item) => item.poster_path)
        .slice(0, ITEMS_PER_UI_PAGE);
    },
    keepPreviousData: true,
  });

  const title =
    filters.mediaType === "Movies" ? "Top Rated Movies" : "Top Rated TV Shows";

  const subTitle =
    filters.mediaType === "Movies"
      ? "Discover the most highly rated Movies loved by audiences and critics"
      : "Discover the most highly rated TV series loved by audiences and critics";

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
        <HeaderMediaType title={title} subTitle={subTitle} />

        <FilterMenu
          onApplyFilters={onApplyFilters}
          section={"top-rated"}
        />

        {isLoading ? (
          <Typography sx={{ textAlign: "center", py: 4, height: "40vh" }}>
            Loading...
          </Typography>
        ) : isError ? (
          <Typography sx={{ textAlign: "center", py: 4, height: "40vh" }}>
            Error
          </Typography>
        ) : (
          <MediaList data={data} genresType={0} />
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

export default TopRated;
