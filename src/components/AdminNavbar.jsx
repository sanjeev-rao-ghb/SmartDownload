
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

import "../styles/AdminNavbar.css";

export default function AdminNavbar() {

  const navigate = useNavigate();

  const [search, setSearch] = useState("");

  const logout = () => {

    localStorage.removeItem("token");
    localStorage.removeItem("role");

    alert("Logged out");

    navigate("/");
  };

  const links = [

    {
      name: "Dashboard",
      path: "/admin",
    },

    {
      name: "Projects",
      path: "/admin/projectsAdmin",
    },

    {
      name: "Add Project",
      path: "/admin/add-project",
    },

    {
      name: "Users",
      path: "/admin/users",
    },

    {
      name: "Orders",
      path: "/admin/orders",
    },

    {
      name: "Payments",
      path: "/admin/payments",
    },
  ];

  const filteredLinks = links.filter((link) =>
    link.name
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (

    <nav className="admin-nav">

      {/* ===== LOGO ===== */}
      <h2 className="admin-logo">
        ADMIN PANEL
      </h2>

      {/* ===== SEARCH ===== */}
      <div className="admin-search">

        <input
          type="text"
          placeholder="Search admin pages..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
        />

      </div>

      {/* ===== LINKS ===== */}
      <div className="admin-links">

        {filteredLinks.map((link) => (

          <Link
            key={link.path}
            to={link.path}
          >
            {link.name}
          </Link>

        ))}

        <button
          onClick={logout}
          className="admin-logout"
        >
          Logout
        </button>

      </div>

    </nav>
  );
}

