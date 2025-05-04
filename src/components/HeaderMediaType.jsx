/* eslint-disable react/prop-types */
import { Box, Breadcrumbs, Typography } from "@mui/material";
import Link from "@mui/material/Link";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { useLocation, useNavigate } from "react-router-dom";

const HeaderMediaType = ({ title, subTitle }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const pathNames = location.pathname.split("/");

  function handleClick(event, link) {
    event.preventDefault();
    navigate(`/${link}`);
  }

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
          color: "hsla(0,0%,100%,.75)",
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

      <Breadcrumbs
        sx={{ marginBottom: { xs: "24px", md: "32px", xl: "48px" } }}
        separator={<NavigateNextIcon fontSize="small" />}
        aria-label="breadcrumb"
        component={"div"}
      >
        {pathNames.map((path, index) => {
          const decodedPath = decodeURIComponent(path); // Decode the path
          if (index === pathNames.length - 1) {
            return (
              <Typography
                key={path}
                sx={{ color: "text.primary", textTransform: "capitalize" }}
              >
                {decodedPath}
              </Typography>
            );
          } else {
            return (
              <Link
                underline="hover"
                key={path === "" ? "home" : decodedPath}
                color="inherit"
                textTransform={"capitalize"}
                href={path}
                onClick={(event) => handleClick(event, path)}
              >
                {path === "" ? "home" : decodedPath}
              </Link>
            );
          }
        })}
      </Breadcrumbs>
    </Box>
  );
};

export default HeaderMediaType;
