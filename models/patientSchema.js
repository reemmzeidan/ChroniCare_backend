const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const patientSchema = new Schema({

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

    medicalHistory: {
        type: String,
        required: [true, "Medical History is required"],
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
        type: Schema.Types.ObjectID, //id that we just need since we don't want all its info 
        ref: "Appointment",

    },],
     
   

},
{timestamps: true}
);

module.exports = mongoose.model("Patient",patientSchema) //to export it

//Patient --> patients