
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import AuthLayout from "../components/auth/AuthLayout";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    if (!email.trim() || !password) {
      setError("Please enter your email and password.");
      return;
    }

    try {
      setLoading(true);
      await login(email.trim(), password);
      navigate("/dashboard");
    } catch (err) {
      setError(
        err.response?.data?.message ||
        "Unable to sign in. Please check your credentials."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      eyebrow="WELCOME BACK"
      title="Sign in to your workspace."
      subtitle="Your factory operations, all in one place."
      footer={
        <p>
          New to the platform?{" "}
          <Link className="auth-link" to="/register">
            Create an account <span aria-hidden="true">→</span>
          </Link>
        </p>
      }
    >
      <form className="auth-form" onSubmit={handleSubmit}>
        <div className="form-field">
          <label htmlFor="login-email">Work email</label>
          <input
            id="login-email"
            type="email"
            name="email"
            autoComplete="username"
            placeholder="you@company.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={loading}
          />
        </div>

        <div className="form-field">
          <div className="field-heading">
            <label htmlFor="login-password">Password</label>
          </div>

          <div className="password-wrap">
            <input
              id="login-password"
              type={showPassword ? "text" : "password"}
              name="password"
              autoComplete="current-password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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
        </div>

        {error && (
          <div className="auth-message auth-error" role="alert">
            <span aria-hidden="true">!</span>
            {error}
          </div>
        )}

        <button
          className="auth-submit"
          type="submit"
          disabled={loading}
        >
          <span>{loading ? "Signing you in..." : "Sign in to workspace"}</span>
          {!loading && <span aria-hidden="true">→</span>}
          {loading && <span className="button-spinner" />}
        </button>

        <p className="form-security">
          <span aria-hidden="true">◆</span>
          Secure access to your maintenance workspace
        </p>
      </form>
    </AuthLayout>
  );
};

export default Login;
