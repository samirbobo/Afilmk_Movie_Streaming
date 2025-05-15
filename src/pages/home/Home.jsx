// Sections
import Hero from "./sections/Hero";
import Trending from "./sections/Trending";
import TopRated from "./sections/TopRated";
import Upcoming from "./sections/Upcoming";
import Popular from "./sections/Popular";
import { useEffect } from "react";

const Home = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <>
      <Hero />
      <Trending />
      <TopRated />
      <Upcoming />
      <Popular />
    </>
  );
};

export default Home;
