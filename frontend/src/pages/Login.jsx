import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import "../App.css";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError("Please enter email and password.");
      return;
    }

    if (password.length < 4) {
      setError("Password must contain at least 4 characters.");
      return;
    }

    localStorage.setItem(
      "campusUser",
      JSON.stringify({
        email,
        loggedIn: true,
      })
    );

    setError("");
    navigate("/dashboard");
  };

  return (
    <>
      <Navbar />

      <main className="login-page">
        <div className="login-card">
          <div className="login-brand">AI</div>

          <span className="login-tag">
            SMART CAMPUS ACCESS
          </span>

          <h1>Welcome Back</h1>

          <p>
            Sign in to access Vision-Based Smart Campus Navigation.
          </p>

          <form onSubmit={handleLogin}>
            <label>Email / Student ID</label>

            <input
              type="text"
              placeholder="Enter email or student ID"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <label>Password</label>

            <input
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            {error && (
              <div className="login-error">
                {error}
              </div>
            )}

            <button type="submit">
              Sign In →
            </button>
          </form>
        </div>

        <div className="login-visual">
          <span>VISION-BASED CAMPUS AI</span>

          <h2>
            Find your destination.
            <br />
            Let AI guide the way.
          </h2>

          <div className="login-feature">
            <strong>01</strong>
            Computer Vision Location Detection
          </div>

          <div className="login-feature">
            <strong>02</strong>
            Real Galgotias Campus Mapping
          </div>

          <div className="login-feature">
            <strong>03</strong>
            Smart Route Navigation
          </div>
        </div>
      </main>
    </>
  );
}

export default Login;