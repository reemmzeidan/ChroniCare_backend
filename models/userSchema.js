const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({

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

    gender: {
        type: String,
        enum: ["Male", "Female", "Other"],
        required: [true, "Gender is required"],
    },
    
    role: {
        type: String,
        enum: ["patient", "doctor", "caregiver", "admin"],
        required: [true, "Role is required"],
    },

    email:{
        type: String,
        unique: true,
        required: [true, "Email is required"],
        trim: true,

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
    

    password:{
        type: String,
        required: [true, "Password is required"],
        trim: true,
        minLength:8,

    },

    passwordConfirm:{
        type: String,
        trim: true,
        minLength:8,

    },

    passwordChangedAt: Date,
   

},
{timestamps: true}
);

userSchema.pre("save", async function(next){
try{
    if(!this.isModified("password")) { 
        return next(); 
    }
    this.password = await bcrypt.hash(this.password, 12);
    this.passwordConfirm = undefined; 

}catch(err){
    console.log(err)
}
});

userSchema.methods.checkPassword = async function(candidatePassword, userPassword){ //candidate coming from frontend & user hashed saved pass coming from db
    return await bcrypt.compare(candidatePassword,userPassword);
 
};



module.exports = mongoose.model("User",userSchema) 

//User --> users