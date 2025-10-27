// routes/pointsRoutes.js
const express = require("express");
const {
  createPoints,
  getAllPoints,
  getPointsByPatient,
  updatePoints,
  deletePoints,
} = require("../controllers/pointsController");

const router = express.Router();

router.post("/", createPoints);
router.get("/", getAllPoints);
router.get("/:patientId", getPointsByPatient);
router.put("/:pointsId", updatePoints);
router.delete("/:pointsId", deletePoints);

module.exports = router;
