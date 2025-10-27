const express = require("express");
const {
  addPatient,
  getAllPatients,
  getPatientById,
  updateMedicalHistory,
  linkDoctor,
  unlinkDoctor,
  addTrackingData,
  getTrackingHistory
} = require("../controllers/patientController");

const router = express.Router();

router.post("/", addPatient);
router.get("/", getAllPatients);
router.get("/:patientId", getPatientById);
router.put("/:patientId", updateMedicalHistory);
router.put("/:patientId/link-doctor/:doctorId", linkDoctor);
router.put("/:patientId/unlink-doctor", unlinkDoctor);
router.post("/:patientId/tracking", addTrackingData);
router.get("/:patientId/tracking", getTrackingHistory);


module.exports = router;
