const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const pool = require("../config/db");

const register = async (req, res) => {
  const { username, email, password } = req.body;

  // Check input fields
  if (!username || !email || !password) {
    return res.status(400).json({
      success: false,
      message: "All fields are required",
    });
  }

  try {
    // Check if email or username still available
    const userCheck = await pool.query("SELECT * FROM users WHERE email = $1 OR username = $2", [email, username]);
    if (userCheck.rows.length > 0) {
      return res.status(400).json({
        success: false,
        message: "Email or Username already registered",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await pool.query("INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING *", [username, email, hashedPassword]);

    res.status(201).json({
      success: true,
      message: "Registration successful",
      user: newUser.rows[0],
    });
  } catch (error) {
    console.error("Error in register: ", error.message);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  // Check input fields
  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: "Email and password are required",
    });
  }

  try {
    // Check if email is registered in database
    const user = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
    if (user.rows.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Email not registered",
      });
    }

    const isMatch = await bcrypt.compare(password, user.rows[0].password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Wrong password",
      });
    }

    // Create JWT token
    const token = jwt.sign({ id: user.rows[0].id }, process.env.JWT_SECRET, { expiresIn: "1h" });

    res.status(200).json({
      success: true,
      message: "Login success",
      data: token,
    });
  } catch (error) {
    console.error("Error in login: ", error.message);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

const changeUsername = async (req, res) => {
  const { username } = req.body;
  const userId = req.user.id;

  // Check input field
  if (!username) {
    return res.status(400).json({
      success: false,
      message: "Username is required",
    });
  }

  try {
    // Check if username already taken
    const userCheck = await pool.query("SELECT * FROM users WHERE username = $1", [username]);
    if (userCheck.rows.length > 0) {
      return res.status(400).json({
        success: false,
        message: "Username already taken",
      });
    }

    const updatedUser = await pool.query("UPDATE users SET username = $1 WHERE id = $2 RETURNING *", [username, userId]);

    res.status(200).json({
      success: true,
      message: "Username updated successfully",
      data: updatedUser.rows[0],
    });
  } catch (error) {
    console.error("Error in changeUsername: ", error.message);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

module.exports = { register, login, changeUsername };
