import { createContext, useState, useMemo } from "react";
import { createTheme } from "@mui/material/styles";

export const getDesignTokens = (mode) => ({
  palette: {
    mode,
    ...(mode === "light"
      ? {
          // palette values for light mode
          primary: {
            main: "#C4DFDF",
          },
          secondary: {
            main: "#D2E9E9",
          },
          background: {
            default: "#F8F6F4",
            paper: "#E3F4F4",
          },
          text: {
            primary: "#333333", // لون النصوص الأساسية
            secondary: "#666666", // لون النصوص الفرعية
          },
        }
      : {
          // palette values for dark mode
          primary: {
            main: "#950101",
          },
          secondary: {
            main: "#FF0000",
          },
          background: {
            default: "#000000", // #141414
            paper: "#3D0000",
          },
          text: {
            primary: "#FFFFFF",
            secondary: "#A0A0A0", // #B0B0B0
          },
        }),
  },

  breakpoints: {
    values: {
      xs: 0,
      sm: 640,
      md: 768,
      lg: 1024,
      xl: 1280,
      "2xl": 1536,
    },
  },
  typography: {
    fontFamily: '"Inter", sans-serif',
  },
});

// context for color mode
export const ColorModeContext = createContext({
  toggleColorMode: () => {},
});

export const useMode = () => {
  const [mode, setMode] = useState(
    localStorage.getItem("mode") ? localStorage.getItem("mode") : "light"
  );

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () =>
        setMode((prev) => (prev === "light" ? "dark" : "light")),
    }),
    []
  );

  const theme = useMemo(() => createTheme(getDesignTokens(mode)), [mode]);
  return [theme, colorMode];
};
