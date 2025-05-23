/* eslint-disable react/prop-types */
import { Box, Typography, useTheme } from "@mui/material";
import BreadcrumbsLinks from "./BreadcrumbsLinks";

const HeaderMediaType = ({ title, subTitle }) => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        borderBottom: "1px solid hsla(0, 0%, 100%, .2)",
        marginBottom: { xs: "24px", md: "32px", xl: "48px" },
      }}
    >
      <Typography
        variant="h1"
        sx={{
          fontSize: { xs: "36px", md: "56px" },
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
          color:
            theme.palette.mode === "dark"
              ? "hsla(0,0%,100%,.75)"
              : theme.palette.text.primary,
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
