const express = require("express");
const app = express();
// const router = express.Router();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const path = require("path");

const multer = require("multer");

// enable cors ---connect Express Middleware
// app.use(cors());
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(cookieParser());
// middlewares
require("dotenv").config();
const PORT = process.env.PORT || 8010;

// path fro deployment
const _dirname = path.resolve();

// Middleware-->request ki body se data ko fetch karne ke liye use karte hai
app.use(express.json());

app.use("/images", express.static(path.join(__dirname, "/images")));

// Database Connect
const database = require("./DB/database");
database.connect();

// Routes
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/users");
const blogRoutes = require("./routes/blog");
const commentRoutes = require("./routes/comment");

// USE ROUTES
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/blogs", blogRoutes);
app.use("/api/comment", commentRoutes);


// image upload
const storage = multer.diskStorage({
  destination: (req, file, fuun) => {
    fuun(null, "images");
  },
  filename: (req, file, fuun) => {
    fuun(null, req.body.img);
    // fuun(null,"hd.jpg")
  },
});

const upload = multer({ storage: storage });
app.post(
  "/api/upload",
  upload.single("file", (req, res) => {
    res.status(200).json({
      success: true,
      message: "Image has been uploaded Successfully!",
    });
  })
);

// deployment
app.use(express.static(path.join(_dirname, "/frontend/dist")));
app.get("*", (req, res) => {
  res.sendFile(path.resolve(_dirname, "frontend", "dist", "index.html"));
});

app.listen(PORT, () => {
  console.log(`App is Running on Port ${PORT}`);
});
