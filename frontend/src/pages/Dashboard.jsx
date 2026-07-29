import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Navbar from "../components/Navbar";
import "../App.css";

function Dashboard() {
  const navigate = useNavigate();

  const user = JSON.parse(
    localStorage.getItem("campusUser")
  );

  useEffect(() => {
    if (!user?.loggedIn) {
      navigate("/login");
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("campusUser");
    navigate("/login");
  };

  if (!user?.loggedIn) {
    return null;
  }

  return (
    <>
      <Navbar />

      <main className="dashboard-page">
        <div className="dashboard-header">
          <div>
            <span>SMART CAMPUS CONTROL CENTER</span>

            <h1>Campus Navigation Dashboard</h1>

            <p>
              Logged in as {user.email}
            </p>
          </div>

          <button
            className="logout-btn"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>

        <div className="dashboard-grid">
          <Link to="/upload" className="dashboard-card">
            <div className="dash-icon">📷</div>

            <h3>AI Vision Scanner</h3>

            <p>
              Upload images and detect campus locations
              automatically.
            </p>

            <span>Open Scanner →</span>
          </Link>

          <Link to="/map" className="dashboard-card">
            <div className="dash-icon">🗺️</div>

            <h3>Campus Map</h3>

            <p>
              Explore real Galgotias University campus
              locations.
            </p>

            <span>Open Map →</span>
          </Link>

          <Link to="/map" className="dashboard-card">
            <div className="dash-icon">🧭</div>

            <h3>Smart Navigation</h3>

            <p>
              Find the shortest route between campus
              locations.
            </p>

            <span>Navigate →</span>
          </Link>
        </div>

        <section className="dashboard-status">
          <div>
            <span>AI SERVICE</span>
            <strong>ONLINE</strong>
          </div>

          <div>
            <span>BACKEND API</span>
            <strong>CONNECTED</strong>
          </div>

          <div>
            <span>CAMPUS LOCATIONS</span>
            <strong>10+</strong>
          </div>

          <div>
            <span>ROUTING ENGINE</span>
            <strong>DIJKSTRA</strong>
          </div>
        </section>
      </main>
    </>
  );
}

export default Dashboard;