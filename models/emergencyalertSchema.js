const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const emergencyAlertSchema = new Schema({
  patient: {
    type: Schema.Types.ObjectId,
    ref: "Patient",
    required: true
  },
  doctor: {
    type: Schema.Types.ObjectId,
    ref: "Doctor",
    required: true
  },
  caregiver: {
    type: Schema.Types.ObjectId,
    ref: "Caregiver",
    required: true
  },
  alertType: {
    type: String,
    enum: ["Fall", "ChestPain", "Unconscious", "Other"],
    required: true
  },
  message: {
    type: String,
    default: "Emergency alert triggered!"
  },
  status: {
    type: String,
    enum: ["Pending", "Acknowledged", "Resolved"],
    default: "Pending"
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("EmergencyAlert", emergencyAlertSchema);
