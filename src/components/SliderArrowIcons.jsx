/* eslint-disable react/prop-types */
import { Box, Stack, useTheme } from "@mui/material";
import EastIcon from "@mui/icons-material/East";
import WestIcon from "@mui/icons-material/West";

const SliderArrowIcons = ({ prev, next }) => {
  const theme = useTheme();

  return (
    <Stack
      sx={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 1,
      }}
    >
      <Box
        className={prev}
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
        <WestIcon
          sx={{ color: theme.palette.text.secondary }}
          fontSize="small"
        />
      </Box>

      <Box
        className={next}
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
        <EastIcon
          sx={{ color: theme.palette.text.secondary }}
          fontSize="small"
        />
      </Box>
    </Stack>
  );
};

export default SliderArrowIcons;
