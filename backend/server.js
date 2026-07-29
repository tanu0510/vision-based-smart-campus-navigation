const express = require("express");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const axios = require("axios");
const fs = require("fs");
const FormData = require("form-data");

const app = express();

app.use(cors());
app.use(express.json());

// Make sure uploads folder exists
const uploadsDir = path.join(__dirname, "uploads");

if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

app.use("/uploads", express.static(uploadsDir));

// Multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir);
  },

  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

// Test route
app.get("/", (req, res) => {
  res.send("Vision-Based Campus AI Backend is Running 🚀");
});

// Upload + AI Detection
app.post("/upload", upload.single("image"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        message: "No image uploaded",
      });
    }

    const imagePath = path.join(
      uploadsDir,
      req.file.filename
    );

    const formData = new FormData();

    formData.append(
      "file",
      fs.createReadStream(imagePath)
    );

    const AI_SERVICE_URL =
      process.env.AI_SERVICE_URL ||
      "http://127.0.0.1:8000";

    const aiResponse = await axios.post(
      `${AI_SERVICE_URL}/detect`,
      formData,
      {
        headers: formData.getHeaders(),
        timeout: 120000,
      }
    );

    const backendURL =
      process.env.BACKEND_URL ||
      `${req.protocol}://${req.get("host")}`;

    res.json({
      message: "Image Uploaded Successfully",
      filename: req.file.filename,
      imageUrl:
        `${backendURL}/uploads/${req.file.filename}`,
      detectedText:
        aiResponse.data.detected_text || [],
    });

  } catch (error) {
    console.error(
      "AI Error:",
      error.response?.data || error.message
    );

    res.status(500).json({
      message: "AI Detection Failed",
      error:
        error.response?.data ||
        error.message,
    });
  }
});

// Render provides PORT automatically
const PORT = process.env.PORT || 5000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});