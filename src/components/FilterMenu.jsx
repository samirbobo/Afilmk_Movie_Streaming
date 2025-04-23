import {
  Autocomplete,
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
} from "@mui/material";
import { useState } from "react";

const FilterMenu = () => {
  const [age, setAge] = useState("");
  const [sort, setSort] = useState("");
  const [year, setYear] = useState("");
  const yearsArray = [2000, 2001];

  const handleChangeAge = (event) => {
    setAge(event.target.value);
  };

  const handleChangeSort = (event) => {
    setSort(event.target.value);
  };
  const handleChangeYear = (event) => {
    setYear(event.target.value);
  };

  const applyFilters = () => {
    console.log("Age: ", age);
    console.log("Sort: ", sort);
    console.log("Year: ", year);
  };

  return (
    <Stack
      flexDirection={"row"}
      alignItems={"center"}
      justifyContent={"space-between"}
      gap={2}
    >
      <Stack flexDirection={"row"} alignItems={"center"} gap={2} flex={1}>
        <FormControl size="small" fullWidth>
          <InputLabel id="demo-simple-select-label">Rating</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={age}
            label="Age"
            onChange={handleChangeAge}
          >
            <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
          </Select>
        </FormControl>
        <FormControl size="small" fullWidth>
          <InputLabel id="sort-label">Sort By</InputLabel>
          <Select
            labelId="sort-label"
            value={sort}
            onChange={handleChangeSort}
            label="Sort By"
          >
            <MenuItem value="popularity.desc">Most Popular</MenuItem>
            <MenuItem value="vote_average.desc">Top Rated</MenuItem>
            <MenuItem value="release_date.desc">Newest</MenuItem>
          </Select>
        </FormControl>
        <Autocomplete
          fullWidth
          size="small"
          options={yearsArray}
          value={year}
          onChange={handleChangeYear}
          renderInput={(params) => <TextField {...params} label="Year" />}
          disablePortal
        />
      </Stack>

      <Button
        variant="contained"
        onClick={applyFilters}
        color="primary"
        sx={{ mt: 2 }}
      >
        Apply Filters
      </Button>
    </Stack>
  );
};

export default FilterMenu;
