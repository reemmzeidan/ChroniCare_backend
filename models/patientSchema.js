const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const patientSchema = new Schema({

   user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true
   },

   linkedDoctor: {
    type: Schema.Types.ObjectId,
    ref: "Doctor",
   },

   trackingData: [{
    type: Schema.Types.ObjectId,
    ref: "Tracking",
   },],
   
   
    medicalHistory: {
        type: [Schema.Types.ObjectId],
        required: [true, "Medical History is required"],
    },  
},
{timestamps: true}
);
module.exports = mongoose.model("Patient",patientSchema)

//Patient --> patients