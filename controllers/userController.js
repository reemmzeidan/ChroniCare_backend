const User = require("../models/userSchema");
const validator = require("validator");
exports.signup = async(req,res) => {
    try{
        if(!validator.isEmail(req.body["email"])){
            return res.status(400).json({message: "Invalid email address"});
        }

        const checkUserExistence = await User.findOne({$or: [{email: req.body["email"]},{username: req.body["username"]}]});

        if(checkUserExistence){
            return res.status(409).json({message:  "User already exists"}); //409 conflict
        }

        if(req.body["password"] !== req.body["passwordConfirm"]){
            return res.status(400).json({message: "Please enter matching password and password confirm"});
        }

        const newUser = await User.create({
            firstName: req.body["firstName"],
            lastName: req.body["lastName"],
            username: req.body["username"],
            email: req.body["email"],
            age: req.body["age"],
            gender: req.body["gender"],
            role: req.body["role"],
            phoneNumber: req.body["phoneNumber"],
            password: req.body["password"],
            passwordConfirm: req.body["passwordConfirm"],
            passwordChangedAt: Date.now(),  
        });
    
        return res.status(201).json({message: "signup successfully"});

    }catch(err){
        console.log(err);
        return res.status(500).json({message: err.message});
    }
};

exports.login = async(req,res) =>{
    try{
        
        const {email,password} = req.body;
        const user = await User.findOne({email}); 
        if(!user || !(await user.checkPassword(password, user.password))){ //user not found or user password in db is not equal to password entered
            return res.status(401).json({message: "Invalid Credentials"}); //401 unauthorized user
        }

        return res.status(200).json({message: "Logged in successfully"});

    }catch(err){
        console.log(err);
        res.status(500).json({message: err.message});
    }
}
