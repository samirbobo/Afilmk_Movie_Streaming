/* eslint-disable react/prop-types */
import { Box, Typography, useTheme } from "@mui/material";

const MediaTypeDescription = ({ data }) => {
  const theme = useTheme();
  return (
    <Box
      component={"article"}
      sx={{
        background: "#1A1A1A",
        p: "40px",
        borderRadius: "10px",
        border: "1px solid #262626",
      }}
    >
      <Typography
        variant="h3"
        sx={{
          color: theme.palette.text.secondary,
          fontSize: 18,
          mb: "10px",
        }}
      >
        Description
      </Typography>
      <Typography
        variant="body1"
        sx={{ color: theme.palette.text.primary, fontSize: 16 }}
      >
        {data.overview ||
          "An exciting journey filled with unexpected twists and unforgettable moments"}
      </Typography>
    </Box>
  );
};

export default MediaTypeDescription;
