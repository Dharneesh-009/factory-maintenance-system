
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import { AuthProvider } from "./context/AuthContext";
import { ToastProvider } from "./components/feedback/ToastProvider";
import { ConfirmProvider } from "./components/feedback/ConfirmProvider";

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
import Home from "./pages/Home";


const App = () => {
  return (
    <BrowserRouter>
      <ToastProvider>
        <ConfirmProvider>
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
          {/* Public landing page */}
<Route
  path="/"
  element={<Home />}
/>
        </Routes>
          </AuthProvider>
        </ConfirmProvider>
      </ToastProvider>
    </BrowserRouter>
  );
};

export default App;
