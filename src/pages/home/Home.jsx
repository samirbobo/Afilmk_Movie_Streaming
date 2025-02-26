import Hero from "./sections/Hero";
import Trending from "./sections/Trending";
import TopRated from "./sections/TopRated";
import Upcoming from "./sections/Upcoming";
import Popular from "./sections/Popular";

const Home = () => {
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