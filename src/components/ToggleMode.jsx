/* eslint-disable react/prop-types */
import { useContext } from "react";
import { ColorModeContext } from "../theme";
import { useTheme } from "@emotion/react";
import { IconButton } from "@mui/material";
import { DarkModeOutlined, LightModeOutlined } from "@mui/icons-material";

const ToggleMode = ({ scrollTrigger }) => {
  const colorMode = useContext(ColorModeContext);
  const theme = useTheme();
  const iconColor = !scrollTrigger ? "#fff" : "inherit";

  return (
    <>
      {theme.palette.mode === "light" ? (
        <IconButton
          aria-label="Dark Mode"
          onClick={() => {
            localStorage.setItem(
              "mode",
              theme.palette.mode === "dark" ? "light" : "dark"
            );
            colorMode.toggleColorMode();
          }}
          sx={{ color: iconColor }}
        >
          <DarkModeOutlined />
        </IconButton>
      ) : (
        <IconButton
          aria-label="Light Mode"
          onClick={() => {
            localStorage.setItem(
              "mode",
              theme.palette.mode === "dark" ? "light" : "dark"
            );
            colorMode.toggleColorMode();
          }}
          sx={{ color: iconColor }}
        >
          <LightModeOutlined />
        </IconButton>
      )}
    </>
  );
};

export default ToggleMode;
