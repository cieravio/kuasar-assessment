const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  const token = req.header("Authorization");

  // Check if token doesnt exist
  if (!token) {
    return res.status(401).json({
      message: "Access denied",
    });
  }

  try {
    console.log("Authorization Header: ", token);
    const decoded = jwt.verify(token.replace("Bearer ", " "), process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({
      message: "Token invalid",
    });
  }
};

module.exports = authMiddleware;
