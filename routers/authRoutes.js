const express = require("express");
const { login, protect } = require("../controllers/authController");

const router = express.Router();

// Auth routes
router.post("/login", login);


module.exports = router;
