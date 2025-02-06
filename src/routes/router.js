const express = require("express");
const { healthCheck } = require("../controllers/healthController");
const userController = require("../controllers/userController");
const authMiddleware = require("../middleware/middleware");

const router = express.Router();

router.get("/api/health", healthCheck);

router.post("/api/register", userController.register);
router.post("/api/login", userController.login);
router.patch("/api/user/username", authMiddleware, userController.changeUsername);

module.exports = router;
