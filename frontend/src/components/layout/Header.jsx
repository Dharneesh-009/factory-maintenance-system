import useAuth from "../../hooks/useAuth";

const Header = () => {

  const { role } = useAuth();

  return (
    <header className="header">

      <div className="header-left">
        <h1>Factory Maintenance System</h1>
      </div>

      <div className="header-right">

        <div className="notification-icon">
          🔔
        </div>

        <div className="user-info">
          <span>Logged in as</span>
          <strong>{role}</strong>
        </div>

      </div>

    </header>
  );
};

export default Header;