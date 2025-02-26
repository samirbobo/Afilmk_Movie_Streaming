// react-router
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

// Pages
import RootLayout from "./components/RootLayout";
import Movies from "./pages/Movies";
import Home from "./pages/home/Home";
import TvShows from "./pages/TvShows";
import NotFoundPage from "./pages/NotFoundPage";
import LatestAdditions from "./pages/LatestAdditions";

// Material UI
import { ColorModeContext, useMode } from "./theme";
import { CssBaseline, ThemeProvider } from "@mui/material";

// React Query
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import Trending from "./pages/Trending";
import TopRated from "./pages/TopRated";
import GenresProvider from "./context/GenresContext";
import Upcoming from "./pages/Upcoming";
import Popular from "./pages/Popular";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route index element={<Home />} />

      <Route path="movies" element={<Movies />} />
      <Route path="tv-shows" element={<TvShows />} />
      <Route path="latest-additions" element={<LatestAdditions />} />
      <Route path="trending" element={<Trending />} />
      <Route path="top-rated" element={<TopRated />} />
      <Route path="upcoming" element={<Upcoming />} />
      <Route path="popular" element={<Popular />} />

      <Route path="*" element={<NotFoundPage />} />
    </Route>
  )
);

const MINUTE = 1000 * 60;
const client = new QueryClient({
  defaultOptions: {
    queries: {
      gcTime: MINUTE, // to make data save in cache to 10 minute
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
          <ReactQueryDevtools initialIsOpen={true} />
        </QueryClientProvider>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
