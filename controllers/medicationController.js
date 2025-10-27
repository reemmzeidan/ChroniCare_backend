const Medication = require("../models/medicationSchema");
const User = require("../models/userSchema");


exports.createMedication = async (req, res) => {
  try {
    const { user, name, dosage, frequency, startDate, endDate, notes } = req.body;

    const userExists = await User.findById(user);
    if (!userExists) return res.status(404).json({ message: "User not found" });

    const medication = await Medication.create({ user, name, dosage, frequency, startDate, endDate, notes });

    res.status(201).json({ data: medication, message: "Medication created successfully" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};


exports.getAllMedications = async (req, res) => {
  try {
    const medications = await Medication.find().populate("user");
    res.status(200).json(medications);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};



exports.getMedicationsByUser = async (req, res) => {
  try {
    const medications = await Medication.find({ user: req.params.userId }).populate("user");
    res.status(200).json(medications);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


exports.updateMedication = async (req, res) => {
  try {
    const medication = await Medication.findById(req.params.medicationId);
    if (!medication) return res.status(404).json({ message: "Medication not found" });

    medication.name = req.body.name || medication.name;
    medication.dosage = req.body.dosage || medication.dosage;
    medication.frequency = req.body.frequency || medication.frequency;
    medication.startDate = req.body.startDate || medication.startDate;
    medication.endDate = req.body.endDate || medication.endDate;
    medication.notes = req.body.notes || medication.notes;

    await medication.save();

    res.status(200).json({ data: medication, message: "Medication updated successfully" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};


exports.deleteMedication = async (req, res) => {
  try {
    const medication = await Medication.findById(req.params.medicationId);
    if (!medication) return res.status(404).json({ message: "Medication not found" });

    await medication.deleteOne();
    res.status(200).json({ message: "Medication deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
