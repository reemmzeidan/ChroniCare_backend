const Appointment = require("../models/appointmentSchema");
const User = require("../models/userSchema");
const Doctor = require("../models/doctorSchema");
const Patient = require("../models/patientSchema");


exports.createAppointment = async (req, res) => { //to create an appointment
  try {
    const { patient, doctor, date } = req.body;

    const patientExists = await Patient.findById(patient);
    const doctorExists = await Doctor.findById(doctor);

    if (!patientExists || !doctorExists) {
      return res.status(404).json({ message: "Patient or Doctor not found" });
    }

    const newAppointment = await Appointment.create({
      patient,
      doctor,
      date,
    });

    return res.status(201).json({ data: newAppointment, message: "Appointment created successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
};


exports.updateAppointment = async (req, res) => { 
  try {
    const appointment = await Appointment.findById(req.params["appointmentId"]);
    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    appointment.date = req.body.date || appointment.date;
    await appointment.save();

    return res.status(200).json({ data: appointment, message: "Appointment updated successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
};


exports.confirmAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params["appointmentId"]);
    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    appointment.status = "confirmed";
    await appointment.save();

    return res.status(200).json({ message: "Appointment confirmed" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
};


exports.rejectAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params["appointmentId"]);
    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    appointment.status = "rejected";
    appointment.reasonForRejection = req.body.reason || "Not specified";
    await appointment.save();

    return res.status(200).json({ message: "Appointment rejected" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
};


exports.completeAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params["appointmentId"]);
    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    appointment.status = "completed";
    appointment.notes = req.body.notes || appointment.notes;
    await appointment.save();

    return res.status(200).json({ message: "Appointment marked as completed" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
};


exports.deleteAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params["appointmentId"]);
    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    await appointment.deleteOne();

    return res.status(200).json({ message: "Appointment deleted successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
};
