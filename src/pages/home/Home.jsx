// Sections
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

/* 
  Performance 39
  -- First Contentful Paint 5.9 s
  -- Largest Contentful Paint 10.7 s
  -- Total Blocking Time 370 ms
  -- Cumulative Layout Shift 0
  -- Speed Index 19.4 s

  Accessibility 89
  Best Practices 96
  SEO 83

  1- VITE v6.0.7  ready in 5308 ms

  after add loading="lazy" to images and lazy to pages
  Performance 27
  -- First Contentful Paint 5.1 s
  -- Largest Contentful Paint 9.9 s
  -- Total Blocking Time 920 ms
  -- Cumulative Layout Shift 0.023
  -- Speed Index 5.8 s

  after add meta description improve the Accessibility
  Accessibility 92
  Best Practices 96
  SEO 83
  2- VITE v6.0.7  ready in 533 ms 
*/