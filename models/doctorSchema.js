const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const doctorSchema = new Schema({

    user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true
   },

    specialization: {
        type: String,
        required: [true, "Specialization is required"],
    },

    patients: [{
    type: Schema.Types.ObjectId,
    ref: "Patient",
   }],

     

},
{timestamps: true}
);

module.exports = mongoose.model("Doctor",doctorSchema)