import { useNavigate } from "react-router-dom";
import "../styles/Home.css";

const features = [
  {
    icon: "⚙",
    title: "Machine Management",
    description:
      "Track machine status, usage, maintenance schedules and performance.",
    color: "blue",
  },
  {
    icon: "🔧",
    title: "Preventive Maintenance",
    description:
      "Schedule maintenance tasks, manage service requests and reduce breakdowns.",
    color: "blue",
  },
  {
    icon: "📈",
    title: "Production Tracking",
    description:
      "Monitor production activity, track targets and improve operational efficiency.",
    color: "green",
  },
  {
    icon: "📦",
    title: "Inventory Control",
    description:
      "Manage spare parts, stock levels and essential maintenance materials.",
    color: "orange",
  },
  {
    icon: "👥",
    title: "Workforce Management",
    description:
      "Assign maintenance tasks and coordinate technicians and teams.",
    color: "blue",
  },
  {
    icon: "📊",
    title: "Reports & Analytics",
    description:
      "Understand machine performance and make informed maintenance decisions.",
    color: "blue",
  },
];

const activities = [
  {
    icon: "✓",
    title: "Maintenance completed",
    subtitle: "Preventive service recorded",
    color: "green",
  },
  {
    icon: "⚙",
    title: "Machine status updated",
    subtitle: "Production line monitoring",
    color: "blue",
  },
  {
    icon: "!",
    title: "Maintenance attention",
    subtitle: "Review pending work orders",
    color: "orange",
  },
];

