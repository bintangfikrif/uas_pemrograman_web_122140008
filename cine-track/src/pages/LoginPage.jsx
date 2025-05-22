import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth'; // Assuming useAuth is in '../hooks/useAuth'

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [data, setData] = useState({
    username: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState(null); // Used for general messages (success/error)
  const [processing, setProcessing] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: null })); // Clear error when input changes
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setProcessing(true);
    setStatus(null); // Clear previous status message

    // Basic client-side validation
    const newErrors = {};
    if (!data.username) {
      newErrors.username = "Username is required.";
    }
    if (!data.password) {
      newErrors.password = "Password is required.";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setProcessing(false);
      return;
    }

    try {
      const result = await login(data.username, data.password);

      if (result.success) {
        setStatus("Login successful!");
        // Redirect all successful logins to the root path ("/")
        navigate("/");
      } else {
        // Set a more specific error message if available from the backend, otherwise a generic one.
        setStatus(result.message || "Login failed. Please check your credentials.");
      }
    } catch (error) {
      console.error("Login error:", error);
      setStatus("An unexpected error occurred during login.");
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className="login-page">
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username</label>
          <input
            id="username"
            name="username"
            type="text"
            placeholder="Username"
            value={data.username}
            onChange={handleChange}
            required
            disabled={processing}
          />
          {errors.username && <p className="error-text">{errors.username}</p>}
        </div>

        <div>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            placeholder="Password"
            value={data.password}
            onChange={handleChange}
            required
            disabled={processing}
          />
          {errors.password && <p className="error-text">{errors.password}</p>}
        </div>

        <button type="submit" disabled={processing}>
          {processing ? 'Logging in...' : 'Login'}
        </button>
        {status && <div className={`message-text ${status.includes("failed") || status.includes("error") ? 'error-text' : 'success-text'}`}>{status}</div>}
      </form>
      <p>Don't have an account? <Link to="/register">Register</Link></p>
    </div>
  );
}