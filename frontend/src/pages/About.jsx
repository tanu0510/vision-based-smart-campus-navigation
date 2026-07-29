import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import "../App.css";

function About() {
  return (
    <>
      <Navbar />

      <main className="about-page">
        <section className="about-hero">
          <span>ABOUT THE PROJECT</span>

          <h1>
            Vision-Based Smart
            <br />
            Campus Navigation
          </h1>

          <p>
            An AI-powered navigation system designed for Galgotias
            University that combines computer vision, OCR, real campus
            coordinates and shortest-path routing.
          </p>

          <div className="about-buttons">
            <Link to="/upload" className="primary-btn">
              Try AI Scanner
            </Link>

            <Link to="/map" className="secondary-btn">
              Explore Campus
            </Link>
          </div>
        </section>

        <section className="about-tech">
          <div className="about-tech-intro">
            <span>HOW IT WORKS</span>

            <h2>From an image to a navigation route.</h2>

            <p>
              The system recognizes text from campus images, identifies
              the corresponding location and calculates a route through
              the campus navigation graph.
            </p>
          </div>

          <div className="about-process">
            <div>
              <strong>01</strong>
              <h3>Image Input</h3>
              <p>
                User uploads an image containing a campus block,
                room or signboard.
              </p>
            </div>

            <div>
              <strong>02</strong>
              <h3>Computer Vision</h3>
              <p>
                Python and EasyOCR extract readable text from
                the uploaded image.
              </p>
            </div>

            <div>
              <strong>03</strong>
              <h3>Location Matching</h3>
              <p>
                Detected text is compared with known Galgotias
                campus locations.
              </p>
            </div>

            <div>
              <strong>04</strong>
              <h3>Smart Navigation</h3>
              <p>
                Dijkstra's algorithm calculates the shortest
                available route.
              </p>
            </div>
          </div>
        </section>

        <section className="technology-section">
          <div>
            <span>TECHNOLOGY STACK</span>
            <h2>Built with modern technologies.</h2>
          </div>

          <div className="technology-grid">
            <article>
              <div>⚛</div>
              <strong>React</strong>
              <span>Frontend Interface</span>
            </article>

            <article>
              <div>JS</div>
              <strong>Node.js</strong>
              <span>Backend Server</span>
            </article>

            <article>
              <div>PY</div>
              <strong>Python</strong>
              <span>AI Processing</span>
            </article>

            <article>
              <div>AI</div>
              <strong>EasyOCR</strong>
              <span>Text Recognition</span>
            </article>

            <article>
              <div>⌖</div>
              <strong>Leaflet</strong>
              <span>Interactive Mapping</span>
            </article>

            <article>
              <div>→</div>
              <strong>Dijkstra</strong>
              <span>Shortest Path</span>
            </article>
          </div>
        </section>

        <section className="about-campus">
          <span>REAL-WORLD APPLICATION</span>

          <h2>Designed for Galgotias University</h2>

          <p>
            Campus coordinates for academic blocks, gates, cafeteria,
            hostel, parking and other important locations are integrated
            into the navigation system.
          </p>

          <Link to="/map" className="primary-btn">
            Launch Campus Navigator →
          </Link>
        </section>
      </main>
    </>
  );
}

export default About;