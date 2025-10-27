const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const trackingSchema = new Schema({

    patient: {
        type: Schema.Types.ObjectID,  
        ref: "Patient",
        required: [true, "Patient is required"]

    },

    bloodPressure: {
        type: String,
    },

    sugarLevel: {
        type: Number,
    },

    notes: {
        type: String,
    },

    date: {
        type: Date,
        default: Date.now
    },

    weight: {
        type: Number,
        required: true
    },

    height: {
        type: Number,
    },

    symptoms: {
        type: String,
    },


},
{timestamps: true}
);

module.exports = mongoose.model("Tracking",trackingSchema) 