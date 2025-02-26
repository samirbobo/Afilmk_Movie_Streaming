/* eslint-disable react/prop-types */
import { useTheme } from "@emotion/react";
import { Box, Tab, Tabs } from "@mui/material";

const MediaTabs = ({ tabIndex, handleChange }) => {
  const theme = useTheme();

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
      >
        <Tab
          sx={{
            color: theme.palette.text.secondary,
            padding: { xs: "6px", md: "12px 16px" },
            textTransform: "capitalize",
            minWidth: { xs: "auto", md: 90 },
            transition: "all 0.3s ease-in-out",
            borderRadius: "50px",
            "&.Mui-selected": {
              color: theme.palette.text.primary,
              background: theme.palette.background.paper,
              transition: "all 0.3s ease-in-out",
            },
          }}
          label="Movies"
        />
        <Tab
          sx={{
            color: theme.palette.text.secondary,
            transition: "all 0.3s ease-in-out",
            padding: { xs: "6px", md: "12px 16px" },
            textTransform: "capitalize",
            minWidth: { xs: "auto", md: 90 },
            borderRadius: "50px",
            "&.Mui-selected": {
              color: theme.palette.text.primary,
              background: theme.palette.background.paper,
              transition: "all 0.3s ease-in-out",
            },
          }}
          label="TV Shows"
        />
      </Tabs>
    </Box>
  );
};

export default MediaTabs;
