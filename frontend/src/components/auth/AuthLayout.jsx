
import { Link } from "react-router-dom";
import "../../styles/AuthPages.css";

const AuthLayout = ({
  eyebrow,
  title,
  subtitle,
  children,
  footer,
}) => {
  return (
    <main className="auth-shell">
      <section className="auth-visual">
        <div className="visual-image" />
        <div className="visual-grid" />
        <div className="visual-glow visual-glow-one" />
        <div className="visual-glow visual-glow-two" />

        <Link to="/login" className="brand">
          <span className="brand-mark" aria-hidden="true">
            <svg viewBox="0 0 40 40" fill="none">
              <path
                d="M7 30V10L20 19L33 10V30"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinejoin="round"
              />
              <path
                d="M13 30V23L20 28L27 23V30"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinejoin="round"
              />
            </svg>
          </span>
          <span className="brand-copy">
            <strong>Factory Maintenance System</strong>
            <small>INDUSTRIAL MAINTENANCE</small>
          </span>
        </Link>

        <div className="visual-content">
          <span className="visual-eyebrow">
            <span className="status-dot" />
            INTELLIGENT INDUSTRIAL OPERATIONS
          </span>

          <h1>
            Keep your factory
            <br />
            <span>running at its best.</span>
          </h1>

          <p className="visual-description">
            One intelligent platform for machine health,
            preventive maintenance, work orders, and
            operational visibility.
          </p>

          <div className="visual-features">
            <span>
              <span className="feature-check">✓</span>
              Preventive maintenance
            </span>
            <span>
              <span className="feature-check">✓</span>
              Real-time machine visibility
            </span>
            <span>
              <span className="feature-check">✓</span>
              Smarter maintenance workflows
            </span>
          </div>
        </div>

        <div className="floating-status">
          <div className="status-icon">↗</div>
          <div className="status-copy">
            <small>MAINTENANCE WORKSPACE</small>
            <strong>Built for operational clarity</strong>
          </div>
          <span className="status-pill">READY</span>
        </div>

        <div className="visual-bottom">
          <span>ENGINEERED FOR THE FACTORY FLOOR</span>
          <span>01 / INDUSTRIAL OPERATIONS</span>
        </div>
      </section>

      <section className="auth-panel">
        <div className="auth-panel-inner">
          <div className="mobile-brand">
            <span className="brand-mark">
              <svg viewBox="0 0 40 40" fill="none">
                <path
                  d="M7 30V10L20 19L33 10V30"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinejoin="round"
                />
                <path
                  d="M13 30V23L20 28L27 23V30"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
            <strong>Factory Maintenance System</strong>
          </div>

          <div className="auth-heading">
            <span className="auth-eyebrow">{eyebrow}</span>
            <h2>{title}</h2>
            <p>{subtitle}</p>
          </div>

          <div className="auth-form-content">
            {children}
          </div>

          <div className="auth-footer">
            {footer}
          </div>
        </div>

        <div className="auth-legal">
          <span>© {new Date().getFullYear()} Factory Maintenance System</span>
          <span>MADE FOR BETTER OPERATIONS</span>
        </div>
      </section>
    </main>
  );
};

export default AuthLayout;
