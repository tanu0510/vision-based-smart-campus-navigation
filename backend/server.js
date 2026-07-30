const express = require("express");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const axios = require("axios");
const fs = require("fs");

const app = express();

app.use(cors());
app.use(express.json());

// Ensure uploads folder exists
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
    cb(null, `${Date.now()}${path.extname(file.originalname)}`);
  },
});

const upload = multer({
  storage,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10 MB
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

// Test route
app.get("/", (req, res) => {
  res.send("Vision-Based Campus AI Backend is Running 🚀");
});

// Upload image + Google Vision OCR
app.post("/upload", upload.single("image"), async (req, res) => {
  let imagePath;

  try {
    if (!req.file) {
      return res.status(400).json({
        message: "No image uploaded",
      });
    }

    const apiKey = process.env.GOOGLE_VISION_API_KEY;

    if (!apiKey) {
      return res.status(500).json({
        message: "Google Vision API key is not configured",
      });
    }

    imagePath = path.join(uploadsDir, req.file.filename);

    // Convert uploaded image into Base64
    const imageBase64 = fs.readFileSync(imagePath).toString("base64");

    const visionResponse = await axios.post(
      `https://vision.googleapis.com/v1/images:annotate?key=${apiKey}`,
      {
        requests: [
          {
            image: {
              content: imageBase64,
            },
            features: [
              {
                type: "TEXT_DETECTION",
                maxResults: 50,
              },
            ],
          },
        ],
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
        timeout: 120000,
      }
    );

    const result = visionResponse.data.responses?.[0];

    if (result?.error) {
      throw new Error(result.error.message || "Google Vision OCR failed");
    }

    /*
      textAnnotations[0] contains complete detected text.
      Remaining entries contain individual words/text regions.
    */
    const completeText =
      result?.textAnnotations?.[0]?.description?.trim() || "";

    const detectedText = completeText
      ? completeText
          .split(/\r?\n/)
          .map((text) => text.trim())
          .filter(Boolean)
      : [];

    const backendURL =
      process.env.BACKEND_URL ||
      `${req.protocol}://${req.get("host")}`;

    return res.json({
      message: "Image uploaded and text detected successfully",
      filename: req.file.filename,
      imageUrl: `${backendURL}/uploads/${req.file.filename}`,
      detectedText,
      fullDetectedText: completeText,
    });
  } catch (error) {
    console.error(
      "Google Vision Error:",
      error.response?.data || error.message
    );

    return res.status(500).json({
      message: "Text detection failed",
      error:
        error.response?.data?.error?.message ||
        error.response?.data ||
        error.message,
    });
  }
});

// Multer and file upload error handler
app.use((error, req, res, next) => {
  if (error instanceof multer.MulterError) {
    return res.status(400).json({
      message: "Image upload failed",
      error: error.message,
    });
  }

  if (error) {
    return res.status(400).json({
      message: "Invalid image",
      error: error.message,
    });
  }

  next();
});

// Render provides PORT automatically
const PORT = process.env.PORT || 5000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});