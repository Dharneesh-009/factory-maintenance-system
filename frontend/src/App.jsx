import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import { AuthProvider } from "./context/AuthContext";

import ProtectedRoute from "./components/ProtectedRoute";

import Login from "./pages/Login";
import Register from "./pages/Register";

const DashboardPlaceholder = () => {
  return (
    <div style={{ padding: "40px" }}>
      <h1>Dashboard</h1>
      <p>Authentication successful.</p>
    </div>
  );
};

const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider>

        <Routes>

          {/* Public Routes */}

          <Route
            path="/login"
            element={<Login />}
          />

          <Route
            path="/register"
            element={<Register />}
          />


          {/* Protected Routes */}

          <Route element={<ProtectedRoute />}>

            <Route
              path="/dashboard"
              element={<DashboardPlaceholder />}
            />

          </Route>


          {/* Default Route */}

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