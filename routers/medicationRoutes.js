const express = require("express");
const {
  createMedication,
  getAllMedications,
  getMedicationsByUser,
  updateMedication,
  deleteMedication,
} = require("../controllers/medicationController");

const router = express.Router();

// Medication routes
router.post("/", createMedication);
router.get("/", getAllMedications);
router.get("/user/:userId", getMedicationsByUser);
router.put("/:medicationId", updateMedication);
router.delete("/:medicationId", deleteMedication);

module.exports = router;
