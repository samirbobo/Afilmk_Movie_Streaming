import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <nav>
      <ul
        style={{
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
        }}
      >
        <li>
          <NavLink to="movies">Movies</NavLink>
        </li>
        <li>
          <NavLink to="tv-shows">Tv Shows</NavLink>
        </li>
        <li>
          <NavLink to="latest-additions">Latest Additions</NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