const Home = () => {
  const navigate = useNavigate();

  const goToLogin = () => navigate("/login");
  const goToRegister = () => navigate("/register");

  return (
    <main className="factory-home">
      {/* Navigation */}
      <header className="ff-header">
        <nav className="ff-nav ff-container" aria-label="Main navigation">
          <button
            className="ff-brand"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            aria-label="Factory Maintenance System home"
          >
            <span className="ff-brand-icon">⚙</span>
            <span>Factory Maintenance System</span>
          </button>

          <div className="ff-nav-links">
            <a className="active" href="#home">
              Home
            </a>
            <a href="#features">Features</a>
            <a href="#benefits">Benefits</a>
            <a href="#about">About</a>
            <a href="#contact">Contact</a>
          </div>

          <div className="ff-nav-actions">
            <button className="ff-button ff-button-outline ff-login" onClick={goToLogin}>
              Login
            </button>
            <button className="ff-button ff-button-primary ff-nav-cta" onClick={goToRegister}>
              Get Started Free
            </button>
          </div>
        </nav>
      </header>

      {/* Hero */}
      <section className="ff-hero" id="home">
        <div className="ff-hero-overlay" />

        <div className="ff-container ff-hero-content">
          <div className="ff-hero-copy">
            <span className="ff-eyebrow">
              SMARTER FACTORIES. HIGHER PRODUCTIVITY.
            </span>

            <h1>
              Complete Factory Management,{" "}
              <span>All in One</span>
            </h1>

            <p className="ff-hero-description">
              Simplify machine maintenance, manage your workforce and monitor
              factory operations through one powerful, easy-to-use platform
              built for modern manufacturing.
            </p>

            <div className="ff-hero-highlights">
              <div className="ff-highlight">
                <span className="ff-highlight-icon">▣</span>
                <span>
                  Real-time
                  <br />
                  Monitoring
                </span>
              </div>

              <div className="ff-highlight">
                <span className="ff-highlight-icon">◷</span>
                <span>
                  Reduce
                  <br />
                  Downtime
                </span>
              </div>

              <div className="ff-highlight">
                <span className="ff-highlight-icon">↗</span>
                <span>
                  Improve
                  <br />
                  Productivity
                </span>
              </div>
            </div>

            <div className="ff-hero-actions">
              <button className="ff-button ff-button-primary ff-hero-cta" onClick={goToRegister}>
                Get Started Free <span>→</span>
              </button>

              <a className="ff-button ff-button-video" href="#features">
                <span className="ff-play-icon">▶</span>
                Explore Features
              </a>
            </div>

            <p className="ff-hero-note">
              <span>✓</span> Built for efficient factory operations
            </p>
          </div>

          {/* Dashboard preview */}
          <div className="ff-hero-visual" aria-label="Factory dashboard preview">
            <div className="ff-dashboard">
              <aside className="ff-dashboard-sidebar">
                <div className="ff-dashboard-brand">
                  <span>⚙</span> Factory Maintenance System
                </div>

                {[
                  ["▦", "Dashboard"],
                  ["⚙", "Machines"],
                  ["🔧", "Maintenance"],
                  ["▥", "Production"],
                  ["▣", "Inventory"],
                  ["▤", "Reports"],
                  ["♙", "Users"],
                  ["⚙", "Settings"],
                ].map(([icon, label], index) => (
                  <div
                    className={`ff-sidebar-item ${index === 0 ? "selected" : ""}`}
                    key={label}
                  >
                    <span>{icon}</span> {label}
                  </div>
                ))}
              </aside>

              <div className="ff-dashboard-main">
                <div className="ff-dashboard-topbar">
                  <div>
                    <span className="ff-dashboard-greeting">
                      Good Morning, Admin 👋
                    </span>
                    <span className="ff-dashboard-subtitle">
                      Here's an overview of your factory operations.
                    </span>
                  </div>
                  <span className="ff-admin-pill">Admin ▾</span>
                </div>

                <div className="ff-stat-grid">
                  <div className="ff-stat-card">
                    <span className="ff-stat-icon stat-blue">⚙</span>
                    <span className="ff-stat-label">Total Machines</span>
                    <strong>12</strong>
                    <small>Registered machines</small>
                  </div>

                  <div className="ff-stat-card">
                    <span className="ff-stat-icon stat-green">✓</span>
                    <span className="ff-stat-label">Running</span>
                    <strong>09</strong>
                    <small>Currently operational</small>
                  </div>

                  <div className="ff-stat-card">
                    <span className="ff-stat-icon stat-orange">◷</span>
                    <span className="ff-stat-label">Maintenance</span>
                    <strong>02</strong>
                    <small>Service required</small>
                  </div>

                  <div className="ff-stat-card">
                    <span className="ff-stat-icon stat-red">!</span>
                    <span className="ff-stat-label">Stopped</span>
                    <strong>01</strong>
                    <small>Needs attention</small>
                  </div>
                </div>

                <div className="ff-dashboard-bottom">
                  <div className="ff-chart-card">
                    <div className="ff-card-heading">
                      <div>
                        <strong>Production Overview</strong>
                        <span>Operational performance</span>
                      </div>
                      <span className="ff-period">This week ▾</span>
                    </div>

                    <div className="ff-chart">
                      <div className="ff-chart-labels">
                        <span>100%</span>
                        <span>75%</span>
                        <span>50%</span>
                        <span>25%</span>
                        <span>0%</span>
                      </div>

                      <svg
                        className="ff-chart-svg"
                        viewBox="0 0 340 160"
                        role="img"
                        aria-label="Illustrative production trend chart"
                      >
                        <defs>
                          <linearGradient id="ffChartFill" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#3185ff" stopOpacity=".24" />
                            <stop offset="100%" stopColor="#3185ff" stopOpacity=".01" />
                          </linearGradient>
                        </defs>

                        {[20, 50, 80, 110, 140].map((y) => (
                          <line
                            key={y}
                            x1="12"
                            y1={y}
                            x2="330"
                            y2={y}
                            stroke="#e8edf5"
                            strokeDasharray="4 4"
                          />
                        ))}

                        <path
                          d="M12 130 L52 100 L88 55 L126 72 L165 82 L205 48 L245 58 L285 35 L330 42 L330 145 L12 145 Z"
                          fill="url(#ffChartFill)"
                        />

                        <path
                          d="M12 130 L52 100 L88 55 L126 72 L165 82 L205 48 L245 58 L285 35 L330 42"
                          fill="none"
                          stroke="#287bff"
                          strokeWidth="3"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />

                        {[
                          [12, 130],
                          [88, 55],
                          [165, 82],
                          [205, 48],
                          [285, 35],
                          [330, 42],
                        ].map(([cx, cy]) => (
                          <circle
                            key={`${cx}-${cy}`}
                            cx={cx}
                            cy={cy}
                            r="4"
                            fill="#fff"
                            stroke="#287bff"
                            strokeWidth="2"
                          />
                        ))}
                      </svg>
                    </div>

                    <div className="ff-chart-days">
                      <span>Mon</span>
                      <span>Tue</span>
                      <span>Wed</span>
                      <span>Thu</span>
                      <span>Fri</span>
                      <span>Sat</span>
                      <span>Sun</span>
                    </div>
                  </div>

                  <div className="ff-activity-card">
                    <strong className="ff-activity-title">Recent Activity</strong>

                    {activities.map((activity) => (
                      <div className="ff-activity" key={activity.title}>
                        <span className={`ff-activity-icon ${activity.color}`}>
                          {activity.icon}
                        </span>
                        <div>
                          <strong>{activity.title}</strong>
                          <span>{activity.subtitle}</span>
                        </div>
                      </div>
                    ))}

                    <a href="#features" className="ff-view-all">
                      Explore capabilities →
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="ff-floating-status">
              <span className="ff-floating-check">✓</span>
              <div>
                <strong>Maintenance made simpler</strong>
                <span>Everything in one place</span>
              </div>
            </div>
          </div>
        </div>

        <div className="ff-hero-bottom-line" />
      </section>

      {/* Features */}
      <section className="ff-features-section" id="features">
        <div className="ff-container">
          <div className="ff-section-heading">
            <span className="ff-section-eyebrow">KEY FEATURES</span>
            <h2>Everything You Need to Run a Smarter Factory</h2>
            <p>
              From machine maintenance to daily operations, manage your
              essential factory workflows in one connected platform.
            </p>
          </div>

          <div className="ff-feature-grid">
            {features.map((feature) => (
              <article className="ff-feature-card" key={feature.title}>
                <div className={`ff-feature-icon ${feature.color}`}>
                  {feature.icon}
                </div>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
                <a href="#contact" aria-label={`Learn more about ${feature.title}`}>
                  Learn more <span>→</span>
                </a>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* About and benefits */}
      <section className="ff-about-section" id="about">
        <div className="ff-container ff-about-grid">
          <div className="ff-about-copy">
            <span className="ff-section-eyebrow">WHY FACTORYFLOW</span>
            <h2>
              Built for Manufacturers, by People Who Understand Manufacturing
            </h2>

            <p>
              Bring maintenance, machines, technicians and operational
              information together with a practical system designed to help
              your team work with greater clarity and control.
            </p>

            <ul className="ff-benefit-list">
              <li>
                <span>✓</span> Easy-to-use management experience
              </li>
              <li>
                <span>✓</span> Clear machine and maintenance visibility
              </li>
              <li>
                <span>✓</span> Organized tasks and service records
              </li>
              <li>
                <span>✓</span> A foundation that can grow with your business
              </li>
            </ul>

            <button className="ff-button ff-button-primary ff-about-button" onClick={goToRegister}>
              Discover Factory Maintenance System <span>→</span>
            </button>
          </div>

          <div className="ff-operations-visual">
            <div className="ff-operations-image">
              <div className="ff-operations-image-overlay" />
              <div className="ff-operations-label">
                <span className="ff-operations-label-icon">✓</span>
                <div>
                  <strong>Operations at a glance</strong>
                  <span>Make informed decisions</span>
                </div>
              </div>
            </div>

            <div className="ff-mini-report">
              <div className="ff-mini-report-top">
                <span>Maintenance overview</span>
                <span className="ff-mini-dot" />
              </div>
              <strong>Stay organized.</strong>
              <p>Keep track of machines, work orders and upcoming service.</p>
              <div className="ff-mini-bars" aria-hidden="true">
                <span />
                <span />
                <span />
                <span />
                <span />
                <span />
                <span />
              </div>
            </div>
          </div>

          <aside className="ff-benefits-panel" id="benefits">
            <h3>Designed for Better Operations</h3>
            <p className="ff-benefits-intro">
              The tools your team needs to stay on top of factory work.
            </p>

            <div className="ff-benefit-stat">
              <span className="ff-benefit-stat-icon stat-blue">▦</span>
              <div>
                <strong>Machine visibility</strong>
                <span>Understand machine status</span>
              </div>
            </div>

            <div className="ff-benefit-stat">
              <span className="ff-benefit-stat-icon stat-green">✓</span>
              <div>
                <strong>Organized maintenance</strong>
                <span>Keep service tasks on track</span>
              </div>
            </div>

            <div className="ff-benefit-stat">
              <span className="ff-benefit-stat-icon stat-green">↗</span>
              <div>
                <strong>Clearer workflows</strong>
                <span>Coordinate work across your team</span>
              </div>
            </div>

            <div className="ff-benefit-stat">
              <span className="ff-benefit-stat-icon stat-orange">◷</span>
              <div>
                <strong>Actionable information</strong>
                <span>Make decisions with better context</span>
              </div>
            </div>
          </aside>
        </div>
      </section>

      {/* CTA */}
      <section className="ff-cta-section" id="contact">
        <div className="ff-cta-decoration ff-cta-decoration-one" />
        <div className="ff-cta-decoration ff-cta-decoration-two" />

        <div className="ff-container ff-cta-content">
          <div>
            <span className="ff-cta-eyebrow">READY TO TRANSFORM YOUR FACTORY?</span>
            <h2>Take Control of Your Operations Today</h2>
            <p>
              Bring your factory workflows together and build a more organized,
              efficient maintenance process.
            </p>
          </div>

          <div className="ff-cta-actions">
            <button className="ff-button ff-button-primary ff-cta-button" onClick={goToRegister}>
              Get Started Free <span>→</span>
            </button>
            <button className="ff-cta-login" onClick={goToLogin}>
              Already have an account? <span>Login</span>
            </button>
          </div>
        </div>

        <footer className="ff-footer">
          <div className="ff-container ff-footer-inner">
            <span className="ff-footer-brand">
              <span>⚙</span> Factory Maintenance System
            </span>
            <p>Factory management, made clearer.</p>
            <span>© {new Date().getFullYear()} Factory Maintenance System</span>
          </div>
        </footer>
      </section>
    </main>
  );
};

export default Home;