const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const planSchema = new Schema({

    patient: {
        type: Schema.Types.ObjectId,
        ref: "Patient",
        required: [true, "Patient is required"]
    },

    doctor: {
        type: Schema.Types.ObjectId,
        ref: "Doctor",
        required: [true, "Doctor is required"]
    },

    type: {
        type: String,
        enum: ["meal", "exercise"],
        required: [true, "Plan type is required"]
    },

    title: {
        type: String,
        required: [true, "Title is required"]
    },

    description: {
        type: String,
        default: ""
    },

    schedule: {
        type: String, // can be JSON string or structured object
    },

    completed: {
        type: Boolean,
        default: false
    }

},
{timestamps: true}
);

module.exports = mongoose.model("Plan", planSchema);
//Plan --> plans
