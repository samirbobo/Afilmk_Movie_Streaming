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
import { useEffect, useState } from "react";
import FilterMenu from "../../components/FilterMenu";
import { movieSortOptions } from "../../constants";

const MAX_PAGES = 40;
const ITEMS_PER_UI_PAGE = 60; // number of movies in one page

const MovieType = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const [filters, setFilters] = useState({
    sort: "",
    year: null,
    mediaType: "Movies",
  });
  const { movieType } = useParams();
  const { movieGenres } = UseGlobalGenres();
  const [page, setPage] = useState(1);

  const movieId = movieGenres.find(
    (item) => item.name.toLowerCase() === movieType
  );

  // بنجيب فقط أول صفحة عشان نعرف عدد النتائج الإجمالي
  const { data: firstPageMeta } = useQuery({
    queryKey: ["movie-meta", movieType, filters],
    queryFn: () =>
      axios.get(
        `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=${
          movieId.id
        }&language=en-US&page=1${
          filters.sort ? `&sort_by=${filters.sort}` : ""
        }${filters.year ? `&primary_release_year=${filters.year}` : ""}${
          filters.rate ? `&vote_average.gte=${filters.rate}` : ""
        }&vote_count.gte=50`
      ),
    select: (res) => ({
      totalResults: res.data.total_results,
    }),
    enabled: !!movieId,
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
    data: movies,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["movie", movieType, page, filters],
    queryFn: async () => {
      const pages = getApiPages(page);
      const responses = await Promise.all(
        pages.map((p) =>
          axios.get(
            `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=${
              movieId?.id
            }&language=en-US&page=${p}${
              filters.sort ? `&sort_by=${filters.sort}` : ""
            }${filters.year ? `&primary_release_year=${filters.year}` : ""}${
              filters.rate ? `&vote_average.gte=${filters.rate}` : ""
            }&vote_count.gte=50`
          )
        )
      );
      return responses
        .flatMap((res) => res.data.results)
        .slice(0, ITEMS_PER_UI_PAGE); // لو مثلاً في آخر صفحة وراجع أكتر من 60
    },
    keepPreviousData: true,
    enabled: !!movieId,
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
          px: { xs: "1rem", sm: "3rem", md: "4rem" },
          py: 2,
          maxWidth: "1920px !important",
        }}
      >
        <HeaderMediaType
          title={`${movieType} Movies`}
          subTitle={`Explore the best of ${movieType} movies, carefully picked for your mood`}
        />

        <FilterMenu
          onApplyFilters={onApplyFilters}
          sortData={movieSortOptions}
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
            data={movies}
            genresType={0}
            section={"MovieType"}
            from={["movies", movieType]}
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

export default MovieType;
