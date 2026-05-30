import { createContext, useState } from "react";

export const AuthContext = createContext();

/* ===== GET ROLE FROM TOKEN ===== */

const getRoleFromToken = (token) => {

  try {

    const payload =
      JSON.parse(
        atob(token.split(".")[1])
      );

    return payload.role;

  } catch (err) {

    return null;
  }
};

export function AuthProvider({
  children
}) {

  const [token, setToken] =
    useState(
      localStorage.getItem("token")
    );

  /* ===== LOGIN ===== */

  const login = (jwtToken) => {

    /* SAVE TOKEN */

    localStorage.setItem(
      "token",
      jwtToken
    );

    /* GET ROLE */

    const role =
      getRoleFromToken(jwtToken);

    /* SAVE ROLE */

    localStorage.setItem(
      "role",
      role
    );

    setToken(jwtToken);
  };

  /* ===== LOGOUT ===== */

  const logout = () => {

    localStorage.removeItem(
      "token"
    );

    localStorage.removeItem(
      "role"
    );

    setToken(null);
  };

  return (

    <AuthContext.Provider
      value={{
        token,
        login,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}