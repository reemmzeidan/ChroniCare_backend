const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const medicationSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User", 
    required: true,
  },
  name: {
    type: String,
    required: true, 
  },
  dosage: {
    type: String,
    required: true, 
  },
  frequency: {
    type: String,
    required: true, 
  },
  startDate: {
    type: Date,
    default: Date.now,
  },
  endDate: {
    type: Date,
  },
  notes: {
    type: String, 
  },
},

);

module.exports = mongoose.model("Medication", medicationSchema);
