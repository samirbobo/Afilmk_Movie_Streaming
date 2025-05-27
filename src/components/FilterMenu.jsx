/* eslint-disable react/prop-types */
import {
  Autocomplete,
  Button,
  Fade,
  FormControl,
  MenuItem,
  Paper,
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
import { motion } from "framer-motion";

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

  const MotionPaper = motion.create(Paper);

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
    if (!sort && !rate && value == null) {
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
    setYear(null);
    setMediaType("Movies");
    const filters = section
      ? { rate: "", sort: "", year: null, mediaType: "Movies" }
      : { rate: "", sort: "", year: null };
    onApplyFilters(filters);
  };

  const style = {
    borderRadius: "50px",
    backgroundColor: theme.palette.background.paper,
    boxShadow:
      theme.palette.mode === "light"
        ? "0 2px 8px rgba(0, 0, 0, 0.12)"
        : "0 2px 10px rgba(255, 255, 255, 0.05)",
    ".MuiOutlinedInput-notchedOutline": {
      border:
        theme.palette.mode === "dark"
          ? "1px solid #404040"
          : "1px solid #e5e5e5",
    },
    "&:hover .MuiOutlinedInput-notchedOutline": {
      border:
        theme.palette.mode === "dark"
          ? "1px solid #404040"
          : "1px solid #e5e5e5",
    },
    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
      border:
        theme.palette.mode === "dark"
          ? "1px solid #404040"
          : "1px solid #e5e5e5",
    },
  };

  const styleWidth = {
    minWidth: 150,
    maxWidth: 250,
    width: "100%",
  };

  const animation = {
    disablePortal: true,
    anchorOrigin: {
      vertical: "bottom",
      horizontal: "left",
    },
    transformOrigin: {
      vertical: "top",
      horizontal: "left",
    },
    PaperProps: {
      component: MotionPaper,
      initial: { opacity: 0, y: 10, scale: 0.95 },
      animate: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
          opacity: { duration: 0.15, ease: "easeOut" },
          y: {
            type: "spring",
            stiffness: 300,
            damping: 15,
            duration: 0.2,
          },
          scale: { duration: 0.15, ease: "easeOut" },
        },
      },
      exit: {
        opacity: 0,
        y: 10,
        scale: 0.95,
        transition: {
          duration: 0.1,
          ease: "easeIn",
        },
      },
      sx: {
        boxShadow: (theme) =>
          theme.palette.mode === "light"
            ? "0 2px 8px rgba(0,0,0,0.15)"
            : "0 2px 8px rgba(255,255,255,0.1)",
        mt: 0.5,
        transformOrigin: "top center",
      },
    },
    TransitionComponent: Fade,
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
        {/* Rating */}
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
              MenuProps={animation}
            >
              {ratingOptions.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        )}

        {/* Sort */}
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
              MenuProps={animation}
            >
              {sortOptions.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        )}

        {/* Media Type  */}
        {section && (
          <FormControl size="small" sx={styleWidth} variant="outlined">
            <Select
              displayEmpty
              value={mediaType}
              onChange={handleChangeMediaType}
              IconComponent={KeyboardArrowDownIcon}
              sx={style}
              MenuProps={animation}
            >
              <MenuItem value={"Movies"}>Movies</MenuItem>
              <MenuItem value={"TV Shows"}>TV Shows</MenuItem>
            </Select>
          </FormControl>
        )}

        {/* Year */}
        {section !== "Upcoming" && section !== "LatestAdditions" && (
          <Autocomplete
            sx={styleWidth}
            size="small"
            options={yearsArray}
            value={year}
            onChange={(event, newValue) => handleChangeYear(newValue)}
            disablePortal
            popupIcon={<KeyboardArrowDownIcon />} // ← تغيير الأيقونة هنا
            getOptionLabel={(option) => String(option || "")}
            componentsProps={{
              paper: animation.PaperProps,
            }}
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

      {/* filter Actions */}
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
          sx={{
            background: theme.palette.custom.favBackLight,
            color: "custom.white",
            transition: "0.2s linear",
            "&:hover": {
              background: theme.palette.custom.favBackDark,
            },
          }}
        >
          Apply Filters
        </Button>
        <Button
          disabled={!rate && !sort && !year && mediaType === "Movies"}
          variant="contained"
          onClick={clearFilters}
          sx={{
            background: theme.palette.custom.navBack,
            color: "#fff",
            transition: "0.2s linear",
            "&:hover": {
              background: "#673bc0",
            },
          }}
        >
          Clear Filters
        </Button>
      </Stack>
    </Stack>
  );
};

export default FilterMenu;
