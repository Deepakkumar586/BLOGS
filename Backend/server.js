const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const path = require("path");
const cloudinary = require("cloudinary").v2;
// const { CloudinaryStorage } = require("multer-storage-cloudinary"); // Optional for multer integration

require("dotenv").config();

// Enable CORS
app.use(cors({ origin: "https://blogs-4v8d.onrender.com", credentials: true }));
app.use(cookieParser());

// Cloudinary configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Database connection (Your existing code)
const database = require("./DB/database");
database.connect();

// Middleware for JSON parsing
app.use(express.json());

// Static path for images (optional if you still want to serve from server)
app.use("/images", express.static(path.join(__dirname, "/images")));

// Routes (your existing routes)
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/users");
const blogRoutes = require("./routes/blog");
const commentRoutes = require("./routes/comment");

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/blogs", blogRoutes);
app.use("/api/comment", commentRoutes);

// Image Upload route using Cloudinary
app.post("/api/upload", (req, res) => {
  const file = req.files.file; // Assuming the field name is 'file'

  cloudinary.uploader.upload(file.tempFilePath, { folder: "blog_images" }, (error, result) => {
    if (error) {
      return res.status(500).json({ success: false, message: "Image upload failed", error });
    }
    res.status(200).json({
      success: true,
      message: "Image has been uploaded successfully!",
      url: result.secure_url, // URL of the uploaded image
    });
  });
});

// Deployment code (optional)
const _dirname = path.resolve();
app.use(express.static(path.join(_dirname, "/frontend/dist")));
app.get("*", (req, res) => {
  res.sendFile(path.resolve(_dirname, "frontend", "dist", "index.html"));
});

// Server start
const PORT = process.env.PORT || 8010;
app.listen(PORT, () => {
  console.log(`App is running on port ${PORT}`);
});
