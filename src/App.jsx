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

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route index element={<Home />} />

      <Route path="movies" element={<Movies />} />
      <Route path="tv-shows" element={<TvShows />} />
      <Route path="latest-additions" element={<LatestAdditions />} />

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
          <RouterProvider router={router} />
          <ReactQueryDevtools initialIsOpen={true} />
        </QueryClientProvider>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
