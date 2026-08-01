const express = require("express");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const { createWorker } = require("tesseract.js");

const app = express();

app.use(cors());
app.use(express.json());

// Ensure uploads folder exists
const uploadsDir = path.join(__dirname, "uploads");

if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

app.use("/uploads", express.static(uploadsDir));

// Multer Storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir);
  },

  filename: (req, file, cb) => {
    cb(null, `${Date.now()}${path.extname(file.originalname)}`);
  },
});

const upload = multer({
  storage,

  limits: {
    fileSize: 10 * 1024 * 1024,
  },

  fileFilter: (req, file, cb) => {
    const allowedTypes = [
      "image/jpeg",
      "image/jpg",
      "image/png",
      "image/webp",
    ];

    if (!allowedTypes.includes(file.mimetype)) {
      return cb(
        new Error("Only JPG, JPEG, PNG and WEBP images are allowed.")
      );
    }

    cb(null, true);
  },
});

// Test Route
app.get("/", (req, res) => {
  res.send("Vision-Based Campus AI Backend is Running 🚀");
});
// Upload image + Free OCR using Tesseract
app.post("/upload", upload.single("image"), async (req, res) => {
  let worker;

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

    console.log("Starting OCR:", imagePath);

    worker = await createWorker("eng");

    const {
      data: { text },
    } = await worker.recognize(imagePath);

    const completeText = text.trim();

    const detectedText = completeText
      .split(/\r?\n/)
      .map((line) => line.trim())
      .filter((line) => line.length > 0);

    const backendURL =
      process.env.BACKEND_URL ||
      `${req.protocol}://${req.get("host")}`;

    res.json({
      message: "Image uploaded successfully",
      filename: req.file.filename,
      imageUrl: `${backendURL}/uploads/${req.file.filename}`,
      detectedText,
      fullDetectedText: completeText,
    });

  } catch (error) {
    console.error("OCR Error:", error);

    res.status(500).json({
      message: "OCR Failed",
      error: error.message,
    });

  } finally {
    if (worker) {
      await worker.terminate();
    }
  }
});

// Multer Error Handler
app.use((error, req, res, next) => {

  if (error instanceof multer.MulterError) {
    return res.status(400).json({
      message: error.message,
    });
  }

  if (error) {
    return res.status(400).json({
      message: error.message,
    });
  }

  next();
});

// Start Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});