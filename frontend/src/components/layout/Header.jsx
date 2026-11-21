import { Link } from "react-router-dom";
import { Bell, Menu } from "lucide-react";
import useAuth from "../../hooks/useAuth";

const Header = ({ onMenuClick, isMenuOpen = false }) => {
  const { role } = useAuth();

  return (
    <header className="app-header">
      <div className="app-header__left">
        <button
          type="button"
          className="app-header__menu"
          onClick={onMenuClick}
          aria-label={isMenuOpen ? "Close navigation" : "Open navigation"}
          aria-controls="app-sidebar"
          aria-expanded={isMenuOpen}
        >
          <Menu size={20} aria-hidden="true" />
        </button>
        <span className="app-header__product">Factory Maintenance System</span>
      </div>

      <div className="app-header__right">
        <Link
          to="/notifications"
          className="app-header__icon-button"
          aria-label="Open notifications"
        >
          <Bell size={18} aria-hidden="true" />
        </Link>

        <div className="app-header__user">
          <span className="app-header__avatar" aria-hidden="true">
            {role ? role.charAt(0) : "?"}
          </span>
          <div className="app-header__user-text">
            <span>Logged in as</span>
            <strong>{role}</strong>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
