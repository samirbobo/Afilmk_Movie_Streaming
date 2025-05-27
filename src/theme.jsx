import { createContext, useState, useMemo } from "react";
import { createTheme } from "@mui/material/styles";

export const getDesignTokens = (mode) => ({
  palette: {
    mode,
    ...(mode === "light"
      ? {
          // palette values for light mode
          background: {
            default: "#F8F6F4",
            paper: "#fff",
          },
          text: {
            primary: "#171717", // لون النصوص الأساسية
            secondary: "#404040", // لون النصوص الفرعية
          },
        }
      : {
          // palette values for dark mode
          background: {
            default: "#171717", // deep black background
            paper: "#262626", // card/modals background
          },
          text: {
            primary: "#FFFFFF", // main text
            secondary: "#B3B3B3", // sub text
          },
        }),

    custom: {
      favBackLight: "#950101",
      favBackDark: "#3D0000",
      white: "#ffffff",
      navBack: "#523c7f",
    },
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
