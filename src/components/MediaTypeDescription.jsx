/* eslint-disable react/prop-types */
import { Box, Typography, useTheme } from "@mui/material";

const MediaTypeDescription = ({ data }) => {
  const theme = useTheme();

  return (
    <Box
      component={"article"}
      sx={{
        background: theme.palette.background.paper,
        boxShadow:
          theme.palette.mode === "light"
            ? "0 2px 8px rgba(0, 0, 0, 0.12)"
            : "0 2px 10px rgba(255, 255, 255, 0.05)",
        p: { xs: "24px", md: "40px" },
        borderRadius: "10px",
        border:
          theme.palette.mode === "dark"
            ? "1px solid #404040"
            : "1px solid #e5e5e5",
      }}
    >
      <Typography
        variant="h3"
        sx={{
          color: theme.palette.text.primary,
          fontSize: { xs: 16, md: 18 },
          mb: { xs: "8px", md: "10px" },
        }}
      >
        Description
      </Typography>
      <Typography
        variant="body1"
        sx={{
          color: theme.palette.text.secondary,
          fontSize: { xs: 14, md: 16 },
        }}
      >
        {data.overview ||
          "An exciting journey filled with unexpected twists and unforgettable moments"}
      </Typography>
    </Box>
  );
};

export default MediaTypeDescription;
