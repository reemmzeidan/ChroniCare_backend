const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const doctorSchema = new Schema({

    firstName:{
        type: String,
        required:[true,"First Name is required"],
        trim: true,
        minLength: 3,
        maxLength: 50,
    },

     lastName:{
        type: String,
        required:[true,"Last Name is required"],
        trim: true,
        minLength: 3,
        maxLength: 50,
    },

    username:{
        type: String,
        unique: true,
        required: [true, "Username is required"],
        trim: true,
        maxLength: 50,

    },
    
    age:{
        type: Number,
        required: [true, "Age is required"],

    },

    password:{
        type: String,
        required: [true, "Username is required"],

    },

    gender: {
        type: String,
        enum: ["Male", "Female", "Other"]
    },

    specialization: {
        type: String,
        required: [true, "Specialization is required"],
    },


    email:{
        type: String,
        unique: true,
        required: [true, "Email is required"],
        trim: true,
        lowercase: true,

    },
    phoneNumber:{
        type: String,
        unique: true,
        required: [true, "Phone Number is required"],
        trim: true,
        maxLength: 20,

    },

    profilePicture:{
        type: String,
        default: "",
        
    },

    appointments: [{
        type: Schema.Types.ObjectID, 
        ref: "Appointment",

    },],
     
   

},
{timestamps: true}
);

module.exports = mongoose.model("Doctor",doctorSchema)