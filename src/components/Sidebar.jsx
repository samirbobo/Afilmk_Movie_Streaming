/* eslint-disable react/prop-types */
import { Close } from "@mui/icons-material";
import {
  Box,
  Divider,
  Drawer,
  IconButton,
  Typography,
  useTheme,
} from "@mui/material";
import AccordionLinks from "./AccordionLinks";
import { UseGlobalGenres } from "../context/GenresContext";
import { Link } from "react-router-dom";

const Sidebar = ({ state, toggleDrawer }) => {
  const theme = useTheme();
  const { movieGenres, moviesError, tvShowGenres, tvShowsError } =
    UseGlobalGenres();

  return (
    <Drawer
      sx={{
        ".MuiPaper-root.css-k1yagv-MuiPaper-root-MuiDrawer-paper": {
          height: "100%",
        },
      }}
      anchor={"left"}
      open={state}
      onClose={() => toggleDrawer(false)}
    >
      <Box
        sx={{
          width: "90vw",
          maxWidth: 300,
          mx: "auto",
          mt: 6,
          position: "relative",
          pt: 10,
        }}
      >
        <IconButton
          onClick={() => toggleDrawer(false)}
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
          toggleDrawer={toggleDrawer}
          links={
            moviesError
              ? [{ id: "all", name: "All" }]
              : [{ id: "all", name: "All" }, ...movieGenres]
          }
        />
        <AccordionLinks
          title="Tv Shows"
          toggleDrawer={toggleDrawer}
          links={
            tvShowsError
              ? [{ id: "all", name: "All" }]
              : [{ id: "all", name: "All" }, ...tvShowGenres]
          }
        />
        <Divider />
        <Link
          to={"/latest-additions"}
          onClick={() => {
            toggleDrawer(false);
          }}
        >
          <Typography
            variant="h6"
            sx={{
              py: "12px",
              px: 2,
              color: theme.palette.text.primary,
            }}
          >
            Latest Additions
          </Typography>
        </Link>
      </Box>
    </Drawer>
  );
};

export default Sidebar;
