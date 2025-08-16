import { NavLink } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  return (
    <nav className="navbar">
      <NavLink to="/" end className="nav-link">
        Home
      </NavLink>
      <NavLink to="/profile" className="nav-link">
        Profile
      </NavLink>
    </nav>
  );
}

export default Navbar;
