
import { Link, useNavigate, useLocation } from "react-router-dom";
import "../styles/Navbar.css";

export default function Navbar() {

  const navigate = useNavigate();
  const location = useLocation();

  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  const isHome = location.pathname === "/";

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");

    alert("Logged out successfully");

    navigate("/");
  };

  return (
    <nav className="navbar">

      {/* LOGO */}
      <div className="logo">
        <Link to="/">SMARTDOWNLOAD</Link>
      </div>

     

      {/* NAVIGATION */}
      <div className="nav-links">

        <Link to="/">Home</Link>

        <Link to="/projects">
          Projects
        </Link>

        {token && role === "ADMIN" && (
          <Link to="/admin/dashboard">
            Admin
          </Link>
        )}

        
        {/* LOGIN */}
        {isHome && !token && (
          <Link to="/login" className="login-btn">
            Login
          </Link>
        )}

        {/* LOGOUT */}
        {token && (
          <button
            className="logout-btn"
            onClick={logout}
          >
            Logout
          </button>
        )}

      </div>
    </nav>
  );
}
