const bcrypt = require("bcrypt");
const User = require("../models/User");
const jwt = require("jsonwebtoken");

// Function to register a new user
const registerUser = async (name, email, password, role) => {
  try {
    const checkExistingUser = await User.findOne({
      $or: [{ name }, { email }],
    });
    if (checkExistingUser) {
      throw new Error("User already exists with the same name or email.");
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    if (!role) {
      role = "user";
    }

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      role,
    });

    const savedUser = await newUser.save();
    return savedUser;
  } catch (error) {
    throw error;
  }
};

// Function to login a user
const loginUser = async (email, password) => {
  try {
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error("User does not exist");
    }

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      throw new Error("Incorrect password");
    }

    const accessToken = jwt.sign(
      {
        userId: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "15M" }
    );

    return { user, accessToken };
  } catch (error) {
    throw error;
  }
};

// Function to handle logout
// Since the server doesn't store JWT, we only need to handle the client-side token deletion
const logoutUser = () => {
  // Nothing to do here server-side for JWT-based auth
  // But if you have some session-based authentication, you could destroy a session here
  return;
};

module.exports = { registerUser, loginUser, logoutUser };
