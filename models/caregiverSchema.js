const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const caregiverSchema = new Schema({

    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    assignedPatients: [{
        type: Schema.Types.ObjectId,
        ref: "Patient",
        required: true
    }],

    relationToPatient: {
        type: String,
        required: [true, "Relation to patient is required"],
    },

    responsibilities: [{
        type: String,
        enum: ["track_medication", "log_vitals", "provide_support"],
    }],

    notesForDoctor: {
        type: String,
    }

},
{timestamps: true}
);

module.exports = mongoose.model("Caregiver", caregiverSchema);

//Caregiver --> caregivers
