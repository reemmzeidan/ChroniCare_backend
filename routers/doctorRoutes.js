const express = require("express");
const {
  addDoctor,
  getAllDoctors,
  getDoctorById,
  updateSpecialization,
  deleteDoctor,
  linkPatient,
  unlinkPatient,
} = require("../controllers/doctorController");

const router = express.Router();

// Routes
router.post("/", addDoctor);
router.get("/", getAllDoctors);
router.get("/:id", getDoctorById);
router.put("/:id", updateSpecialization);
router.delete("/:id", deleteDoctor);

router.post("/:doctorId/patients/:patientId", linkPatient);
router.delete("/:doctorId/patients/:patientId", unlinkPatient);

module.exports = router;
