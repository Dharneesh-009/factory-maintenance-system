
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
import Maintenance from "./pages/Maintenance/Maintenance";
import Breakdowns from "./pages/Breakdowns/Breakdowns";
import SpareParts from "./pages/spareparts/SpareParts";
import Notifications from "./pages/Notifications/Notifications";

const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {/* Public routes */}
          <Route
            path="/login"
            element={<Login />}
          />

          <Route
            path="/register"
            element={<Register />}
          />

          {/* Protected routes with shared layout */}
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

              <Route
                path="/maintenance"
                element={<Maintenance />}
              />

              <Route
                path="/breakdowns"
                element={<Breakdowns />}
              />

              <Route
  path="/spare-parts"
  element={<SpareParts />}
/>


<Route
  path="/notifications"
  element={<Notifications />}
/>
            </Route>
          </Route>

          {/* Default route */}
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
