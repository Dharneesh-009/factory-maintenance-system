import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import { AuthProvider } from "./context/AuthContext";

import ProtectedRoute from "./components/ProtectedRoute";
import MainLayout from "./components/layout/MainLayout";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Machines from "./pages/Machines/Machines";

const App = () => {
  return (
    <BrowserRouter>

      <AuthProvider>

        <Routes>

          {/* =========================
              PUBLIC ROUTES
          ========================= */}

          <Route
            path="/login"
            element={<Login />}
          />

          <Route
            path="/register"
            element={<Register />}
          />


          {/* =========================
              PROTECTED ROUTES
          ========================= */}

          <Route element={<ProtectedRoute />}>

            <Route element={<MainLayout />}>

              <Route
                path="/dashboard"
                element={<Dashboard />}
              />
<Route
  path="/machines"
  element={<Machines />}
/>
            </Route>

          </Route>


          {/* =========================
              DEFAULT ROUTE
          ========================= */}

          <Route
            path="/"
            element={
              <Navigate
                to="/login"
                replace
              />
            }
          />

        </Routes>

      </AuthProvider>

    </BrowserRouter>
  );
};

export default App;