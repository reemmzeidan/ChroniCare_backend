const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const goalSchema = new Schema({

    patient: {
        type: Schema.Types.ObjectId,
        ref: "Patient",
        required: [true, "Patient is required"]
    },

    title: {
        type: String,
        required: [true, "Goal title is required"]
    },

    description: {
        type: String,
        default: ""
    },

    progress: {
        type: Number,
        default: 0
    },

    status: {
        type: String,
        enum: ["pending", "in_progress", "completed"],
        default: "pending"
    }

},
{timestamps: true}
);

module.exports = mongoose.model("Goal", goalSchema);
//Goal --> goals
