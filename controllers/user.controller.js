const bcrypt = require("bcryptjs");

const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
const {userModel} = require("../Model/user.model");

// Load environment variables from .env file
dotenv.config();

// Secret key used to sign JWT tokens
const key = process.env.key || "default_secret_key";

// Signup endpoint
const signup = async (req, res) => {
  const user = req.body;
  const { name, email, password } = user;

  try {
    // Check if user with the same email already exists
    const existingUser = await userModel.findOne({ email });

    if (existingUser) {
      return res.status(400).send({
        status: "error",
        message: "User already exists",
      });
    }

    // Hash password using bcrypt
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = await userModel.create({
      name,
      email,
      password: hashedPassword,
    });

    // Remove password from user object before sending it in the response
    const userWithoutPassword = newUser.toObject();
    delete userWithoutPassword.password;

    return res.send({
      status: "success",
      data: userWithoutPassword,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send({
      status: "error",
      message: "Something went wrong",
    });
  }
};

// Login endpoint
const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if user exists in the database
    const existingUser = await userModel.findOne({ email });

    if (!existingUser) {
      return res.status(400).send({
        status: "error",
        message: "User does not exist",
      });
    }

    // Check if password matches the hashed password in the database
    const isPasswordMatch = await bcrypt.compare(password, existingUser.password);

    if (!isPasswordMatch) {
      return res.status(400).send({
        status: "error",
        message: "Incorrect password",
      });
    }

    // Create a JWT token for the user
    const token = jwt.sign(
      {
        _id: existingUser._id,
        name: existingUser.name,
        email: existingUser.email,
      },
      key
    );

    return res.send({
      status: "success",
      data: { token },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send({
      status: "error",
      message: "Something went wrong",
    });
  }
};

// User logged in endpoint
const userLoggedIn = async (req, res) => {
  try {
    // Extract token from Authorization header
    const authHeader = req.headers.authorization || "";
    const token = authHeader.split(" ")[1];

    if (!token) {
      return res.status(400).send({
        status: "error",
        message: "User not logged in",
      });
    }

    // Verify JWT token and extract user data from it
    const decodedToken = jwt.verify(token, key);
    const user = await userModel.findById(decodedToken._id);

    // Remove password from user object before sending it in the response
    const userWithoutPassword = user.toObject();
    delete userWithoutPassword.password;

    return res.send({
      status: "success",
      data: userWithoutPassword,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send({
      status: "error",



      message: "something went wrong",
    });
  }
};

module.exports = {
  userLoggedIn,
  login,
  signup,
};
