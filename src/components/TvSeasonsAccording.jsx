/* eslint-disable react/prop-types */
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import comingSoon from "../images/coming-soon-5.jpg";
import StarIcon from "@mui/icons-material/Star";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const TvSeasonsAccording = ({ data }) => {
  const theme = useTheme();
  const [expanded, setExpanded] = useState(false);
  const seasons = data?.seasons.length > 0 ? data?.seasons : [];

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const ArrowIcon = () => (
    <Box
      sx={{
        cursor: "pointer",
        p: "12px",
        borderRadius: "100%",
        background: theme.palette.background.paper,
        border:
          theme.palette.mode === "dark"
            ? "1px solid #404040"
            : "1px solid #e5e5e5",
        width: "44px",
        height: "44px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        userSelect: "none",
      }}
    >
      <ArrowDownwardIcon
        sx={{ color: theme.palette.text.secondary }}
        fontSize="small"
      />
    </Box>
  );

  return (
    <Box
      component={"article"}
      sx={{
        background: theme.palette.background.paper,
        boxShadow:
          theme.palette.mode === "light"
            ? "0 2px 8px rgba(0, 0, 0, 0.12)"
            : "0 2px 10px rgba(255, 255, 255, 0.05)",
        border:
          theme.palette.mode === "dark"
            ? "1px solid #404040"
            : "1px solid #e5e5e5",
        p: { xs: "24px", md: "30px" },
        borderRadius: { xs: "10px", md: "12px" },
      }}
    >
      <Typography
        variant="h3"
        sx={{
          color: theme.palette.text.primary,
          fontSize: { xs: 18, md: 20 },
          mb: { xs: "20px", md: "30px" },
        }}
      >
        Seasons and Episodes
      </Typography>

      <Stack
        sx={{
          flexDirection: "column",
          gap: 2,
          maxHeight: "425px",
          overflowY: "auto",
          pr: 0.5,
          "&::-webkit-scrollbar": {
            width: "6px",
          },
          "&::-webkit-scrollbar-track": {
            background: theme.palette.background.default,
            borderRadius: "10px",
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: theme.palette.text.secondary,
            borderRadius: "10px",
            border: theme.palette.background.default,
          },
          "&::-webkit-scrollbar-thumb:hover": {
            backgroundColor: "#aaa",
          },
        }}
      >
        {seasons.map((season, index) => {
          const isOpen = expanded === `season${index}`;
          return (
            <Box
              key={season.id}
              sx={{
                p: { xs: "16px 20px", md: "20px 40px" },
                borderRadius: "10px",
                background: theme.palette.background.default,
                border:
                  theme.palette.mode === "dark"
                    ? "1px solid #404040"
                    : "1px solid #e5e5e5",
              }}
            >
              <Accordion
                sx={{ background: "inherit", boxShadow: "none" }}
                expanded={isOpen}
                onChange={handleChange(`season${index}`)}
                disableGutters
                square
              >
                <AccordionSummary
                  expandIcon={<ArrowIcon />}
                  aria-controls="panel-content"
                  id="panel-header"
                  sx={{ p: 0 }}
                >
                  <Typography
                    variant="h4"
                    color="text.primary"
                    sx={{ fontSize: { xs: "16px", md: "18px" } }}
                  >
                    {season?.name || "Unnamed Season"}
                    <Typography
                      component="span"
                      sx={{
                        ml: { xs: "6px", md: "8px" },
                        fontSize: { xs: "14px", md: "16px" },
                      }}
                      color="text.secondary"
                    >
                      - {season?.episode_count ? season?.episode_count : 0}{" "}
                      Episodes
                    </Typography>
                  </Typography>
                </AccordionSummary>

                {/* Framer Motion Animation on AccordionDetails */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="content"
                      initial={{ opacity: 0, height: 0, y: -20 }}
                      animate={{ opacity: 1, height: "auto", y: 0 }}
                      exit={{
                        opacity: 0,
                        y: -20,
                        height: 0,
                        transition: {
                          opacity: { duration: 0.2, ease: "easeInOut" },
                          y: { duration: 0.2, ease: "easeInOut" },
                          height: {
                            duration: 0.4,
                            ease: "easeInOut",
                            delay: 0.4, // تأخير الارتفاع لحد ما الـ opacity تكمل
                          },
                        },
                      }}
                      transition={{
                        opacity: {
                          duration: 0.4,
                          delay: 0.1,
                          ease: "easeInOut",
                        },
                        y: { duration: 0.4, delay: 0.1, ease: "easeInOut" },
                        height: { duration: 0.4, ease: "easeInOut" },
                      }}
                      style={{ overflow: "hidden" }}
                    >
                      <AccordionDetails
                        sx={{
                          display: "flex",
                          flexDirection: { xs: "column", lg: "row" },
                          alignItems: { xs: "center", lg: "start" },
                          gap: "18px",
                          p: { xs: "20px", md: "30px 0 40px" },
                        }}
                      >
                        <img
                          src={
                            season?.poster_path
                              ? `https://image.tmdb.org/t/p/original${season.poster_path}`
                              : comingSoon
                          }
                          alt={season.name}
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = comingSoon;
                          }}
                          style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                            maxWidth: "172px",
                            maxHeight: "250px",
                            borderRadius: "12px",
                          }}
                        />
                        <Box>
                          <Stack
                            flexDirection={"row"}
                            alignItems={"center"}
                            gap={1.5}
                            mb={"14px"}
                          >
                            <Typography
                              sx={{
                                color: theme.palette.text.primary,
                                p: "6px 12px",
                                borderRadius: "50px",
                                background: theme.palette.background.paper,
                                border:
                                  theme.palette.mode === "dark"
                                    ? "1px solid #404040"
                                    : "1px solid #e5e5e5",
                                width: "fit-content",
                                fontSize: 14,
                                display: "flex",
                                alignItems: "center",
                                gap: 0.5,
                              }}
                            >
                              <StarIcon
                                fontSize="small"
                                sx={{ color: "#ffac00" }}
                              />
                              {season?.vote_average.toFixed(1)}
                            </Typography>
                            <Typography
                              variant="body1"
                              color="text.primary"
                              fontSize={"16px"}
                              flex={1}
                            >
                              {season?.air_date}
                            </Typography>
                          </Stack>

                          <Typography
                            color="text.secondary"
                            sx={{ fontSize: { xs: 14, md: 16 } }}
                          >
                            {data?.overview}
                          </Typography>
                        </Box>
                      </AccordionDetails>
                    </motion.div>
                  )}
                </AnimatePresence>
              </Accordion>
            </Box>
          );
        })}
      </Stack>
    </Box>
  );
};

export default TvSeasonsAccording;
