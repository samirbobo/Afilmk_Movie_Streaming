import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import Navbar from "./Navbar";
import { Toolbar } from "@mui/material";
import GenresProvider from "../context/GenresContext";

const RootLayout = () => {
  return (
    <>
      <GenresProvider>
        <Navbar />
      </GenresProvider>

      <main style={{height: "999px"}}>
        <Toolbar />
        <Outlet />
      </main>

      <Footer />
    </>
  );
};

export default RootLayout;
