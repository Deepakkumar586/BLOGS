const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "You are not authenticated.",
    });
  }

  // Decode the token to check expiration
  jwt.verify(token, process.env.SECRET, (err, data) => {
    if (err) {
      return res.status(401).json({
        success: false,
        message: "Token is not valid.",
      });
    }

    // Check if token is expired
    const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds
    if (currentTime > data.exp) {
      return res.status(401).json({
        success: false,
        message: "Token has expired. Please log in again.",
      });
    }

    req.userId = data._id;
    req.username = data.username;  // Assuming username is part of the token payload
    next();
  });
};

module.exports = verifyToken;
