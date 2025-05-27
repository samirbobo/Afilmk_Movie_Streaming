/* eslint-disable react/prop-types */
import { Box, Typography, useTheme } from "@mui/material";
import BreadcrumbsLinks from "./BreadcrumbsLinks";

const HeaderMediaType = ({ title, subTitle }) => {
  const theme = useTheme();
  return (
    <Box
      sx={{
        borderBottom:
          theme.palette.mode === "dark"
            ? "1px solid hsla(0, 0%, 100%, .2)"
            : "1px solid #c7c2c2",
        marginBottom: { xs: "24px", md: "32px", xl: "48px" },
      }}
    >
      <Typography
        variant="h1"
        sx={{
          fontSize: { xs: "28px", md: "44px", lg: "56px" },
          transition: "0.3s linear",
          fontWeight: 900,
          lineHeight: { xs: "40px", md: "64px" },
          margin: 0,
          textTransform: "capitalize",
        }}
      >
        {title}
      </Typography>
      <Typography
        variant="h2"
        sx={{
          color: "text.secondary",
          fontSize: { xs: "14px", md: "16px" },
          fontWeight: 500,
          lineHeight: { xs: "20px", md: "24px" },
          marginTop: { xs: "16px", md: "12px" },
          marginBottom: { xs: "16px", md: "12px" },
          maxWidth: "790px",
        }}
      >
        {subTitle}
      </Typography>

      <BreadcrumbsLinks />
    </Box>
  );
};

export default HeaderMediaType;
