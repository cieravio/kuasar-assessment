const pool = require("../config/db");

const healthCheck = async (req, res) => {
  try {
    await pool.query("SELECT 1");
    res.status(200).json({
      success: true,
      message: "Application is healthy and DB is connected",
      data: {
        status: "OK",
        timestamp: new Date(),
      },
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: "Database connection error",
      error: error.message,
    });
  }
};

module.exports = { healthCheck };
