const User = require("../model/User");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  const { name, email, password, confirmPassword } = req.body;
  try {

     if (!name || !email || !password || !confirmPassword) {
      return res.status(400).json({ message: "All fields are required" });
    }
    
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }
    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }

    const newUser = new User({
      name,
      email,
      password,
    });

    await newUser.save();
    const token = newUser.generateAccessToken();

    res
      .status(201)
      .header("auth-token", token)
      .json({
        message: "User registered successfully",
        user: {
          name: newUser.name,
          email: newUser.email,
        },
      });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {

    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    
    const existingUser = await User.findOne({ email });

    if (!existingUser || !(await existingUser.comparePassword(password))) {
      return res.status(400).json({ message: "Wrong Email or Password" });
    }

    const token = existingUser.generateAccessToken();

    res
      .status(201)
      .header("auth-token", token)
      .json({
        message: "User logged in successfully",
        user: {
          name: existingUser.name,
          email: existingUser.email,
        },
      });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
