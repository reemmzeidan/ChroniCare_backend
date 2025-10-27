const express = require("express");
const {
  addCaregiver,
  getAllCaregivers,
  getCaregiverById,
  updateCaregiver,
  deleteCaregiver,
  assignCaregiverToPatient,
} = require("../controllers/caregiverController");

const router = express.Router();

// Caregiver routes
router.post("/", addCaregiver);
router.get("/", getAllCaregivers);
router.get("/:id", getCaregiverById);
router.put("/:id", updateCaregiver);
router.delete("/:id", deleteCaregiver);
router.put("/assign", assignCaregiverToPatient);

module.exports = router;
