const express = require("express");
const app = express();
const router = express.Router();
const cors = require('cors');
const  cookieParser = require('cookie-parser');


// enable cors ---connect Express Middleware
app.use(cors());
app.use(cookieParser())

// Middleware-->request ki body se data ko fetch karne ke liye use karte hai
app.use(express.json());
 

// Database Connect
const database = require("./DB/database");
database.connect();


// Routes
const userRoutes = require('./routes/auth');

// USE ROUTES
app.use("/api/auth", userRoutes);


// default routes
app.get("/", (req, res) => {
  return res.json({
      success: true,
      message: 'Your server is up and running......'

  })
})


// middlewares
require("dotenv").config();
const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`App is Running on Port ${PORT}`);
});
