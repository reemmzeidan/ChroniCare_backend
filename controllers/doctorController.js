const Doctor = require("../models/doctorSchema");
const Patient = require("../models/patientSchema");


exports.addDoctor = async (req, res) => {
  try {
    const doctor = new Doctor(req.body);
    await doctor.save();
    res.status(201).json({ data: doctor, message: "Doctor added successfully" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};


exports.getAllDoctors = async (req, res) => {
  try {
    const doctors = await Doctor.find().populate("patients user");
    res.status(200).json(doctors);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


exports.getDoctorById = async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.params.id).populate("patients user");
    if (!doctor) return res.status(404).json({ message: "Doctor not found" });
    res.status(200).json(doctor);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


exports.updateSpecialization = async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.params.id);
    if (!doctor) return res.status(404).json({ message: "Doctor not found" });

    doctor.specialization = req.body.specialization || doctor.specialization;
    await doctor.save();

    res.status(200).json({ data: doctor, message: "Specialization updated" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.deleteDoctor = async (req, res) => {
  try {
    const doctor = await Doctor.findByIdAndDelete(req.params.id);
    if (!doctor) return res.status(404).json({ message: "Doctor not found" });

    // Optional: unlink doctor from patients
    await Patient.updateMany({ linkedDoctor: doctor._id }, { $set: { linkedDoctor: null } });

    res.status(200).json({ message: "Doctor deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


exports.linkPatient = async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.params.doctorId);
    const patient = await Patient.findById(req.params.patientId);

    if (!doctor || !patient) return res.status(404).json({ message: "Doctor or patient not found" });

    doctor.patients = patient._id; // your schema allows one patient only
    await doctor.save();

    res.status(200).json({ data: doctor, message: "Patient linked to doctor" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


exports.unlinkPatient = async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.params.doctorId);
    if (!doctor) return res.status(404).json({ message: "Doctor not found" });

    doctor.patients = null;
    await doctor.save();

    res.status(200).json({ message: "Patient unlinked from doctor" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
