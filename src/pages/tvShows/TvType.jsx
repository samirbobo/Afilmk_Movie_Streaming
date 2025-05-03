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
import { useParams } from "react-router-dom";
import { API_KEY, BASE_URL } from "../../baseUrl";
import { UseGlobalGenres } from "../../context/GenresContext";
import HeaderMediaType from "../../components/HeaderMediaType";
import MediaList from "../../components/MediaList";
import { useState } from "react";
import FilterMenu from "../../components/FilterMenu";

const MAX_PAGES = 40;
const ITEMS_PER_UI_PAGE = 60; // number of movies in one page

const TvType = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const [filters, setFilters] = useState({ rate: "", sort: "", year: null });
  const { tvType } = useParams();
  const { tvShowGenres } = UseGlobalGenres();
  const [page, setPage] = useState(1);

  const tvId = tvShowGenres.find((item) => item.name.toLowerCase() === tvType);

  const { data: firstPageMeta } = useQuery({
    queryKey: ["tv", tvType, filters],
    queryFn: () =>
      axios.get(
        `${BASE_URL}/discover/tv?api_key=${API_KEY}&with_genres=${
          tvId.id
        }&language=en-US&page=1${
          filters.sort ? `&sort_by=${filters.sort}` : ""
        }${filters.year ? `&first_air_date_year=${filters.year}` : ""}${
          filters.rate ? `&vote_average.gte=${filters.rate}` : ""
        }&vote_count.gte=30`
      ),
    select: (res) => ({
      totalResults: res.data.total_results,
    }),
    enabled: !!tvId,
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

  const {
    data: shows,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["tv", tvType, page, filters],
    queryFn: async () => {
      const pages = getApiPages(page);
      const responses = await Promise.all(
        pages.map((p) =>
          axios.get(
            `${BASE_URL}/discover/tv?api_key=${API_KEY}&with_genres=${
              tvId?.id
            }&language=en-US&page=${p}${
              filters.sort ? `&sort_by=${filters.sort}` : ""
            }${filters.year ? `&first_air_date_year=${filters.year}` : ""}${
              filters.rate ? `&vote_average.gte=${filters.rate}` : ""
            }&vote_count.gte=30`
          )
        )
      );
      return responses
        .flatMap((res) => res.data.results)
        .filter((show) => show.poster_path)
        .slice(0, ITEMS_PER_UI_PAGE); // Limit to 60 items per page
    },
    keepPreviousData: true,
    enabled: !!tvId,
  });

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
        <HeaderMediaType
          title={`${tvType} Shows`}
          subTitle={`Explore the best of ${tvType} TV shows, carefully picked for your mood`}
        />

        <FilterMenu onApplyFilters={onApplyFilters} />

        {isLoading ? (
          <Typography sx={{ textAlign: "center", py: 4, height: "40vh" }}>
            Loading...
          </Typography>
        ) : isError ? (
          <Typography sx={{ textAlign: "center", py: 4, height: "40vh" }}>
            Error
          </Typography>
        ) : (
          <MediaList data={shows} genresType={1} section={"MovieType"} />
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

export default TvType;
