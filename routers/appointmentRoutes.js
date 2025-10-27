const express = require("express");
const {
  createAppointment,
  updateAppointment,
  confirmAppointment,
  rejectAppointment,
  completeAppointment,
  deleteAppointment,
} = require("../controllers/appointmentController");

const router = express.Router();

// Appointment routes
router.post("/", createAppointment);
router.put("/:appointmentId", updateAppointment);
router.put("/:appointmentId/confirm", confirmAppointment);
router.put("/:appointmentId/reject", rejectAppointment);
router.put("/:appointmentId/complete", completeAppointment);
router.delete("/:appointmentId", deleteAppointment);

module.exports = router;
