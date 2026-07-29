import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import "../App.css";

function Home() {
  return (
    <>
      <Navbar />

      <main className="home-page">
        {/* HERO SECTION */}
        <section className="hero-section">
          <div className="hero-content">
            <div className="hero-badge">
              ✦ AI-Powered Campus Navigation
            </div>

            <h1>
              Navigate Galgotias
              <span> Smarter with AI.</span>
            </h1>

            <p>
              A vision-based smart campus navigation system that identifies
              campus locations from images and finds the shortest route to your
              destination.
            </p>

            <div className="hero-buttons">
              <Link to="/upload" className="primary-btn">
                📷 Scan Location
              </Link>

              <Link to="/map" className="secondary-btn">
                🗺 Explore Campus
              </Link>
            </div>

            <div className="hero-stats">
              <div>
                <strong>AI</strong>
                <span>Vision Detection</span>
              </div>

              <div>
                <strong>10+</strong>
                <span>Campus Locations</span>
              </div>

              <div>
                <strong>24/7</strong>
                <span>Navigation</span>
              </div>
            </div>
          </div>

          {/* WORKING ROUTE PREVIEW */}
          <div className="hero-visual">
            <div className="route-preview-card">
              <div className="route-preview-header">
                <div>
                  <span className="live-dot"></span>
                  Navigation System Online
                </div>

                <span>Live Route Preview</span>
              </div>

              <div className="route-preview-map">
                {/* Roads */}
                <div className="preview-road road-one"></div>
                <div className="preview-road road-two"></div>
                <div className="preview-road road-three"></div>

                {/* Buildings */}
                <div className="preview-building building-a">
                  A Block
                </div>

                <div className="preview-building building-ai">
                  AI Block
                </div>

                <div className="preview-building building-c">
                  C Block
                </div>

                <div className="preview-building building-cafe">
                  Cafeteria
                </div>

                <div className="preview-building building-parking">
                  Parking
                </div>

                {/* Route */}
                <svg
                  className="preview-route-svg"
                  viewBox="0 0 500 350"
                  preserveAspectRatio="none"
                >
                  <path
                    d="M 65 295 C 120 270, 135 230, 180 220 S 260 210, 290 165 S 350 105, 415 75"
                    fill="none"
                    stroke="#60a5fa"
                    strokeWidth="14"
                    strokeLinecap="round"
                    opacity="0.18"
                  />

                  <path
                    d="M 65 295 C 120 270, 135 230, 180 220 S 260 210, 290 165 S 350 105, 415 75"
                    fill="none"
                    stroke="#2563eb"
                    strokeWidth="7"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>

                {/* Start */}
                <div className="preview-start-dot"></div>

                <div className="preview-start-label">
                  Main Gate
                </div>

                {/* Destination */}
                <div className="preview-destination">
                  📍
                </div>

                <div className="preview-destination-label">
                  <span>DESTINATION</span>
                  <strong>AI Block</strong>
                </div>

                {/* Animated moving dot */}
                <div className="moving-route-dot"></div>
              </div>

              <div className="preview-route-info">
                <div>
                  <span>ACTIVE ROUTE</span>
                  <strong>Main Gate → AI Block</strong>
                </div>

                <div>
                  <span>STATUS</span>
                  <strong className="route-active">
                    ● Navigation Active
                  </strong>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section className="features-section">
          <div className="section-heading">
            <span>SMART CAMPUS TECHNOLOGY</span>

            <h2>
              One Image. One Destination.
              <br />
              Your Route is Ready.
            </h2>

            <p>
              Computer vision and shortest-path algorithms work together to
              make campus navigation simple.
            </p>
          </div>

          <div className="feature-grid">
            <div className="feature-card">
              <div className="feature-number">01</div>
              <div className="feature-icon">📷</div>

              <h3>Upload Image</h3>

              <p>
                Upload a campus signboard, block name or room-location image.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-number">02</div>
              <div className="feature-icon">✦</div>

              <h3>AI Detection</h3>

              <p>
                EasyOCR extracts the location text from the uploaded image.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-number">03</div>
              <div className="feature-icon">📍</div>

              <h3>Location Matching</h3>

              <p>
                The detected location is matched with the campus database.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-number">04</div>
              <div className="feature-icon">🧭</div>

              <h3>Shortest Route</h3>

              <p>
                Dijkstra's algorithm finds the shortest available campus route.
              </p>
            </div>
          </div>
        </section>

        {/* CAMPUS SECTION */}
        <section className="campus-section">
          <div>
            <span className="mini-heading">
              GALGOTIAS UNIVERSITY
            </span>

            <h2>
              Your Campus.
              <br />
              Easier to Navigate.
            </h2>

            <p>
              Explore academic blocks, gates, cafeteria, hostel, parking and
              other important Galgotias University locations.
            </p>

            <Link to="/map" className="primary-btn">
              Open Campus Map →
            </Link>
          </div>

          <div className="campus-list">
            <div>🚪 Gate 1</div>
            <div>🚪 Gate 2</div>
            <div>🤖 AI Block</div>
            <div>🏫 A Block</div>
            <div>🏫 B Block</div>
            <div>🏫 C Block</div>
            <div>🏥 D Block</div>
            <div>☕ Cafeteria</div>
            <div>🏠 Boys Hostel</div>
            <div>🅿 Parking</div>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="home-footer">
          <div>
            <strong>Vision-Based Campus AI</strong>
            <p>Smart Campus Navigation System</p>
          </div>

          <div>
            Galgotias University • Greater Noida
          </div>
        </footer>
      </main>
    </>
  );
}

export default Home;