// routes/trackingRoutes.js
const express = require("express");
const {
  createTracking,
  getAllTracking,
  getTrackingByPatient,
  updateTracking,
  deleteTracking,
} = require("../controllers/trackingController");

const router = express.Router();

router.post("/", createTracking);
router.get("/", getAllTracking);
router.get("/:patientId", getTrackingByPatient);
router.put("/:trackingId", updateTracking);
router.delete("/:trackingId", deleteTracking);

module.exports = router;
