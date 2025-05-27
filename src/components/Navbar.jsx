/* eslint-disable react/prop-types */
import { Menu, Search } from "@mui/icons-material";
import {
  AppBar,
  Box,
  IconButton,
  Slide,
  Toolbar,
  Typography,
  useScrollTrigger,
  useTheme,
} from "@mui/material";
import { cloneElement, useState } from "react";

import ToggleMode from "./ToggleMode";
import { UseGlobalGenres } from "../context/GenresContext";
import Links from "./Links";
import { Link, useLocation } from "react-router-dom";
import Sidebar from "./Sidebar";
import DialogSearch from "./DialogSearch";
import logo from "../images/logo-transparent.png";

// hide navbar animation when the user scroll down and show it again when the user scroll up
function HideOnScroll(props) {
  const { children, window, isHomePage } = props;

  // لاخفاء الناف بار لما المستخدام يعمل اسكرول لاسفل واظهاره عند التمرير لاعلي
  const hideTrigger = useScrollTrigger({
    target: window ? window() : undefined,
  });

  // shadow عند التمرير لاعلي يتم اظهار ال
  const elevationTrigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
    target: window ? window() : undefined,
  });

  return (
    <Slide appear={true} direction="down" in={!hideTrigger}>
      {cloneElement(children, {
        sx: {
          backgroundColor: isHomePage
            ? elevationTrigger
              ? "#523c7f" // بعد التمرير في الصفحة الرئيسية
              : "transparent" // أول الصفحة الرئيسية - شفاف
            : "#523c7f", // باقي الصفحات
          transition: "background-color 0.3s ease",
        },
      })}
    </Slide>
  );
}

const Navbar = (props) => {
  const theme = useTheme();
  const {
    movieGenres,
    isMoviesLoading,
    moviesError,
    tvShowGenres,
    isTvShowsLoading,
    tvShowsError,
  } = UseGlobalGenres();

  const [state, setState] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  const toggleDrawer = (open) => {
    setState(open);
  };

  const handleSearchToggle = () => {
    setSearchOpen((prevState) => !prevState);
  };

  const isScroll = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
  });

  const elevationTrigger = !isScroll && isHomePage;

  return (
    <>
      <HideOnScroll {...props} isHomePage={isHomePage}>
        <AppBar component="nav" elevation={elevationTrigger ? 0 : 4}>
          <Toolbar sx={{ pl: { xs: 0 } }}>
            {/* Logo */}
            <Link to={"/"} style={{ flexGrow: 1 }}>
              <img
                src={logo}
                alt="logo"
                style={{ height: "58px", width: "158px", objectFit: "cover" }}
              />
            </Link>

            {/* Links */}
            <Box
              component={"ul"}
              sx={{
                display: { xs: "none", sm: "flex" },
                alignItems: "center",
                gap: 2,
              }}
            >
              <Links
                title="Movies"
                data={
                  moviesError || isMoviesLoading
                    ? [{ id: "all", name: "All" }]
                    : [{ id: "all", name: "All" }, ...movieGenres]
                }
                style={moviesError || isMoviesLoading ? true : false}
              />
              <Links
                title="Tv Shows"
                data={
                  tvShowsError || isTvShowsLoading
                    ? [{ id: "all", name: "All" }]
                    : [{ id: "all", name: "All" }, ...tvShowGenres]
                }
                style={tvShowsError || isTvShowsLoading ? true : false}
              />
              <Link to={"/latest-additions"}>
                <Typography variant="body1" color="custom.white">
                  Latest Additions
                </Typography>
              </Link>
            </Box>

            <IconButton
              aria-label="open search"
              size="small"
              onClick={handleSearchToggle}
              sx={{
                ml: 1,
                color: theme.palette.custom.white,
              }}
            >
              <Search />
            </IconButton>

            <ToggleMode />

            <IconButton
              aria-label="open drawer"
              onClick={() => toggleDrawer(true)}
              sx={{
                display: { sm: "none" },
                color: theme.palette.custom.white,
              }}
            >
              <Menu />
            </IconButton>
          </Toolbar>
        </AppBar>
      </HideOnScroll>

      <Sidebar state={state} toggleDrawer={toggleDrawer} />

      <DialogSearch open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
};

export default Navbar;
