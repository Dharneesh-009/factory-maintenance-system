
import { useNavigate } from "react-router-dom";
import "../styles/Home.css";

const Home = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: "⚙️",
      title: "Machine Management",
      description:
        "Monitor machine status, model details, locations, and operational conditions.",
    },
    {
      icon: "🛠️",
      title: "Maintenance Management",
      description:
        "Manage maintenance schedules, assigned technicians, and maintenance status.",
    },
    {
      icon: "🚨",
      title: "Breakdown Tracking",
      description:
        "Record breakdowns, track priorities, and follow repair progress.",
    },
    {
      icon: "📦",
      title: "Spare Parts Management",
      description:
        "Keep track of spare parts and access inventory information.",
    },
    {
      icon: "📊",
      title: "Reports & Analytics",
      description:
        "View maintenance, machine, breakdown, and spare parts reports.",
    },
    {
      icon: "🔐",
      title: "Role-Based Access",
      description:
        "Provide separate permissions for administrators and technicians.",
    },
  ];

  return (
    <div className="home-page">
      <header className="home-navbar">
        <a
          href="#home"
          className="home-brand"
          onClick={(event) => {
            event.preventDefault();
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
        >
          <span className="brand-icon">⚙</span>
          <span>Factory<span className="brand-highlight">Care</span></span>
        </a>

        <nav className="home-nav-links">
          <a href="#home">Home</a>
          <a href="#features">Features</a>
          <a href="#about">About</a>
        </nav>

        <div className="home-nav-actions">
          <button
            className="home-login-btn"
            onClick={() => navigate("/login")}
          >
            Login
          </button>

          <button
            className="home-register-btn"
            onClick={() => navigate("/register")}
          >
            Get Started
          </button>
        </div>
      </header>

      <main>
        <section className="home-hero" id="home">
          <div className="hero-content">
            <p className="hero-eyebrow">
              SMARTER MAINTENANCE. BETTER PERFORMANCE.
            </p>

            <h1>
              Keep Your Factory
              <br />
              Running <span>Smarter.</span>
            </h1>

            <p className="hero-description">
              Manage machines, maintenance activities, breakdowns,
              and spare parts in one convenient platform.
              Make factory maintenance simpler, more organized,
              and easier to monitor.
            </p>

            <div className="hero-benefits">
              <div>
                <span>⚙️</span>
                <p>Machine Monitoring</p>
              </div>

              <div>
                <span>🛠️</span>
                <p>Maintenance Tracking</p>
              </div>

              <div>
                <span>📈</span>
                <p>Better Visibility</p>
              </div>
            </div>

            <div className="hero-actions">
              <button
                className="hero-primary-btn"
                onClick={() => navigate("/register")}
              >
                Get Started Free <span>→</span>
              </button>

              <button
                className="hero-secondary-btn"
                onClick={() => navigate("/login")}
              >
                Login to Dashboard
              </button>
            </div>

            <p className="hero-note">
              One platform. Better maintenance. Smarter decisions.
            </p>
          </div>

          <div className="hero-visual">
            <div className="visual-glow"></div>

            <div className="factory-panel">
              <div className="panel-topbar">
                <span className="panel-logo">⚙ FactoryCare</span>
                <span className="panel-status">
                  <span></span> System Overview
                </span>
              </div>

              <div className="panel-heading">
                <div>
                  <p>FACTORY OVERVIEW</p>
                  <h2>Maintenance at a glance</h2>
                </div>
                <span className="panel-heading-icon">⌘</span>
              </div>

              <div className="panel-stats">
                <div className="panel-stat">
                  <span>⚙️</span>
                  <p>Total Machines</p>
                  <strong>Machines</strong>
                </div>

                <div className="panel-stat">
                  <span>🟢</span>
                  <p>Machine Status</p>
                  <strong>Monitoring</strong>
                </div>

                <div className="panel-stat">
                  <span>🛠️</span>
                  <p>Maintenance</p>
                  <strong>Tracking</strong>
                </div>

                <div className="panel-stat">
                  <span>🚨</span>
                  <p>Breakdowns</p>
                  <strong>Management</strong>
                </div>
              </div>

              <div className="panel-lower">
                <div className="panel-chart">
                  <p>Maintenance Workflow</p>

                  <div className="workflow-step">
                    <span>01</span>
                    <div>
                      <strong>Monitor Machines</strong>
                      <small>View operational status</small>
                    </div>
                    <span className="workflow-check">✓</span>
                  </div>

                  <div className="workflow-step">
                    <span>02</span>
                    <div>
                      <strong>Track Maintenance</strong>
                      <small>Manage maintenance activities</small>
                    </div>
                    <span className="workflow-check">✓</span>
                  </div>

                  <div className="workflow-step">
                    <span>03</span>
                    <div>
                      <strong>Resolve Breakdowns</strong>
                      <small>Follow repair progress</small>
                    </div>
                    <span className="workflow-arrow">↗</span>
                  </div>
                </div>

                <div className="panel-side-card">
                  <span className="side-card-icon">📊</span>
                  <h3>Clear Insights</h3>
                  <p>
                    Access reports and keep maintenance
                    information organized.
                  </p>
                  <div className="mini-bars">
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                </div>
              </div>

              <div className="panel-footer">
                <span>FACTORY MAINTENANCE SYSTEM</span>
                <span>Organized · Secure · Reliable</span>
              </div>
            </div>

            <div className="floating-badge">
              <span>✓</span>
              <div>
                <strong>Everything Organized</strong>
                <small>One maintenance platform</small>
              </div>
            </div>
          </div>
        </section>

        <section className="home-features" id="features">
          <div className="section-heading">
            <p className="section-eyebrow">WHAT YOU CAN DO</p>
            <h2>Everything You Need to Manage Your Factory</h2>
            <p>
              Essential tools to manage your machines, maintenance
              activities, breakdowns, and operational records.
            </p>
          </div>

          <div className="feature-grid">
            {features.map((feature) => (
              <article className="feature-card" key={feature.title}>
                <div className="feature-icon">{feature.icon}</div>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
                <span className="feature-arrow">↗</span>
              </article>
            ))}
          </div>
        </section>

        <section className="home-about" id="about">
          <div className="about-content">
            <p className="section-eyebrow">BUILT FOR FACTORY OPERATIONS</p>
            <h2>Make Maintenance Easier to Manage.</h2>
            <p>
              FactoryCare brings important maintenance information
              together, helping administrators and technicians
              manage their work through a centralized system.
            </p>

            <ul>
              <li>✓ Centralized machine information</li>
              <li>✓ Organized maintenance records</li>
              <li>✓ Breakdown priority and status tracking</li>
              <li>✓ Role-based access and permissions</li>
            </ul>
          </div>

          <div className="about-highlight">
            <span className="about-gear">⚙</span>
            <p>SMARTER WORKFLOWS</p>
            <h3>Monitor. Maintain. Improve.</h3>
            <div className="about-line"></div>
            <p>
              Bring your factory maintenance activities
              into one organized workspace.
            </p>
          </div>
        </section>

        <section className="home-cta">
          <div>
            <p className="section-eyebrow">READY TO GET STARTED?</p>
            <h2>Take Control of Your Maintenance Today</h2>
            <p>
              Sign in to manage your factory or create an account
              to get started.
            </p>
          </div>

          <button
            className="hero-primary-btn"
            onClick={() => navigate("/login")}
          >
            Enter Your System <span>→</span>
          </button>
        </section>
      </main>

      <footer className="home-footer">
        <a href="#home" className="home-brand">
          <span className="brand-icon">⚙</span>
          <span>Factory<span className="brand-highlight">Care</span></span>
        </a>

        <p>Factory Maintenance System · Built for smarter operations.</p>

        <button onClick={() => navigate("/login")}>
          Login →
        </button>
      </footer>
    </div>
  );
};

export default Home;
