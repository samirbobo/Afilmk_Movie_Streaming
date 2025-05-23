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
import StarOutlineRoundedIcon from "@mui/icons-material/StarOutlineRounded";
import { useState } from "react";

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
        background: "#141414",
        border: "1px solid #262626",
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
        background: "#1A1A1A",
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
            width: "8px",
          },
          "&::-webkit-scrollbar-track": {
            background: "#1c1c1c",
            borderRadius: "10px",
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "#888",
            borderRadius: "10px",
            border: "2px solid #1c1c1c",
          },
          "&::-webkit-scrollbar-thumb:hover": {
            backgroundColor: "#aaa",
          },
        }}
      >
        {seasons.map((season, index) => (
          <Box
            key={season.id}
            sx={{
              p: { xs: "16px 20px", md: "20px 40px" },
              borderRadius: "10px",
              background: "#0F0F0F",
              border: "1px solid #262626",
            }}
          >
            <Accordion
              sx={{ background: "inherit" }}
              expanded={expanded === `season${index}`}
              onChange={handleChange(`season${index}`)}
            >
              {/* Name of Season and count of Episodes */}
              <AccordionSummary
                expandIcon={<ArrowIcon />}
                aria-controls="panel2-content"
                id="panel2-header"
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
              <AccordionDetails
                sx={{
                  display: "flex",
                  flexDirection: { xs: "column", lg: "row" },
                  alignItems: { xs: "center", lg: "start" },
                  gap: "18px",
                  p: { xs: "20px", md: "30px 0 40px" },
                  background: { xs: "#141414", md: "inherit" },
                  borderRadius: { xs: "8px", md: "0px" },
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
                    e.target.src = comingSoon; // صورة بديلة عند فشل التحميل
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
                        border: "1px solid #262626",
                        width: "fit-content",
                        fontSize: 14,
                        display: "flex",
                        alignItems: "center",
                        gap: 0.5,
                      }}
                    >
                      <StarOutlineRoundedIcon fontSize="small" />{" "}
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
            </Accordion>
          </Box>
        ))}
      </Stack>
    </Box>
  );
};

export default TvSeasonsAccording;
