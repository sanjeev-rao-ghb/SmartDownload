
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import {
  AuthProvider
} from "./context/AuthContext";

/* ===== PUBLIC PAGES ===== */

import Home from "./pages/Home";

import Login from "./pages/Login";

import Register from "./pages/Register";

import Projects from "./pages/Projects";

import ForgotPassword from "./pages/ForgotPassword";

import ResetPassword from "./pages/ResetPassword";

/* ===== ADMIN ===== */

import AdminRoute
from "./routes/AdminRoute";

import AdminLayout
from "./layouts/AdminLayout";

import ProjectsAdmin
from "./pages/admin/projectsAdmin";

import AdminDashboard
from "./pages/admin/AdminDashboard";

import AdminUsers
from "./pages/admin/AdminUsers";

import AdminOrders
from "./pages/admin/AdminOrders";

import AdminPayments
from "./pages/admin/AdminPayments";

import AdminAddProject
from "./pages/admin/AdminAddProject";

function App() {

  return (

    <AuthProvider>

      <BrowserRouter>

        <Routes>

          {/* ================================= */}
          {/* PUBLIC ROUTES */}
          {/* ================================= */}

          <Route
            path="/"
            element={<Home />}
          />

          <Route
            path="/login"
            element={<Login />}
          />

          <Route
            path="/register"
            element={<Register />}
          />

          <Route
            path="/forgot-password"
            element={<ForgotPassword />}
          />

          <Route
            path="/reset-password"
            element={<ResetPassword />}
          />

          {/* ================================= */}
          {/* USER ROUTE */}
          {/* ================================= */}

          <Route
            path="/projects"
            element={<Projects />}
          />

          {/* ================================= */}
          {/* ADMIN ROUTES */}
          {/* ================================= */}

          <Route
            path="/admin"
            element={

              <AdminRoute>

                <AdminLayout />

              </AdminRoute>
            }
          >

            {/* ===== DASHBOARD ===== */}

            <Route
              index
              element={
                <AdminDashboard />
              }
            />

            {/* ===== ADMIN PROJECTS ===== */}

            <Route
              path="projectsAdmin"
              element={
                <ProjectsAdmin />
              }
            />

            {/* ===== ADD PROJECT ===== */}

            <Route
              path="add-project"
              element={
                <AdminAddProject />
              }
            />

            {/* ===== USERS ===== */}

            <Route
              path="users"
              element={
                <AdminUsers />
              }
            />

            {/* ===== ORDERS ===== */}

            <Route
              path="orders"
              element={
                <AdminOrders />
              }
            />

            {/* ===== PAYMENTS ===== */}

            <Route
              path="payments"
              element={
                <AdminPayments />
              }
            />

          </Route>

        </Routes>

      </BrowserRouter>

    </AuthProvider>
  );
}

export default App;

