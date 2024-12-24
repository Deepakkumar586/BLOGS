const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const path = require("path");
const cloudinary = require("cloudinary").v2;
const multer = require("multer");
const fs = require("fs"); // Import filesystem module

require("dotenv").config();

const app = express();

// Enable CORS
app.use(cors({ origin: "https://blogs-4v8d.onrender.com", credentials: true }));
app.use(cookieParser());

// Cloudinary configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Set storage engine for multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "Backend/uploads/"); // Save to 'uploads' folder in Backend
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // Use timestamp for file naming
  },
});

const upload = multer({ storage: storage }); // Multer setup for handling uploads

// Database connection (Your existing code)
const database = require("./DB/database");
database.connect();

// Middleware for JSON parsing
app.use(express.json())

// Static path for images (serve from 'uploads' folder)
app.use("/uploads", express.static(path.join(__dirname, "Backend/uploads")));

// Routes
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/users");
const blogRoutes = require("./routes/blog");
const commentRoutes = require("./routes/comment");

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/blogs", blogRoutes);
app.use("/api/comment", commentRoutes);

// Image Upload route using Cloudinary and Multer
app.post("/api/upload", upload.single("file"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ success: false, message: "No file uploaded" });
  }

  const filePath = req.file.path; // Access the file path from multer

  // Upload the image to Cloudinary
  cloudinary.uploader.upload(
    filePath,
    { folder: "blog_images" },
    (error, result) => {
      // Remove the temporary file from the server
      fs.unlink(filePath, (unlinkErr) => {
        if (unlinkErr) {
          console.error("Failed to delete temporary file:", unlinkErr);
        }
      });

      if (error) {
        console.error("Cloudinary Upload Error:", error);
        return res
          .status(500)
          .json({ success: false, message: "Image upload failed", error });
      }

      // Send back the Cloudinary URL
      res.status(200).json({
        success: true,
        message: "Image has been uploaded successfully!",
        url: result.secure_url, // Cloudinary image URL
      });
    }
  );
});

// Deployment code (optional)
const _dirname = path.resolve();
app.use(express.static(path.join(_dirname, "/frontend/dist")));
app.get("*", (req, res) => {
  res.sendFile(path.resolve(_dirname, "frontend", "dist", "index.html"));
});

// Server start
const PORT = process.env.PORT || 8010;
