
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import authService from "../services/authService";
import AuthLayout from "../components/auth/AuthLayout";

const Register = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setSuccess("");

    if (!name.trim() || !email.trim() || !password) {
      setError("Please complete all fields.");
      return;
    }

    if (password.length < 8) {
      setError("Your password must contain at least 8 characters.");
      return;
    }

    try {
      setLoading(true);

      const message = await authService.register(
        name.trim(),
        email.trim(),
        password,
        "TECHNICIAN"
      );

      setSuccess(message || "Your account has been created.");

      // Briefly show the success message before redirecting.
      setTimeout(() => {
        navigate("/login", { replace: true });
      }, 1200);
    } catch (err) {
      setError(
        err.response?.data?.message ||
        "Unable to create your account. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      eyebrow="GET STARTED"
      title="Create your workspace account."
      subtitle="Get your maintenance workflow organized from day one."
      footer={
        <p>
          Already have an account?{" "}
          <Link className="auth-link" to="/login">
            Sign in <span aria-hidden="true">→</span>
          </Link>
        </p>
      }
    >
      <form className="auth-form" onSubmit={handleSubmit}>
        <div className="form-field">
          <label htmlFor="register-name">Full name</label>
          <input
            id="register-name"
            type="text"
            name="name"
            autoComplete="name"
            placeholder="Enter your full name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            disabled={loading}
          />
        </div>

        <div className="form-field">
          <label htmlFor="register-email">Work email</label>
          <input
            id="register-email"
            type="email"
            name="email"
            autoComplete="email"
            placeholder="you@company.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={loading}
          />
        </div>

        <div className="form-field">
          <label htmlFor="register-password">Create password</label>
          <div className="password-wrap">
            <input
              id="register-password"
              type={showPassword ? "text" : "password"}
              name="password"
              autoComplete="new-password"
              placeholder="At least 8 characters"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              minLength={8}
              required
              disabled={loading}
            />
            <button
              className="password-toggle"
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              aria-label={showPassword ? "Hide password" : "Show password"}
              aria-pressed={showPassword}
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>
          <p className="field-hint">
            Use at least 8 characters.
          </p>
        </div>

        {error && (
          <div className="auth-message auth-error" role="alert">
            <span aria-hidden="true">!</span>
            {error}
          </div>
        )}

        {success && (
          <div className="auth-message auth-success" role="status">
            <span aria-hidden="true">✓</span>
            {success}
          </div>
        )}

        <button
          className="auth-submit"
          type="submit"
          disabled={loading}
        >
          <span>
            {loading ? "Creating your account..." : "Create account"}
          </span>
          {!loading && <span aria-hidden="true">→</span>}
          {loading && <span className="button-spinner" />}
        </button>

        <p className="form-security">
          <span aria-hidden="true">◆</span>
          Your account details are handled securely
        </p>
      </form>
    </AuthLayout>
  );
};

export default Register;
