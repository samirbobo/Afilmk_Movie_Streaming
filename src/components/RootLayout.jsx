import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import Navbar from "./Navbar";
import GenresProvider from "../context/GenresContext";

const RootLayout = () => {
  return (
    <>
      <GenresProvider>
        <Navbar />
      </GenresProvider>

      <main>
        <Outlet />
      </main>

      <Footer />
    </>
  );
};

export default RootLayout;
