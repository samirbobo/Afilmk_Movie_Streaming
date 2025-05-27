import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import Navbar from "./Navbar";
import { Suspense } from "react";
import ScrollTop from "./ScrollTop";
import { Box, Fab, useTheme } from "@mui/material";
import { KeyboardArrowUp } from "@mui/icons-material";

const RootLayout = () => {
  const theme = useTheme();

  return (
    <>
      <Navbar />

      <Box component={"main"} sx={{ minHeight: "calc(100vh - 418px)" }}>
        <Suspense fallback="Loading from RootLayout">
          <Outlet />

          <ScrollTop>
            <Fab
              sx={{
                background: theme.palette.custom.favBackLight,
                color: "custom.white",
                "&:hover": {
                  background: theme.palette.custom.favBackLight,
                },
              }}
              size="small"
              aria-label="scroll back to top"
            >
              <KeyboardArrowUp />
            </Fab>
          </ScrollTop>
        </Suspense>
      </Box>
      <Footer />
    </>
  );
};

export default RootLayout;
