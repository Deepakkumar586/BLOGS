const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
require("dotenv").config();

// REGISTER USER
exports.userRegister = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // If User Already Exist in databse
    const existUser = await User.findOne({ username });
    if (existUser) {
      return res.status(401).json({
        success: false,
        message: "Sorry, User Already Registered",
      });
    }
    // if Email already Exist
    const existEmail = await User.findOne({ email });
    if (existEmail) {
      return res.status(401).json({
        success: false,
        message: "Sorry, This Email Already Registered",
      });
    }

    // password hashed
    const salt = await bcrypt.genSalt(10);
    const hashedpassword = await bcrypt.hashSync(password, salt);

    // save user in Database
    const saveUser = await User.create({
      username,
      email,
      password: hashedpassword,
    });
    console.log("Finally User Save in DB", saveUser);
    return res.status(200).json({
      success: true,
      saveUser,
      message: "User registered successfully",
    });
  } catch (err) {
    console.log("Register Problem");
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// LOGIN USER
exports.userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const findUser = await User.findOne({ email });
    if (!findUser) {
      return res.status(404).json({
        success: false,
        message: "This Email is not Registered in DB",
      });
    }

    // Generate JWT token and Compare Password
    if (await bcrypt.compare(password, findUser.password)) {
      const token = jwt.sign(
        {
          email: findUser.email,
          _id: findUser._id,
          username: findUser.username,
        },
        process.env.SECRET,
        {
          expiresIn: "24h",
        }
      );

      // Save token to user document in database
      findUser.token = token;
      findUser.password = undefined;

      // Set cookie for token and return success response
      const options = {
        expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
        httpOnly: true,
      };
      res.cookie("token", token, options).status(200).json({
        success: true,
        token,
        findUser,
        message: `User Login Success`,
      });
    } else {
      return res.status(401).json({
        success: false,
        message: `Password is incorrect`,
      });
    }
  } catch (error) {
    console.error(error);
    // Return 500 Internal Server Error status code with error message
    return res.status(500).json({
      success: false,
      message: `Login Failure Please Try Again`,
    });
  }
};

// LOGOUT USER
exports.userLogout = async (req, res) => {
  try {
    res
      .clearCookie("token", { sameSite: "none", secure: true })
      .status(200)
      .json({
        success: true,
        message: "User Logged Out Successfully",
      });
  } catch (error) {
    console.error(error);
    // Return 500 Internal Server Error status code with error message
    return res.status(500).json({
      success: false,
      message: `Logout Failure Please Try Again`,
    });
  }
};

// If User refresh Web
exports.refreshWeb = (req, res) => {
  const token=req.cookies.token
   jwt.verify(token,process.env.SECRET,{},async (err,data)=>{
      if(err){
          return res.status(404).json(err)
      }
      res.status(200).json(data)
  })
};
