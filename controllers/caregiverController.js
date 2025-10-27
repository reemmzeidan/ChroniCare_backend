const Caregiver = require("../models/caregiverSchema");
const Patient = require("../models/patientSchema");


exports.addCaregiver = async (req, res) => {
    try {
        const caregiver = new Caregiver(req.body);
        await caregiver.save();
        res.status(201).json(caregiver);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};


exports.getAllCaregivers = async (req, res) => {
    try {
        const caregivers = await Caregiver.find().populate("patient");
        res.status(200).json(caregivers);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};


exports.getCaregiverById = async (req, res) => {
    try {
        const caregiver = await Caregiver.findById(req.params.id).populate("patient");
        if (!caregiver) return res.status(404).json({ message: "Caregiver not found" });
        res.status(200).json(caregiver);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};


exports.updateCaregiver = async (req, res) => {
    try {
        const caregiver = await Caregiver.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!caregiver) return res.status(404).json({ message: "Caregiver not found" });
        res.status(200).json(caregiver);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};


exports.deleteCaregiver = async (req, res) => {
    try {
        const caregiver = await Caregiver.findByIdAndDelete(req.params.id);
        if (!caregiver) return res.status(404).json({ message: "Caregiver not found" });
        res.status(200).json({ message: "Caregiver deleted successfully" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};


exports.assignCaregiverToPatient = async (req, res) => {
    try {
        const { caregiverId, patientId } = req.body;

        const caregiver = await Caregiver.findById(caregiverId);
        const patient = await Patient.findById(patientId);

        if (!caregiver || !patient) {
            return res.status(404).json({ message: "Caregiver or Patient not found" });
        }

        caregiver.patient = patient._id;
        await caregiver.save();

        res.status(200).json({ message: "Caregiver assigned to patient", caregiver });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
