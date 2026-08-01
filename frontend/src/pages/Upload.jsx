import { useMemo, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import "../App.css";

function Upload() {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");
  const [detectedText, setDetectedText] = useState([]);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const previewUrl = useMemo(() => {
    return file ? URL.createObjectURL(file) : null;
  }, [file]);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files?.[0];

    if (!selectedFile) return;

    setFile(selectedFile);
    setMessage("");
    setDetectedText([]);
  };

  const handleUpload = async () => {
    if (!file) {
      alert("Please select an image.");
      return;
    }

    const formData = new FormData();
    formData.append("image", file);

    try {
      setLoading(true);
      setMessage("AI is analyzing the image...");
      setDetectedText([]);

      const response = await axios.post(
  "http://localhost:5000/upload",
  formData
);

      setMessage(response.data.message || "Detection completed.");

      const result = response.data.detectedText || [];
      setDetectedText(result);
    } catch (error) {
      console.error("Upload Error:", error);
      setMessage("Upload / AI Detection Failed");
    } finally {
      setLoading(false);
    }
  };

  const handleNavigate = () => {
    if (detectedText.length === 0) {
      alert("No location detected.");
      return;
    }

    const text = detectedText.join(" ");

    navigate("/map", {
      state: {
        detectedText: text,
      },
    });
  };

  return (
    <>
      <Navbar />

      <main className="scanner-page">
        <section className="scanner-header">
          <div className="hero-badge">✦ COMPUTER VISION</div>

          <h1>AI Campus Location Scanner</h1>

          <p>
            Upload a campus signboard, block name, room label or landmark.
            Our vision system will extract the text and connect it with the
            campus navigation system.
          </p>
        </section>

        <section className="scanner-layout">
          <div className="scanner-card">
            <div className="scanner-card-header">
              <div>
                <span className="scanner-status-dot"></span>
                Vision Engine Ready
              </div>

              <span>Google Vision OCR</span>
            </div>

            <label className="upload-zone">
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                hidden
              />

              {previewUrl ? (
                <img
                  src={previewUrl}
                  alt="Selected campus location"
                  className="scanner-preview"
                />
              ) : (
                <div className="upload-placeholder">
                  <div className="upload-icon">📷</div>
                  <h3>Upload Campus Image</h3>
                  <p>
                    Select an image containing a room number, block name or
                    campus signboard.
                  </p>
                  <span>JPG • PNG • JPEG</span>
                </div>
              )}
            </label>

            {file && (
              <div className="selected-file">
                <div>
                  <strong>{file.name}</strong>
                  <span>{(file.size / 1024).toFixed(1)} KB</span>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setFile(null);
                    setDetectedText([]);
                    setMessage("");
                  }}
                >
                  Remove
                </button>
              </div>
            )}

            <button
              className="scan-button"
              onClick={handleUpload}
              disabled={loading}
            >
              {loading ? "Analyzing Image..." : "✦ Scan with AI"}
            </button>

            {loading && (
              <div className="processing-box">
                <div className="processing-line"></div>
                <span>
                  Running OCR and identifying campus location...
                </span>
              </div>
            )}
          </div>

          <div className="scanner-result-card">
            <div className="result-heading">
              <div>
                <span>AI RESULT</span>
                <h2>Detection Output</h2>
              </div>

              <div className="result-icon">AI</div>
            </div>

            {!message && detectedText.length === 0 && (
              <div className="empty-result">
                <div>⌁</div>
                <h3>No scan yet</h3>
                <p>
                  Upload an image and run AI detection to view the recognized
                  campus location.
                </p>
              </div>
            )}

            {message && (
              <div
                className={`scanner-message ${
                  message.includes("Failed") ? "error" : ""
                }`}
              >
                {message}
              </div>
            )}

            {detectedText.length > 0 && (
              <>
                <div className="detected-box">
                  <span>DETECTED TEXT</span>

                  <div className="detected-tags">
                    {detectedText.map((text, index) => (
                      <div key={`${text}-${index}`}>{text}</div>
                    ))}
                  </div>
                </div>

                <div className="ai-flow">
                  <div>
                    <strong>01</strong>
                    <span>Image Received</span>
                  </div>

                  <div className="flow-line"></div>

                  <div>
                    <strong>02</strong>
                    <span>Text Detected</span>
                  </div>

                  <div className="flow-line"></div>

                  <div>
                    <strong>03</strong>
                    <span>Ready to Navigate</span>
                  </div>
                </div>

                <button
                  className="navigate-button"
                  onClick={handleNavigate}
                >
                  Navigate to Location →
                </button>
              </>
            )}
          </div>
        </section>

        <section className="scanner-info-grid">
          <div>
            <span>01</span>
            <h4>Capture</h4>
            <p>Take a clear image of the campus sign or location name.</p>
          </div>

          <div>
            <span>02</span>
            <h4>Detect</h4>
            <p>Google Vision OCR extracts visible text from campus images.</p>
          </div>

          <div>
            <span>03</span>
            <h4>Match</h4>
            <p>The detected text is matched with our campus database.</p>
          </div>

          <div>
            <span>04</span>
            <h4>Navigate</h4>
            <p>Dijkstra finds the shortest path to the destination.</p>
          </div>
        </section>
      </main>
    </>
  );
}

export default Upload;