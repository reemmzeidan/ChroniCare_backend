const Points = require("../models/pointsSchema");
const Patient = require("../models/patientSchema");


exports.createPoints = async (req, res) => {
  try {
    const { patient, description, value, totalPoints } = req.body;

    const patientExists = await Patient.findById(patient);
    if (!patientExists) return res.status(404).json({ message: "Patient not found" });

    const points = await Points.create({ patient, description, value, totalPoints });

    res.status(201).json({ data: points, message: "Points entry created successfully" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};


exports.getAllPoints = async (req, res) => {
  try {
    const pointsEntries = await Points.find().populate("patient");
    res.status(200).json(pointsEntries);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


exports.getPointsByPatient = async (req, res) => {
  try {
    const pointsEntries = await Points.find({ patient: req.params.patientId }).populate("patient");
    res.status(200).json(pointsEntries);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


exports.updatePoints = async (req, res) => {
  try {
    const points = await Points.findById(req.params.pointsId);
    if (!points) return res.status(404).json({ message: "Points entry not found" });

    points.description = req.body.description || points.description;
    points.value = req.body.value || points.value;
    points.totalPoints = req.body.totalPoints || points.totalPoints;

    await points.save();

    res.status(200).json({ data: points, message: "Points entry updated successfully" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};


exports.deletePoints = async (req, res) => {
  try {
    const points = await Points.findById(req.params.pointsId);
    if (!points) return res.status(404).json({ message: "Points entry not found" });

    await points.deleteOne();
    res.status(200).json({ message: "Points entry deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
