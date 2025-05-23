/* eslint-disable react/prop-types */
import { Breadcrumbs, Link, Typography } from "@mui/material";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { useLocation, useNavigate } from "react-router-dom";

const BreadcrumbsLinks = ({ page = null }) => {
  const location = useLocation();
  const navigate = useNavigate();
  let result = [];
  const pathNames = location.pathname.split("/");
  let accumulatedPath = ""; // لبناء المسارات التراكمية

  if (!page) {
    result = pathNames;
  } else {
    const from = location.state?.from;
    const fromList = Array.isArray(from) ? from : from ? [from] : [];
    const movieTitle = decodeURIComponent(pathNames[2]);
    result = ["", ...fromList, movieTitle];
  }

  function handleClick(event, path) {
    event.preventDefault();
    navigate(path);
  }

  return (
    <Breadcrumbs
      sx={{ marginBottom: { xs: "24px", md: "32px", xl: "48px" } }}
      separator={<NavigateNextIcon fontSize="small" />}
      aria-label="breadcrumb"
      component="div"
    >
      {result.map((path, index) => {
        const isLast = index === result.length - 1;
        const decodedPath = path === "" ? "home" : decodeURIComponent(path);
        accumulatedPath += index === 0 ? "" : `/${encodeURIComponent(path)}`;
        const reallyPath = accumulatedPath;

        return isLast ? (
          <Typography
            key={index}
            sx={{
              color: "text.primary",
              textTransform: "capitalize",
              fontSize: { xs: 14, md: 16 },
            }}
          >
            {decodedPath}
          </Typography>
        ) : (
          <Link
            underline="hover"
            key={index}
            sx={{
              fontSize: { xs: 14, md: 16 },
              color: "inherit",
              textTransform: "capitalize",
            }}
            href={accumulatedPath || "/"}
            onClick={(event) => handleClick(event, reallyPath || "/")}
          >
            {decodedPath}
          </Link>
        );
      })}
    </Breadcrumbs>
  );
};

export default BreadcrumbsLinks;
