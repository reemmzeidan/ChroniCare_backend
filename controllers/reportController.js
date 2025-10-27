const Report = require("../models/reportSchema");
const Patient = require("../models/patientSchema");
const Medication = require("../models/medicationSchema");
const Tracking = require("../models/trackingSchema");
const Plan = require("../models/planSchema");
const Points = require("../models/pointsSchema");

// ✅ Create a new report
exports.createReport = async (req, res) => {
  try {
    const { patient, caregiver, doctor, medication, tracking, plan, points } = req.body;

    const patientExists = await Patient.findById(patient);
    if (!patientExists) return res.status(404).json({ message: "Patient not found" });

    const report = await Report.create({
      patient,
      caregiver,
      doctor,
      medication,
      Tracking: tracking,
      plan,
      points
    });

    res.status(201).json({ data: report, message: "Report created successfully" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// ✅ Get all reports
exports.getAllReports = async (req, res) => {
  try {
    const reports = await Report.find()
      .populate("patient caregiver doctor medication Tracking plan points")
      .sort({ createdAt: -1 });

    res.status(200).json(reports);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✅ Get reports by patient
exports.getReportsByPatient = async (req, res) => {
  try {
    const reports = await Report.find({ patient: req.params.patientId })
      .populate("patient caregiver doctor medication Tracking plan points")
      .sort({ createdAt: -1 });

    res.status(200).json(reports);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✅ Update report
exports.updateReport = async (req, res) => {
  try {
    const report = await Report.findById(req.params.reportId);
    if (!report) return res.status(404).json({ message: "Report not found" });

    report.caregiver = req.body.caregiver || report.caregiver;
    report.doctor = req.body.doctor || report.doctor;
    report.medication = req.body.medication || report.medication;
    report.Tracking = req.body.tracking || report.Tracking;
    report.plan = req.body.plan || report.plan;
    report.points = req.body.points || report.points;

    await report.save();

    res.status(200).json({ data: report, message: "Report updated successfully" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// ✅ Delete report
exports.deleteReport = async (req, res) => {
  try {
    const report = await Report.findById(req.params.reportId);
    if (!report) return res.status(404).json({ message: "Report not found" });

    await report.deleteOne();
    res.status(200).json({ message: "Report deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
