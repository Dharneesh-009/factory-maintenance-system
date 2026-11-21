import { useState } from "react";
import { Outlet } from "react-router-dom";

import Sidebar from "./Sidebar";
import Header from "./Header";

const MainLayout = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  return (
    <div className="app-layout">
      <Sidebar isOpen={menuOpen} onNavigate={closeMenu} />

      <div
        className={`app-drawer-overlay${menuOpen ? " is-open" : ""}`}
        onClick={closeMenu}
        aria-hidden="true"
      />

      <div className="app-main">
        <Header
          isMenuOpen={menuOpen}
          onMenuClick={() => setMenuOpen((open) => !open)}
        />

        <main className="app-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
