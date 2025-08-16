import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { supabase } from "../lib/supabaseClient";
import "./Navbar.css";

function Navbar() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <NavLink to="/" end className="nav-link">
        Home
      </NavLink>
      <NavLink to="/profile" className="nav-link">
        Profile
      </NavLink>
      {user ? (
        <button onClick={handleLogout} className="nav-link" style={{ background: "none", border: "none", cursor: "pointer" }}>
          Logout
        </button>
      ) : (
        <NavLink to="/login" className="nav-link">
          Login
        </NavLink>
      )}
    </nav>
  );
}

export default Navbar;
