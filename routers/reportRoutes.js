// routes/reportRoutes.js
const express = require("express");
const {
  createReport,
  getAllReports,
  getReportsByPatient,
  updateReport,
  deleteReport,
} = require("../controllers/reportController");

const router = express.Router();

router.post("/", createReport);
router.get("/", getAllReports);
router.get("/:patientId", getReportsByPatient);
router.put("/:reportId", updateReport);
router.delete("/:reportId", deleteReport);

module.exports = router;
