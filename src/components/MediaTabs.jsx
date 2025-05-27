/* eslint-disable react/prop-types */
import { useTheme } from "@emotion/react";
import { Box, Tab, Tabs } from "@mui/material";

const MediaTabs = ({ tabIndex, handleChange }) => {
  const theme = useTheme();
  const style = {
    color: theme.palette.text.secondary,
    transition: "all 0.3s ease-in-out",
    padding: { xs: "8px 6px", sm: "10px 12px" },
    textTransform: "capitalize",
    minWidth: "auto",
    minHeight: "auto",
    borderRadius: "50px",
    "&.Mui-selected": {
      color: theme.palette.custom.white,
      backgroundColor: theme.palette.custom.favBackDark,
      transition: "all 0.3s ease-in-out",
    },
  };

  return (
    <Box
      sx={{
        border: "2px solid",
        borderColor: theme.palette.text.secondary,
        borderRadius: "50px",
      }}
    >
      <Tabs
        value={tabIndex}
        onChange={handleChange}
        centered
        TabIndicatorProps={{ sx: { display: "none" } }}
        sx={{ minHeight: "auto" }}
      >
        <Tab sx={style} label="Movies" />
        <Tab sx={style} label="TV Shows" />
      </Tabs>
    </Box>
  );
};

export default MediaTabs;
