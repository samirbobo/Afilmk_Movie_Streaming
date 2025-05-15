import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import Navbar from "./Navbar";
import { Suspense } from "react";
import ScrollTop from "./ScrollTop";
import { Fab } from "@mui/material";
import { KeyboardArrowUp } from "@mui/icons-material";

const RootLayout = () => {
  return (
    <>
      <Navbar />

      <main>
        <Suspense fallback="Loading from RootLayout">
          <Outlet />
          <ScrollTop>
            <Fab color="primary" size="small" aria-label="scroll back to top">
              <KeyboardArrowUp />
            </Fab>
          </ScrollTop>
        </Suspense>
      </main>

      <Footer />
    </>
  );
};

export default RootLayout;
