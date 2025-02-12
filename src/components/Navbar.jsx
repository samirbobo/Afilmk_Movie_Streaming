/* eslint-disable react/prop-types */
import { Close, Menu, Search } from "@mui/icons-material";
import {
  AppBar,
  Box,
  CssBaseline,
  Divider,
  Drawer,
  IconButton,
  Slide,
  Toolbar,
  Typography,
  useScrollTrigger,
} from "@mui/material";
import { cloneElement, useState } from "react";

import ToggleMode from "./ToggleMode";
import { UseGlobalGenres } from "../context/GenresContext";
import Links from "./Links";
import AccordionLinks from "./AccordionLinks";
import { useNavigate } from "react-router-dom";

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
  const {
    movieGenres,
    isMoviesLoading,
    moviesError,
    tvShowGenres,
    isTvShowsLoading,
    tvShowsError,
  } = UseGlobalGenres();

  const navigate = useNavigate();
  const [state, setState] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState(open);
  };

  const handleSearchToggle = () => {
    setSearchOpen((prevState) => !prevState);
  };

  if (isMoviesLoading) {
    return "Loading..";
  }

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />

      <HideOnScroll {...props}>
        <AppBar component="nav">
          <Toolbar>
            {/* Logo */}
            <Typography
              variant="h6"
              sx={{ flexGrow: 1, cursor: "pointer" }}
              onClick={() => navigate("/")}
            >
              Aflamk
            </Typography>

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
                  moviesError
                    ? [{ id: "all", name: "All" }]
                    : [{ id: "all", name: "All" }, ...movieGenres.data.genres]
                }
              />
              <Links
                title="Tv Shows"
                data={
                  tvShowsError
                    ? [{ id: "all", name: "All" }]
                    : [{ id: "all", name: "All" }, ...tvShowGenres.data.genres]
                }
              />
              <Typography variant="body1" sx={{ cursor: "pointer" }}>
                Latest Additions
              </Typography>
            </Box>

            <IconButton
              aria-label="open search"
              size="small"
              onClick={handleSearchToggle}
              sx={{ ml: 1 }}
            >
              <Search />
            </IconButton>

            <ToggleMode />

            <IconButton
              aria-label="open drawer"
              onClick={toggleDrawer(true)}
              sx={{ display: { sm: "none" } }}
            >
              <Menu />
            </IconButton>
          </Toolbar>
        </AppBar>
      </HideOnScroll>

      <Drawer
        sx={{
          ".MuiPaper-root.css-k1yagv-MuiPaper-root-MuiDrawer-paper": {
            height: "100%",
          },
        }}
        anchor={"left"}
        open={state}
        onClose={toggleDrawer(false)}
      >
        <Box
          sx={{
            width: "90vw",
            maxWidth: 450,
            mx: "auto",
            mt: 6,
            position: "relative",
            pt: 10,
          }}
        >
          <IconButton
            onClick={toggleDrawer(false)}
            sx={{
              position: "absolute",
              top: 0,
              right: 10,
              transition: "0.3s",
              ":hover": { color: "red", transform: "rotate(180deg)" },
            }}
          >
            <Close />
          </IconButton>

          <AccordionLinks
            title="Movies"
            links={
              moviesError
                ? [{ id: "all", name: "All" }]
                : [{ id: "all", name: "All" }, ...movieGenres.data.genres]
            }
          />
          <AccordionLinks
            title="Tv Shows"
            links={
              tvShowsError
                ? [{ id: "all", name: "All" }]
                : [{ id: "all", name: "All" }, ...tvShowGenres.data.genres]
            }
          />
          <Divider />
          <Typography
            variant="h6"
            sx={{ cursor: "pointer", py: "12px", px: 2 }}
          >
            Latest Additions
          </Typography>
        </Box>
      </Drawer>
    </Box>
  );
};

export default Navbar;
