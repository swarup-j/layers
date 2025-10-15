const {
  registerUser,
  loginUser,
  logoutUser,
} = require("../services/auth-service");

// Register Controller
const registerController = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    const savedUser = await registerUser(name, email, password, role);

    res.status(201).json({
      success: true,
      message: "User registered successfully!",
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      success: false,
      message: error.message || "Something went wrong, please try again later.",
    });
  }
};

// Login Controller
const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    const { user, accessToken } = await loginUser(email, password);

    res.status(200).json({
      success: true,
      message: "User logged in successfully",
      accesstoken: accessToken,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      success: false,
      message: error.message || "Something went wrong",
    });
  }
};

// Logout Controller
const logoutController = (req, res) => {
  try {
    logoutUser(); // We don't need to do anything on the server side
    res.status(200).json({
      success: true,
      message: "User logged out successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

const getCurrentUserController = (req, res) => {};
const sendVerificationController = (req, res) => {
  //body will contain otp
  //need to verify the email and confirm registration
};
const forgotPasswordController = (req, res) => {};
const resetPasswordController = (req, res) => {};

module.exports = {
  loginController,
  registerController,
  logoutController,
  getCurrentUserController,
  sendVerificationController,
  forgotPasswordController,
  resetPasswordController,
};
