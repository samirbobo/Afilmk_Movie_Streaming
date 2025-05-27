/* eslint-disable react/prop-types */
import { Box, Stack, useTheme } from "@mui/material";
import EastIcon from "@mui/icons-material/East";
import WestIcon from "@mui/icons-material/West";

const SliderArrowIcons = ({ prev, next }) => {
  const theme = useTheme();
  const style = {
    cursor: "pointer",
    p: "12px",
    borderRadius: "100%",
    background: theme.palette.background.default,
    border:
      theme.palette.mode === "dark" ? "1px solid #404040" : "1px solid #e5e5e5",
    width: "44px",
    height: "44px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    userSelect: "none",
  };

  return (
    <Stack
      sx={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 1,
      }}
    >
      <Box className={prev} sx={style}>
        <WestIcon sx={{ color: theme.palette.text.primary }} fontSize="small" />
      </Box>

      <Box className={next} sx={style}>
        <EastIcon sx={{ color: theme.palette.text.primary }} fontSize="small" />
      </Box>
    </Stack>
  );
};

export default SliderArrowIcons;
