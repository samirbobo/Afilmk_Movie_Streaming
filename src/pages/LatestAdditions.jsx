import {
  Container,
  Pagination,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import HeaderMediaType from "../components/HeaderMediaType";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { API_KEY, BASE_URL } from "../baseUrl";
import axios from "axios";
import MediaList from "../components/MediaList";
import FilterMenu from "../components/FilterMenu";

const MAX_PAGES = 40;
const ITEMS_PER_UI_PAGE = 60; // number of movies in one page

const LatestAdditions = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState({ mediaType: "Movies", rate: "" });
  const today = new Date().toISOString().split("T")[0];
  const lastYear = new Date();
  lastYear.setFullYear(lastYear.getFullYear() - 1);
  const oneYearAgo = lastYear.toISOString().split("T")[0];

  // بنجيب فقط أول صفحة عشان نعرف عدد النتائج الإجمالي
  const { data: firstPageMeta } = useQuery({
    queryKey: ["last-additions-firstPage", filters],
    queryFn: () => {
      const isMovie = filters.mediaType === "Movies";
      const type = isMovie ? "movie" : "tv";
      const dateField = isMovie ? "primary_release_date" : "first_air_date";

      return axios.get(
        `${BASE_URL}/discover/${type}?api_key=${API_KEY}&language=en-US&page=1
          &${dateField}.gte=${oneYearAgo}&${dateField}.lte=${today}&sort_by=release_date.desc${
          filters.rate
            ? `&vote_average.gte=${filters.rate}&vote_count.gte=50`
            : ""
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
    console.log(filterData);
    setFilters(filterData); // Update parent state with filter data
    setPage(1);
  };

  const { data, isLoading, isError } = useQuery({
    queryKey: ["last additions", filters.mediaType, page, filters],
    queryFn: async () => {
      const isMovie = filters.mediaType === "Movies";
      const type = isMovie ? "movie" : "tv";
      const dateField = isMovie ? "primary_release_date" : "first_air_date";

      const pages = getApiPages(page);
      const responses = await Promise.all(
        pages.map((p) =>
          axios.get(
            `${BASE_URL}/discover/${type}?api_key=${API_KEY}&language=en-US&page=${p}
              &${dateField}.gte=${oneYearAgo}&${dateField}.lte=${today}&sort_by=release_date.desc${
              filters.rate
                ? `&vote_average.gte=${filters.rate}&vote_count.gte=50`
                : ""
            }`
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

  // Scroll to top
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const title =
    filters.mediaType === "Movies" ? "Latest Movies" : "Latest TV Shows";

  const subTitle =
    filters.mediaType === "Movies"
      ? "Explore the most recently released movies added to our collection"
      : "Explore the most recently released TV shows added to our collection";

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
          section={"LatestAdditions"}
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
          <MediaList
            data={data}
            genresType={filters.mediaType === "Movies" ? 0 : 1}
            section={"LatestAdditions"}
          />
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

export default LatestAdditions;
