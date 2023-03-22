const User = require("../models/userModel");

const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");

exports.userSignup = async (req, res) => {
  const { firstname, lastname, email, phoneNumber, password } = req.body;
  try {
    // check if User already exists
    const userAlreadyExist = await User.findOne({ email });
    if (userAlreadyExist) {
      return res.status(409).json({
        message: "User already exists",
      });
    }

    // Hashing Password
    const salt = await bcrypt.genSalt(10);
    const HashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      firstname,
      lastname,
      phoneNumber,
      email,
      password: HashedPassword,
    });
    user;
    return res.status(201).json({
      message: "User Created Successfully",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong",
      error: error.message,
    });
  }
};

exports.userLogin = async (req, res) => {
  const { email, password } = req.body;
  try {
    // Check if user exists
    const userExistInDB = await User.findOne({ email });
    if (!userExistInDB) {
      return res.status(404).json({
        message: "User does not exist, please sign up",
      });
    }
    // Check if password matches the one in the database
    const isPasswordValid = await bcrypt.compare(
      password,
      userExistInDB.password
    );
    if (!isPasswordValid) {
      return res.status(401).json({
        message: "Invalid Credentials",
      });
    }

    // tokenize password
    const token = await jwt.sign(
      {
        email: userExistInDB.email,
        id: userExistInDB._id,
        firstname: userExistInDB.firstname,
        lastname: userExistInDB.lastname,
        phoneNumber: userExistInDB.phoneNumber,
        role: userExistInDB.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: process.env.JWT_EXP,
      }
    );

    res.cookie("token", {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: 1000 * 60 * 3, // 3 minutes
    });

    return res.status(200).json({
      message: "Login Successful",
      token,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong",
      error: error.message,
    });
  }
};

exports.userLogout = async (req, res) => {
  try {
    res.clearCookie("token");
    res.status(200).json({
      message: "Logout Successful",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong",
      error: error.message,
    });
  }
};

exports.getUsers = async (req, res) => {
  try {
    const users = await User.find({}, "-password"); // exclude password field from the response
    return res.status(200).json(users);
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong",
      error: error.message,
    });
  }
};



exports.DeleteOrder