/* eslint-disable react/prop-types */
import { Close } from "@mui/icons-material";
import logo from "../images/logo-transparent.png";
import {
  Box,
  Divider,
  Drawer,
  IconButton,
  Stack,
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
        "& .MuiDrawer-paper": {
          height: "100%",
          backgroundColor: theme.palette.background.default,
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
          // pt: 10,
        }}
      >
        {/* Header of Sidebar */}
        <Stack
          sx={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            pb: "40px",
            pr: "10px",
          }}
        >
          <Link
            to={"/"}
            style={{ flexGrow: 1 }}
            onClick={() => toggleDrawer(false)}
          >
            <img
              src={logo}
              alt="logo"
              style={{ height: "58px", width: "158px", objectFit: "cover" }}
            />
          </Link>

          <IconButton
            onClick={() => toggleDrawer(false)}
            sx={{
              transition: "0.3s",
              ":hover": { color: "red", transform: "rotate(180deg)" },
            }}
          >
            <Close />
          </IconButton>
        </Stack>

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
