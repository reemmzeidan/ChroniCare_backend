const express = require("express");
const {
  addPatient,
  getAllPatients,
  getPatientById,
  updateMedicalHistory,
  linkDoctor,
  unlinkDoctor,
  addTrackingData,
  getTrackingHistory,
  getPatientByUserId,
  getPatientProfile
} = require("../controllers/patientController");

const router = express.Router();

// Patient routes
router.post("/", addPatient);
router.get("/", getAllPatients);
router.get("/:patientId", getPatientById);
router.put("/:patientId", updateMedicalHistory);
router.put("/:patientId/link-doctor/:doctorId", linkDoctor);
router.put("/:patientId/unlink-doctor", unlinkDoctor);
router.post("/:patientId/tracking", addTrackingData);
router.get("/:patientId/tracking", getTrackingHistory);

// Routes using userId
router.get("/user/:userId", getPatientByUserId);
// Make the profile route unique to avoid duplicate path
router.get("/user/:userId/profile", getPatientProfile);

module.exports = router;
