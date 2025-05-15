/* eslint-disable react/prop-types */
import {
  Autocomplete,
  Button,
  FormControl,
  MenuItem,
  Select,
  Stack,
  TextField,
  useTheme,
} from "@mui/material";
import { useEffect, useState } from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import {
  movieSortOptions,
  ratingOptions,
  tvSortOptions,
  upComingMovieOptions,
  upComingTvOptions,
} from "../constants";

const FilterMenu = ({ onApplyFilters, section, sortData }) => {
  const theme = useTheme();
  const [rate, setRate] = useState("");
  const [sort, setSort] = useState("");
  const [year, setYear] = useState(null);
  const [mediaType, setMediaType] = useState("Movies");
  const startYear = 1990;
  const endYear = new Date().getFullYear();
  let yearsArray = [];
  const sortOptions =
    sortData ??
    (section === "Upcoming"
      ? mediaType === "Movies"
        ? upComingMovieOptions
        : upComingTvOptions
      : mediaType === "Movies"
      ? movieSortOptions
      : tvSortOptions);

  useEffect(() => {
    setSort("");
  }, [mediaType]);

  for (let i = endYear; i >= startYear; i--) {
    yearsArray.push(i);
  }

  const handleChangeRate = (event) => {
    setRate(event.target.value);
    if (!sort && !year && !event.target.value) {
      const filters = section
        ? { rate: "", sort: "", year: null, mediaType: "Movies" }
        : { rate: "", sort: "", year: null };
      onApplyFilters(filters);
    }
  };

  const handleChangeSort = (event) => {
    setSort(event.target.value);
    if (!rate && !year && !event.target.value) {
      const filters = section
        ? { rate: "", sort: "", year: null, mediaType: "Movies" }
        : { rate: "", sort: "", year: null };
      onApplyFilters(filters);
    }
  };

  const handleChangeYear = (value) => {
    setYear(value);
    if (!sort && !rate && !value) {
      const filters = section
        ? { rate: "", sort: "", year: null, mediaType: "Movies" }
        : { rate: "", sort: "", year: null };
      onApplyFilters(filters);
    }
  };

  const handleChangeMediaType = (event) => {
    setMediaType(event.target.value);
    if (!rate && !year && event.target.value === "Movies") {
      const filters = { rate: "", sort: "", year: null, mediaType: "Movies" };
      onApplyFilters(filters);
    }
  };

  const applyFilters = () => {
    const filters = section
      ? { rate, sort, year, mediaType }
      : { rate, sort, year };
    onApplyFilters(filters);
  };

  const clearFilters = () => {
    setRate("");
    setSort("");
    setYear("");
    setMediaType("Movies");
    const filters = section
      ? { rate: "", sort: "", year: null, mediaType: "Movies" }
      : { rate: "", sort: "", year: null };
    onApplyFilters(filters);
  };

  const style = {
    borderRadius: "50px",
    backgroundColor: "#ffffff47",
    "& .MuiOutlinedInput-notchedOutline": {
      borderColor: "transparent",
    },
    "&:hover .MuiOutlinedInput-notchedOutline": {
      borderColor: "transparent",
    },
    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: "transparent",
    },
  };

  const styleWidth = {
    minWidth: 150,
    maxWidth: 250,
    width: "100%",
  };

  return (
    <Stack
      flexDirection={{ xs: "column", sm: "row" }}
      alignItems={"center"}
      justifyContent={{ xs: "center", sm: "space-between" }}
      flexWrap={"wrap"}
      gap={2}
      mb={4}
    >
      <Stack
        flexDirection={"row"}
        alignItems={"center"}
        justifyContent={{ xs: "center", sm: "flex-start" }}
        flexWrap={{ xs: "wrap", sm: "nowrap" }}
        gap={2}
        flex={1}
      >
        {section !== "top-rated" && section !== "Upcoming" && (
          <FormControl size="small" sx={styleWidth} variant="outlined">
            <Select
              displayEmpty
              value={rate}
              onChange={handleChangeRate}
              IconComponent={KeyboardArrowDownIcon}
              renderValue={(selected) => {
                if (!selected) {
                  return <p>Rating</p>; // Placeholder style
                }
                const selectedOption = ratingOptions.find(
                  (option) => option.value === selected
                );
                return selectedOption ? selectedOption.label : selected;
              }}
              sx={style}
            >
              {ratingOptions.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        )}
        {section !== "popular" && section !== "LatestAdditions" && (
          <FormControl size="small" sx={styleWidth} variant="outlined">
            <Select
              displayEmpty
              value={sort}
              onChange={handleChangeSort}
              IconComponent={KeyboardArrowDownIcon}
              renderValue={(selected) => {
                if (!selected) {
                  return <p>Sort</p>;
                }
                const selectedOption = sortOptions.find(
                  (option) => option.value === selected
                );
                return selectedOption ? selectedOption.label : selected;
              }}
              sx={style}
            >
              {sortOptions.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        )}
        {section && (
          <FormControl size="small" sx={styleWidth} variant="outlined">
            <Select
              displayEmpty
              value={mediaType}
              onChange={handleChangeMediaType}
              IconComponent={KeyboardArrowDownIcon}
              sx={style}
            >
              <MenuItem value={"Movies"}>Movies</MenuItem>
              <MenuItem value={"TV Shows"}>TV Shows</MenuItem>
            </Select>
          </FormControl>
        )}
        {section !== "Upcoming" && section !== "LatestAdditions" && (
          <Autocomplete
            sx={styleWidth}
            size="small"
            options={yearsArray}
            value={year}
            onChange={(event, newValue) => handleChangeYear(newValue)}
            disablePortal
            popupIcon={<KeyboardArrowDownIcon />} // ← تغيير الأيقونة هنا
            getOptionLabel={(option) => option.toString()}
            renderInput={(params) => (
              <TextField
                {...params}
                placeholder="Year" // ← بدل label
                variant="outlined"
                InputLabelProps={{ shrink: false }} // ← يمنع تحرك الـ label لفوق
                sx={{
                  "& .MuiOutlinedInput-root": {
                    cursor: "pointer",
                    ...style,
                    "& input::placeholder": {
                      color: theme.palette.text.primary,
                      opacity: 1,
                    },
                    paddingRight: "35px",
                  },
                }}
              />
            )}
          />
        )}
      </Stack>

      <Stack
        flexDirection={"row"}
        alignItems={"center"}
        gap={2}
        flexWrap={"wrap"}
        justifyContent={"center"}
      >
        <Button
          disabled={!rate && !sort && !year && mediaType === "Movies"}
          variant="contained"
          onClick={applyFilters}
          color="primary"
        >
          Apply Filters
        </Button>
        <Button
          disabled={!rate && !sort && !year && mediaType === "Movies"}
          variant="contained"
          onClick={clearFilters}
          color="info"
        >
          Clear Filters
        </Button>
      </Stack>
    </Stack>
  );
};

export default FilterMenu;
