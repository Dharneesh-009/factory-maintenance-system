import { NavLink } from "react-router-dom";
import {
  Bell,
  Factory,
  LayoutDashboard,
  LogOut,
  Package,
  TriangleAlert,
  Wrench,
} from "lucide-react";
import useAuth from "../../hooks/useAuth";

export const NAV_ITEMS = [
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/machines", label: "Machines", icon: Factory },
  { to: "/maintenance", label: "Maintenance", icon: Wrench },
  { to: "/breakdowns", label: "Breakdowns", icon: TriangleAlert },
  { to: "/spare-parts", label: "Spare Parts", icon: Package },
  { to: "/notifications", label: "Notifications", icon: Bell },
];

const Sidebar = ({ isOpen = false, onNavigate }) => {
  const { role, logout } = useAuth();

  return (
    <aside
      id="app-sidebar"
      className={`app-sidebar${isOpen ? " is-open" : ""}`}
      aria-label="Primary navigation"
    >
      <div className="app-sidebar__brand">
        <span className="app-sidebar__logo" aria-hidden="true">
          <Factory size={20} />
        </span>
        <div className="app-sidebar__brand-text">
          <span className="app-sidebar__title">Factory Maintenance System</span>
          <span className="app-sidebar__subtitle">Maintenance management</span>
        </div>
      </div>

      <nav className="app-sidebar__nav">
        {NAV_ITEMS.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            className="app-sidebar__link"
            onClick={onNavigate}
          >
            <Icon size={18} aria-hidden="true" />
            <span>{label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="app-sidebar__footer">
        <div className="app-sidebar__role">
          Signed in as <strong>{role}</strong>
        </div>

        <button
          type="button"
          className="app-sidebar__logout"
          onClick={() => logout()}
        >
          <LogOut size={16} aria-hidden="true" />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
