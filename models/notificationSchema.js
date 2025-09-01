const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const notificationSchema = new Schema({
  recipient: {
    type: Schema.Types.ObjectId,
    ref: "User", // whether patient, doctor, or caregiver
    required: true,
  },
  type: {
    type: String,
    enum: ["appointment", "medication", "emergency", "report", "general"],
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  isRead: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
},
{timestamps: true}
);

module.exports = mongoose.model("Notification", notificationSchema);
