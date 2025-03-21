import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import Navbar from "./Navbar";
import { Suspense } from "react";

const RootLayout = () => {
  return (
    <>
      <Navbar />

      <main>
        <Suspense fallback="Loading from RootLayout">
          <Outlet />
        </Suspense>
      </main>

      <Footer />
    </>
  );
};

export default RootLayout;
