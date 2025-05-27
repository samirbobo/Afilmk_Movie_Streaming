/* eslint-disable react/prop-types */
import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import SearchInput from "./SearchInput";
import { useEffect, useState } from "react";
import axios from "axios";
import { API_KEY } from "../baseUrl";
import { useQuery } from "@tanstack/react-query";
import comingSoon from "../images/coming-soon-5.jpg";
import StarIcon from "@mui/icons-material/Star";
import { Link, useNavigate } from "react-router-dom";
import ErrorMessage from "./ErrorMessage";
import { AnimatePresence, motion } from "framer-motion";

const DialogSearch = ({ open, onClose }) => {
  const theme = useTheme();
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState([]);
  const matches = useMediaQuery("(max-width: 767.9px)");
  const navigate = useNavigate();

  const handleClose = () => {
    setSearchTerm("");
    setResults([]);
    onClose();
  };

  async function handleSearch(query) {
    setSearchTerm(query);
  }

  const { data, isLoading, error } = useQuery({
    queryKey: ["search", searchTerm],
    queryFn: () =>
      axios.get(`https://api.themoviedb.org/3/search/multi`, {
        params: {
          api_key: API_KEY,
          query: searchTerm,
        },
      }),
    select: (res) =>
      res.data.results.filter((item) => item.media_type !== "person"),
    enabled: searchTerm.length >= 3,
    keepPreviousData: false,
  });

  const handleViewAll = () => {
    navigate(`/search?query=${encodeURIComponent(searchTerm)}`);
    handleClose();
  };

  useEffect(() => {
    if (searchTerm.length < 3) {
      setResults([]);
    } else if (data) {
      setResults(data);
    }
  }, [searchTerm, data]);

  return (
    <AnimatePresence>
      {open && (
        <Dialog
          open={open}
          onClose={handleClose}
          maxWidth="sm"
          fullWidth
          PaperComponent={motion.div}
          PaperProps={{
            initial: { opacity: 0, scale: 0.9, y: -100 },
            animate: { opacity: 1, scale: 1, y: 0 },
            exit: {
              opacity: 0,
              scale: 0.9,
              y: -100,
            },
            transition: {
              duration: 0.3,
              ease: "easeInOut",
            },
            sx: {
              background: theme.palette.background.paper,
              border:
                theme.palette.mode === "dark"
                  ? "1px solid #404040"
                  : "1px solid #e5e5e5",
              borderRadius: "0.5rem",
            },
          }}
        >
          <DialogTitle
            sx={{
              px: "20px",
              py: "12px",
              display: "flex",
              justifyContent: "space-between",
              borderBottom:
                theme.palette.mode === "dark"
                  ? "1px solid #404040"
                  : "1px solid #e5e5e5",
            }}
          >
            Quick Search
            <IconButton onClick={handleClose}>
              <CloseIcon />
            </IconButton>
          </DialogTitle>

          <DialogContent dividers sx={{ p: "1.25rem" }}>
            <SearchInput onSearch={handleSearch} />

            {isLoading && (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  py: 4,
                }}
              >
                <CircularProgress
                  sx={{ color: theme.palette.custom.favBackLight }}
                  size="3rem"
                />
              </Box>
            )}

            {error && <ErrorMessage />}

            {!isLoading &&
              !error &&
              results.length === 0 &&
              searchTerm.length >= 3 && (
                <Typography
                  variant="h6"
                  color="text.primary"
                  mt={"1.25rem"}
                  textAlign={"center"}
                >
                  No results found 🕵️‍♂️
                </Typography>
              )}

            {!isLoading &&
              results &&
              results.slice(0, 4).map((item, index) => (
                <Link
                  to={`/${item.media_type}/${item.name || item.title}/${
                    item.id
                  }`}
                  onClick={handleClose}
                  key={item.id}
                >
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: { xs: "column", md: "row" },
                      alignItems: "center",
                      gap: "16px",
                      p: "15px 20px",
                      borderBottom:
                        index !== results.slice(0, 4).length - 1 &&
                        (theme.palette.mode === "dark"
                          ? "1px solid rgb(133 122 122)"
                          : "1px solid #e5e5e5"),
                    }}
                  >
                    <img
                      src={
                        item?.poster_path
                          ? `https://image.tmdb.org/t/p/original${item.poster_path}`
                          : comingSoon
                      }
                      alt={item.name || item.title}
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = comingSoon;
                      }}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        maxWidth: "100px",
                        maxHeight: "150px",
                        borderRadius: "12px",
                      }}
                    />
                    <Stack
                      flexDirection={"column"}
                      gap={1.25}
                      alignItems={{ xs: "center", md: "start" }}
                      flex={1}
                    >
                      {(item?.title || item?.name) && (
                        <Typography
                          variant="h6"
                          color="text.primary"
                          sx={{
                            fontSize: { xs: 16, md: 20 },
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            maxWidth: { xs: "65vw", md: "380px" },
                          }}
                        >
                          {item.title || item.name}
                        </Typography>
                      )}
                      {(item?.release_date || item?.first_air_date) && (
                        <Typography variant="body1" color="text.primary">
                          {item?.release_date || item?.first_air_date}
                        </Typography>
                      )}
                      {item?.media_type && !matches && (
                        <Typography
                          variant="body2"
                          sx={{
                            color: "custom.white",
                            backgroundColor: "custom.favBackLight",
                            padding: "5px 8px",
                            borderRadius: "50px",
                            fontSize: "14px",
                            fontWeight: 800,
                            textOverflow: "ellipsis",
                            textWrapMode: "nowrap",
                            overflow: "hidden",
                          }}
                        >
                          {item.media_type}
                        </Typography>
                      )}
                      {matches && (
                        <Stack flexDirection={"row"} gap={1}>
                          {item?.media_type && (
                            <Typography
                              variant="body2"
                              sx={{
                                color: "custom.white",
                                backgroundColor: "custom.favBackLight",
                                padding: "5px 8px",
                                borderRadius: "50px",
                                fontSize: "14px",
                                fontWeight: 800,
                                textOverflow: "ellipsis",
                                textWrapMode: "nowrap",
                                overflow: "hidden",
                              }}
                            >
                              {item.media_type}
                            </Typography>
                          )}
                          {item?.vote_average > 0 && (
                            <Typography
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                gap: 0.25,
                                color: "text.primary",
                                backgroundColor: "custom.favBackLight",
                                padding: "3px 6px",
                                borderRadius: "50px",
                                fontSize: "12px",
                                fontWeight: 500,
                              }}
                            >
                              {item.vote_average.toFixed(1)}
                              <StarIcon sx={{ fontSize: 14 }} />
                            </Typography>
                          )}
                        </Stack>
                      )}
                    </Stack>

                    {item?.vote_average > 0 && !matches && (
                      <Typography
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: 0.25,
                          color: "custom.white",
                          backgroundColor: "custom.favBackLight",
                          padding: "3px 6px",
                          borderRadius: "50px",
                          fontSize: "12px",
                          fontWeight: 500,
                        }}
                      >
                        {item?.vote_average.toFixed(1)}
                        <StarIcon sx={{ fontSize: 14 }} />
                      </Typography>
                    )}
                  </Box>
                </Link>
              ))}
          </DialogContent>

          {results.length > 4 && (
            <DialogActions sx={{ p: "10px 20px" }}>
              <Button
                variant="contained"
                onClick={handleViewAll}
                sx={{
                  p: "4px 10px",
                  width: "100%",
                  height: "40px",
                  borderRadius: "0.5rem",
                  backgroundColor: "custom.favBackLight",
                  color: "custom.white",
                  "&:hover": {
                    backgroundColor: "custom.favBackDark",
                  },
                }}
              >
                View all results
              </Button>
            </DialogActions>
          )}
        </Dialog>
      )}
    </AnimatePresence>
  );
};

export default DialogSearch;
