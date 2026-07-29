import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="topbar">
      <div className="brand-wrap">
        <div className="brand-icon">AI</div>

        <div>
          <div className="brand-title">
            Vision-Based Campus AI
          </div>

          <div className="brand-subtitle">
            Smart Navigation System
          </div>
        </div>
      </div>

      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/upload">AI Detection</Link>
        <Link to="/map">Campus Map</Link>
        <Link to="/about">About</Link>

        <Link to="/login" className="login-nav-btn">
          Login
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;