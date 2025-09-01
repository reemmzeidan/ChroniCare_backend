const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reportSchema = new Schema({
  patient: {
    type: Schema.Types.ObjectId,
    ref: "User", 
    required: true,
  },

  caregiver: {
    type: Schema.Types.ObjectId,
    ref: "User", 
  },

  doctor: {
    type: Schema.Types.ObjectId,
    ref: "User", 
  },

  medication: [{
    type: Schema.Types.ObjectId,
    ref: "Medication", 
  }],
  
   Tracking: [{
    type: Schema.Types.ObjectId,
    ref: "Tracking", 
  }],

  plan: [{
    type: Schema.Types.ObjectId,
    ref: "Plan", 
  }],

  points: {
    type: Schema.Types.ObjectId,
    ref: "Points", 
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },

},
{timestamps: true}
);

module.exports = mongoose.model("Report", reportSchema);
//Report --> reports
