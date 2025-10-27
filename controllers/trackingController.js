const Tracking = require("../models/trackingSchema");
const Patient = require("../models/patientSchema");


exports.createTracking = async (req, res) => { //to create a new tracking entry
  try {
    const { patient, bloodPressure, sugarLevel, weight, height, notes, symptoms, date } = req.body;

    const patientExists = await Patient.findById(patient);
    if (!patientExists) return res.status(404).json({ message: "Patient not found" });

    const tracking = await Tracking.create({
      patient,
      bloodPressure,
      sugarLevel,
      weight,
      height,
      notes,
      symptoms,
      date: Date.now(),
    });

    // Optionally link to patient
    patientExists.trackingData.push(tracking._id);
    await patientExists.save();

    res.status(201).json({ data: tracking, message: "Tracking data created successfully" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};


exports.getAllTracking = async (req, res) => { //get all tracking
  try {
    const trackingEntries = await Tracking.find().populate("patient");
    res.status(200).json(trackingEntries);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


exports.getTrackingByPatient = async (req, res) => { //tracking for each separate patient
  try {
    const trackingEntries = await Tracking.find({ patient: req.params.patientId }).populate("patient");
    res.status(200).json(trackingEntries);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


exports.updateTracking = async (req, res) => { //to update a tracking entry
  try {
    const tracking = await Tracking.findById(req.params.trackingId);
    if (!tracking) 
        return res.status(404).json({ message: "Tracking entry not found" });

    tracking.bloodPressure = req.body.bloodPressure || tracking.bloodPressure;
    tracking.sugarLevel = req.body.sugarLevel || tracking.sugarLevel;
    tracking.weight = req.body.weight || tracking.weight;
    tracking.height = req.body.height || tracking.height;
    tracking.notes = req.body.notes || tracking.notes;
    tracking.symptoms = req.body.symptoms || tracking.symptoms;
    tracking.date = req.body.date || tracking.date;

    await tracking.save();

    res.status(200).json({ data: tracking, message: "Tracking entry updated successfully" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};


exports.deleteTracking = async (req, res) => { //to delete a tracking entry
  try {
    const tracking = await Tracking.findById(req.params[trackingId]);
    if (!tracking) 
        return res.status(404).json({ message: "Tracking entry not found" });

    await tracking.deleteOne();
    res.status(200).json({ message: "Tracking entry deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
