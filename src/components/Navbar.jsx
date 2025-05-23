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

// hide navbar animation when the user scroll down and show it again when the user scroll up
function HideOnScroll(props) {
  const { children, window } = props;

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
          background: !elevationTrigger && "transparent", // Gradient when at the top
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

  if (isMoviesLoading || isTvShowsLoading) {
    return "Loading..";
  }

  return (
    <>
      <HideOnScroll {...props}>
        <AppBar component="nav" elevation={elevationTrigger ? 0 : 4}>
          <Toolbar>
            {/* Logo */}
            <Link to={"/"} style={{ flexGrow: 1 }}>
              <Typography
                variant="h6"
                sx={{
                  color: elevationTrigger ? "#fff" : theme.palette.text.primary,
                }}
              >
                Aflamk
              </Typography>
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
                scrollTrigger={elevationTrigger}
                data={
                  moviesError
                    ? [{ id: "all", name: "All" }]
                    : [{ id: "all", name: "All" }, ...movieGenres]
                }
              />
              <Links
                title="Tv Shows"
                scrollTrigger={elevationTrigger}
                data={
                  tvShowsError
                    ? [{ id: "all", name: "All" }]
                    : [{ id: "all", name: "All" }, ...tvShowGenres]
                }
              />
              <Link to={"/latest-additions"}>
                <Typography
                  variant="body1"
                  sx={{
                    color: elevationTrigger
                      ? "#fff"
                      : theme.palette.text.primary,
                  }}
                >
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
                color: elevationTrigger ? "#fff" : theme.palette.text.primary,
              }}
            >
              <Search />
            </IconButton>

            <ToggleMode scrollTrigger={elevationTrigger} />

            <IconButton
              aria-label="open drawer"
              onClick={() => toggleDrawer(true)}
              sx={{
                display: { sm: "none" },
                color: elevationTrigger ? "#fff" : theme.palette.text.primary,
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
