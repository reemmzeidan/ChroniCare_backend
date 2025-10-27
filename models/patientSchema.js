const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const patientSchema = new Schema({

   user: {
    type: String,
    ref: "User",
    required: true
   },

   linkedDoctor: {
    type: String,
    ref: "Doctor",
   },

   trackingData: [{
    type: Schema.Types.ObjectId,
    ref: "Tracking",
   },],
   
   
    medicalHistory: {
        type: [{String}],
        required: [true, "Medical History is required"],
    },  
},
{timestamps: true}
);
module.exports = mongoose.model("Patient",patientSchema)

//Patient --> patients