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
