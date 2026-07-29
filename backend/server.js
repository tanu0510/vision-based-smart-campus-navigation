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
app.use("/uploads", express.static("uploads"));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
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

// Upload + AI Detection route
app.post("/upload", upload.single("image"), async (req, res) => {
  try {
    const imagePath = path.join(
      __dirname,
      "uploads",
      req.file.filename
    );

    const formData = new FormData();

    formData.append(
      "file",
      fs.createReadStream(imagePath)
    );

    const aiResponse = await axios.post(
      "http://127.0.0.1:8000/detect",
      formData,
      {
        headers: formData.getHeaders(),
      }
    );

    res.json({
      message: "Image Uploaded Successfully",
      filename: req.file.filename,
      imageUrl: `http://localhost:5000/uploads/${req.file.filename}`,
      detectedText: aiResponse.data.detected_text,
    });

  } catch (error) {
    console.error("AI Error:", error.message);

    res.status(500).json({
      message: "AI Detection Failed",
      error: error.message,
    });
  }
});

const PORT = 5000;

app.listen(PORT, () => {
  console.log(
    `Server running on http://localhost:${PORT}`
  );
});