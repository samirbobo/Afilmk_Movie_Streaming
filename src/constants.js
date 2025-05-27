export const sortOptions = [
  { value: "", label: "Default Sort" },
  { value: "popularity.desc", label: "Most Popular" },
  { value: "popularity.asc", label: "Least Popular" },
  { value: "vote_average.desc", label: "Highest Rated" },
  { value: "vote_average.asc", label: "Lowest Rated" },
];

export const movieSortOptions = [
  ...sortOptions,
  { value: "primary_release_date.desc", label: "Newest Release" },
  { value: "primary_release_date.asc", label: "Oldest Release" },
];

export const tvSortOptions = [
  ...sortOptions,
  { value: "first_air_date.desc", label: "Newest Release" },
  { value: "first_air_date.asc", label: "Oldest Release" },
];

export const upComingMovieOptions = [
  { value: "", label: "Default Sort" },
  { value: "popularity.desc", label: "Most Popular" },
  { value: "popularity.asc", label: "Least Popular" },
  { value: "primary_release_date.desc", label: "Coming Soon" },
  { value: "primary_release_date.asc", label: "Coming First" },
];

export const upComingTvOptions = [
  { value: "", label: "Default Sort" },
  { value: "popularity.desc", label: "Most Popular" },
  { value: "popularity.asc", label: "Least Popular" },
  { value: "first_air_date.desc", label: "Coming Soon" },
  { value: "first_air_date.asc", label: "Coming First" },
];

export const ratingOptions = [
  { value: "", label: "All Ratings" },
  { value: 9, label: "9+ (Excellent)" },
  { value: 8, label: "8+ (Very Good)" },
  { value: 7, label: "7+ (Good)" },
  { value: 6, label: "6+ (Average)" },
  { value: 5, label: "5+ (Below Average)" },
];

export const footerLinks = [
  {
    title: "Explore",
    links: [
      { label: "Home", link: "/" },
      { label: "Movies List", link: "/movies" },
      { label: "TV Shows", link: "/tv-shows" },
      { label: "Latest Additions", link: "/latest-additions" },
    ],
  },

  {
    title: "Categories",
    links: [
      { label: "Top Rated", link: "/top-rated" },
      { label: "Trending Now", link: "/trending" },
      { label: "Upcoming", link: "/upcoming" },
      { label: "Popular Shows", link: "/popular" },
    ],
  },

  {
    title: "Movies Genres",
    links: [
      { label: "Action", link: "movies/action" },
      { label: "Animation", link: "movies/animation" },
      { label: "Horror", link: "movies/horror" },
      { label: "Comedy", link: "movies/comedy" },
    ],
  },

  {
    title: "Tv Show Genres",
    links: [
      { label: "Drama", link: "tv-shows/drama" },
      { label: "Animation", link: "tv-shows/animation" },
      { label: "Kids", link: "tv-shows/kids" },
      { label: "Comedy", link: "tv-shows/comedy" },
    ],
  },
];
