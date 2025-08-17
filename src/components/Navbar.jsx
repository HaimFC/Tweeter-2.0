import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import { supabase } from "../lib/supabaseClient.js";
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
      <NavLink to="/" className="nav-link">Home</NavLink>
      <NavLink to="/profile" className="nav-link">Profile</NavLink>
      {!user && (
        <>
          <NavLink to="/login" className="nav-link">Login</NavLink>
          <NavLink to="/signup" className="nav-link">Sign Up</NavLink>
        </>
      )}
      {user && (
        <button onClick={handleLogout} className="nav-link" style={{ background: "none", border: "none", cursor: "pointer" }}>
          Logout
        </button>
      )}
    </nav>
  );
}

export default Navbar;
