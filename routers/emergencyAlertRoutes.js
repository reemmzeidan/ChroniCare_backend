const express = require("express");
const {
  createAlert,
  getAllAlerts,
  getAlertsByPatient,
  updateAlertStatus,
  deleteAlert,
} = require("../controllers/emergencyAlertController");

const router = express.Router();

// Emergency Alert routes
router.post("/", createAlert);
router.get("/", getAllAlerts);
router.get("/patient/:patientId", getAlertsByPatient);
router.put("/:alertId/status", updateAlertStatus);
router.delete("/:alertId", deleteAlert);

module.exports = router;
