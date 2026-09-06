import { NavLink } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const Sidebar = () => {

  const { role, logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <aside className="sidebar">

      <div className="sidebar-brand">
        <h2>Factory</h2>
        <span>Maintenance</span>
      </div>

      <nav className="sidebar-nav">

        <NavLink to="/dashboard">
          🏠 Dashboard
        </NavLink>

        <NavLink to="/machines">
          🏭 Machines
        </NavLink>

        <NavLink to="/maintenance">
          🔧 Maintenance
        </NavLink>

        <NavLink to="/breakdowns">
          🚨 Breakdowns
        </NavLink>

        <NavLink to="/spare-parts">
          📦 Spare Parts
        </NavLink>

        <NavLink to="/notifications">
          🔔 Notifications
        </NavLink>

      </nav>

      <div className="sidebar-bottom">

        <div className="user-role">
          Role: {role}
        </div>

        <button
          type="button"
          onClick={handleLogout}
          className="logout-button"
        >
          🚪 Logout
        </button>

      </div>

    </aside>
  );
};

export default Sidebar;