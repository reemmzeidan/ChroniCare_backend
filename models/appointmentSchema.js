const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const appointmentSchema = new Schema({

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

    date:{
        type: Date,
        required: [true, "Date is required"]

    },

    status: {
        type: String,
        enum: ["pending", "confirmed", "rejected", "completed"],
        default: "pending"
    },



},
{timestamps: true}
);

module.exports = mongoose.model("Appointment",appointmentSchema) //to export it

//Appointment --> appointments