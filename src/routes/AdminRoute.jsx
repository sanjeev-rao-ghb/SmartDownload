
import { Navigate } from "react-router-dom";

/* ===== GET ROLE FROM TOKEN ===== */

const getRoleFromToken = (token) => {

  try {

    const payload =
      JSON.parse(
        atob(token.split(".")[1])
      );

    return payload.role
      ?.toUpperCase();

  } catch (e) {

    return null;
  }
};

export default function AdminRoute({
  children
}) {

  const token =
    localStorage.getItem("token");

  /* ===== NO TOKEN ===== */

  if (!token) {

    return (
      <Navigate to="/login" />
    );
  }

  /* ===== GET ROLE ===== */

  const role =
    getRoleFromToken(token);

  console.log(role);

  /* ===== BLOCK USER ===== */

  if (role !== "ADMIN") {

    return (
      <Navigate to="/projects" />
    );
  }

  /* ===== ADMIN ACCESS ===== */

  return children;
}

