// react-router
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import { lazy } from "react";

// Pages
// add lazy load for each page to make the web site faster
import RootLayout from "./components/RootLayout";
import Home from "./pages/home/Home";
const Movies = lazy(() => import("./pages/movies/Movies"));
const MovieType = lazy(() => import("./pages/movies/MovieType"));

const TvShows = lazy(() => import("./pages/tvShows/TvShows"));
const TvType = lazy(() => import("./pages/tvShows/TvType"));

const LatestAdditions = lazy(() => import("./pages/LatestAdditions"));
const Trending = lazy(() => import("./pages/Trending"));
const TopRated = lazy(() => import("./pages/TopRated"));
const Upcoming = lazy(() => import("./pages/Upcoming"));
const Popular = lazy(() => import("./pages/Popular"));
const MovieDetails = lazy(() => import("./pages/MovieDetails"));
const TvShowDetails = lazy(() => import("./pages/TvShowDetails"));
const SearchResults = lazy(() => import("./pages/SearchResults"));
const NotFoundPage = lazy(() => import("./pages/NotFoundPage"));

// Material UI
import { ColorModeContext, useMode } from "./theme";
import { CssBaseline, ThemeProvider } from "@mui/material";

// React Query
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

// Context
import GenresProvider from "./context/GenresContext";
import ErrorBoundary from "./components/ErrorBoundary";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />} errorElement={<ErrorBoundary />}>
      <Route index element={<Home />} />

      <Route path="movies" element={<Movies />} />
      <Route path="movies/:movieType" element={<MovieType />} />

      <Route path="tv-shows" element={<TvShows />} />
      <Route path="tv-shows/:tvType" element={<TvType />} />

      <Route path="latest-additions" element={<LatestAdditions />} />
      <Route path="trending" element={<Trending />} />
      <Route path="top-rated" element={<TopRated />} />
      <Route path="upcoming" element={<Upcoming />} />
      <Route path="popular" element={<Popular />} />

      <Route path="movie/:slug/:id" element={<MovieDetails />} />
      <Route path="tv/:slug/:id" element={<TvShowDetails />} />

      <Route path="/search" element={<SearchResults />} />

      <Route path="*" element={<NotFoundPage />} />
    </Route>
  )
);

const MINUTE = 1000 * 60;
const client = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: MINUTE, // البيانات تفضل "طازة" لمدة 1 دقيقة
      gcTime: MINUTE * 10, // to make data save in cache to 10 minute
    },
  },
});

function App() {
  const [theme, colorMode] = useMode();

  return (
    // theme provider form Material UI
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />

        <QueryClientProvider client={client}>
          <GenresProvider>
            <RouterProvider router={router} />
          </GenresProvider>
          <ReactQueryDevtools
            initialIsOpen={true}
            buttonPosition="bottom-left"
          />
        </QueryClientProvider>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
