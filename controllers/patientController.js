const Patient = require("../models/patientSchema");
const Doctor = require("../models/doctorSchema");
const Tracking = require("../models/trackingSchema");



exports.addPatient = async (req, res) => {
  try {
    const { user, linkedDoctor, medicalHistory } = req.body;

    // checking if doctor exists if provided
    if (linkedDoctor) {
      const doctorExists = await Doctor.findById(linkedDoctor);
      if (!doctorExists) return res.status(404).json({ message: "Doctor not found" });
    }

    const patient = await Patient.create({
      user,
      linkedDoctor: linkedDoctor || null,
      medicalHistory,
    });

    res.status(201).json({ data: patient, message: "Patient registered successfully" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};


exports.getAllPatients = async (req, res) => {
  try {
    const patients = await Patient.find().populate("user linkedDoctor trackingData");
    res.status(200).json(patients);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


exports.getPatientById = async (req, res) => {
  try {
    const patient = await Patient.findById(req.params.id).populate("user linkedDoctor trackingData");
    if (!patient) return res.status(404).json({ message: "Patient not found" });
    res.status(200).json(patient);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getPatientByUserId = async (req, res) => {
  try {
    const patient = await Patient.findOne({ user: req.params.userId })
      .populate("user linkedDoctor trackingData");
    if (!patient) return res.status(404).json({ message: "Patient not found" });
    res.status(200).json(patient);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};



exports.updateMedicalHistory = async (req, res) => {
  try {
    const patient = await Patient.findById(req.params.id);
    if (!patient) return res.status(404).json({ message: "Patient not found" });

    patient.medicalHistory = req.body.medicalHistory || patient.medicalHistory;
    await patient.save();

    res.status(200).json({ data: patient, message: "Medical history updated" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};


exports.linkDoctor = async (req, res) => {
  try {
    const patient = await Patient.findById(req.params.patientId);
    const doctor = await Doctor.findById(req.params.doctorId);

    if (!patient || !doctor) return res.status(404).json({ message: "Patient or doctor not found" });

    patient.linkedDoctor = doctor._id;
    await patient.save();

    res.status(200).json({ data: patient, message: "Doctor linked to patient" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


exports.unlinkDoctor = async (req, res) => {
  try {
    const patient = await Patient.findById(req.params.patientId);
    if (!patient) return res.status(404).json({ message: "Patient not found" });

    patient.linkedDoctor = null;
    await patient.save();

    res.status(200).json({ message: "Doctor unlinked from patient" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


exports.addTrackingData = async (req, res) => {
  try {
    const patient = await Patient.findById(req.params.patientId);
    if (!patient) return res.status(404).json({ message: "Patient not found" });

    const tracking = await Tracking.create({ ...req.body, patient: patient._id });
    patient.trackingData.push(tracking._id);
    await patient.save();

    res.status(201).json({ data: tracking, message: "Tracking data added successfully" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};


exports.getTrackingHistory = async (req, res) => {
  try {
    const patient = await Patient.findById(req.params.patientId).populate("trackingData");
    if (!patient) return res.status(404).json({ message: "Patient not found" });

    res.status(200).json({ trackingData: patient.trackingData });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET profile by user ID
exports.getPatientProfile = async (req, res) => {
  try {
    const patient = await Patient.findOne({ user: req.params.userId }).populate("user");

    if (!patient) {
      return res.status(404).json({ message: "Patient not found" });
    }

    res.status(200).json({
      status: "success",
      data: patient,
    });
  } catch (error) {
    console.error("Error fetching patient profile:", error);
    res.status(500).json({ message: "Server error" });
  }
};
