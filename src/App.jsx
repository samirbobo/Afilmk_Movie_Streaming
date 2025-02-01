import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import RootLayout from "./components/RootLayout";
import Home from "./pages/Home";
import NotFoundPage from "./pages/NotFoundPage";
import Movies from "./pages/Movies";
import TvShows from "./pages/TvShows";
import LatestAdditions from "./pages/LatestAdditions";

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

function App() {
  return <RouterProvider router={router} />;
}

export default App;
