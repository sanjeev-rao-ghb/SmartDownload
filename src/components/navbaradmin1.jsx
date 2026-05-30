import {
  Link,
  useNavigate,
  useLocation
} from "react-router-dom";

import "../styles/navbaradmin1.css";

export default function Navbar() {

  const navigate = useNavigate();

  const location = useLocation();

  /* ===== TOKEN ===== */

  const token =
    localStorage.getItem("token");

  /* ===== ROLE ===== */

  const role =
    localStorage
      .getItem("role")
      ?.toUpperCase();

  /* ===== HOME PAGE ===== */

  const isHome =
    location.pathname === "/";

  /* ===== LOGOUT ===== */

  const logout = () => {

    localStorage.removeItem("token");

    localStorage.removeItem("role");

    alert("Logged out successfully");

    navigate("/");
  };

  return (

    <nav className="navbar">

      {/* ===== LOGO ===== */}

      <div className="logo">

        <Link to="/">
          SMARTDOWNLOAD
        </Link>

      </div>

      {/* ===== NAV LINKS ===== */}

      <div className="nav-links">

        {/* ===== HOME ===== */}

        <Link to="/">
          Home
        </Link>

        {/* ===== USER PROJECTS ===== */}

        {role === "USER" && (

          <Link to="/projects">
            Projects
          </Link>

        )}

        {/* ===== ADMIN PROJECTS ===== */}

        {role === "ADMIN" && (

          <Link to="/admin/projectsAdmin">
            Admin Projects
          </Link>

        )}

        {/* ===== ADMIN DASHBOARD ===== */}

        {token &&
          role === "ADMIN" && (

          <Link to="/admin">
            Dashboard
          </Link>

        )}

        {/* ===== USER ORDERS ===== */}

        {token &&
          role === "USER" && (

          <Link to="/my-orders">
            My Orders
          </Link>

        )}

        {/* ===== LOGIN ===== */}

        {isHome &&
          !token && (

          <Link
            to="/login"
            className="login-btn"
          >
            Login
          </Link>

        )}

        {/* ===== LOGOUT ===== */}

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