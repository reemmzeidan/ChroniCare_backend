const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const pointsSchema = new Schema({

    patient: {
        type: Schema.Types.ObjectId,
        ref: "Patient",
        required: [true, "Patient is required"]
    },

    description: {
        type: String,
        required: [true, "Description is required"]
    },

    value: {
        type: Number,
        required: [true, "Points value is required"]
    },

    totalPoints: {
        type: Number,
        default: 0
    }

},
{timestamps: true}
);

module.exports = mongoose.model("Points", pointsSchema);
//Points --> points
