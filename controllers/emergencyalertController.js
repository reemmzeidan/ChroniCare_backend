const EmergencyAlert = require("../models/emergencyAlertSchema");
const Patient = require("../models/patientSchema");
const Doctor = require("../models/doctorSchema");
const Caregiver = require("../models/caregiverSchema");


exports.createAlert = async (req, res) => {
  try {
    const { patient, doctor, caregiver, alertType, message } = req.body;

    // Validating the patient, doctor, caregiver existence
    const patientExists = await Patient.findById(patient);
    const doctorExists = await Doctor.findById(doctor);
    const caregiverExists = await Caregiver.findById(caregiver);

    if (!patientExists || !doctorExists || !caregiverExists) {
      return res.status(404).json({ message: "Patient, doctor, or caregiver not found" });
    }

    const alert = await EmergencyAlert.create({
      patient,
      doctor,
      caregiver,
      alertType,
      message: message || "Emergency alert triggered!",
    });

    res.status(201).json({ data: alert, message: "Emergency alert created" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


exports.getAllAlerts = async (req, res) => {
  try {
    const alerts = await EmergencyAlert.find()
      .populate("patient doctor caregiver")
      .sort({ createdAt: -1 });
    res.status(200).json(alerts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


exports.getAlertsByPatient = async (req, res) => {
  try {
    const alerts = await EmergencyAlert.find({ patient: req.params.patientId })
      .populate("doctor caregiver patient")
      .sort({ createdAt: -1 });
    res.status(200).json(alerts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


exports.updateAlertStatus = async (req, res) => {
  try {
    const alert = await EmergencyAlert.findById(req.params.alertId);
    if (!alert) return res.status(404).json({ message: "Alert not found" });

    alert.status = req.body.status || alert.status;
    await alert.save();

    res.status(200).json({ data: alert, message: "Alert status updated" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


exports.deleteAlert = async (req, res) => {
  try {
    const alert = await EmergencyAlert.findById(req.params.alertId);
    if (!alert) return res.status(404).json({ message: "Alert not found" });

    await alert.deleteOne();
    res.status(200).json({ message: "Alert deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
