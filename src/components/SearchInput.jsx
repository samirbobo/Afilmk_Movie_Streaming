/* eslint-disable react/prop-types */
import { useEffect, useRef, useState } from "react";
import { TextField, InputAdornment, useTheme } from "@mui/material";
import { Search } from "@mui/icons-material";

// دالة التحقق التي وضعتها قبلًا
function validateSearchInput(input) {
  const trimmed = input.trim();

  if (trimmed.length === 0) {
    return "Please enter a search term.";
  }

  if (trimmed.length < 3) {
    return "Please enter at least 3 characters.";
  }

  if (/^\d+$/.test(trimmed)) {
    return "Searching with numbers only is not allowed.";
  }

  if (/^[^a-zA-Z0-9ء-ي\s]+$/.test(trimmed)) {
    return "Please enter a valid search term.";
  }

  if (trimmed.length > 50) {
    return "Search term is too long, please shorten it.";
  }

  return null;
}

function SearchInput({ onSearch }) {
  const theme = useTheme();
  const debounceTimeout = useRef(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState(null);

  function handleChange(e) {
    const val = e.target.value;
    setSearchTerm(val);

    const validationError = validateSearchInput(val);
    setError(validationError);

    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }

    // لو مفيش خطأ نرسل القيمة للخارج للبحث
    if (!validationError) {
      debounceTimeout.current = setTimeout(() => {
        onSearch(val.trim());
      }, 1000); // هنا 500 مللي ثانية تأخير
    } else {
      onSearch("");
    }
  }

  useEffect(() => {
    return () => {
      if (debounceTimeout.current) {
        clearTimeout(debounceTimeout.current);
      }
    };
  }, []);

  return (
    <TextField
      fullWidth
      placeholder="Search..."
      variant="outlined"
      value={searchTerm}
      onChange={handleChange}
      error={!!error}
      helperText={error}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <Search sx={{ color: theme.palette.text.secondary }} />
          </InputAdornment>
        ),
        sx: {
          px: "20px",
          background: "#171717",
          borderRadius: "8px",
          color: "rgb(212, 212, 212)",
          border: "0.8px solid rgb(64, 64, 64)",
          boxShadow: "rgba(0, 0, 0, 0.03) 0px 0px 5px 0px inset",
          fontSize: "15px",
          lineHeight: "40px",
          fontWeight: 400,
          height: 48,
          transition: "border-color 0.5s, box-shadow 0.5s",
          outline: "none",
          "& .MuiOutlinedInput-notchedOutline": {
            border: "none",
          },

          // تأثير الفوكس
          "&.Mui-focused": {
            outline: "none",
            boxShadow: "0 0 0 3px #404040", // ظل التركيز
          },
          "& input": {
            padding: 0,
          },
        },
      }}
      InputLabelProps={{
        sx: {
          color: "rgb(150, 150, 150)", // لو عايز تتحكم في لون اللابل
          "&.Mui-focused": {
            color: "#888", // لون اللابل وقت الفوكس
          },
        },
      }}
    />
  );
}

export default SearchInput;
