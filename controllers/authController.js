const jwt = require("jsonwebtoken");
const bcrypt = require('bcryptjs'); 
const User = require("../models/userSchema");
const validator = require("validator");

const signToken = (user) => {
    return jwt.sign(
        {id: user._id, firstName: user.firstName, lastName: user.lastName, role: user.role}, //add other properties
        process.env.JWT_SECRET,
        {expiresIn: process.env.JWT_EXPIRES_IN || "15m"}
    )
};

const createSendToken = (user, statusCode, message, res) => {
    const token = signToken(user);

    const sanitizeUser = {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
    };

    res.status(statusCode).json({
        status:"success",
        token,
        data: {user: sanitizeUser},
        message
    })
};

exports.signup = async (req, res) => {
  try {
    const { firstName, lastName, username, email, age, gender, role, phoneNumber, password, passwordConfirm } = req.body;

    // Validate email
    if (!validator.isEmail(email)) {
      return res.status(400).json({ message: "Invalid email address" });
    }

    // Check if user exists
    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      return res.status(409).json({ message: "User already exists" });
    }

    // Check password match
    if (password !== passwordConfirm) {
      return res.status(400).json({ message: "Passwords do not match" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create new user
    const newUser = await User.create({
      firstName,
      lastName,
      username,
      email,
      age,
      gender,
      role,
      phoneNumber,
      password: hashedPassword,
      passwordConfirm: hashedPassword,
      passwordChangedAt: Date.now(),
    });

    // Optionally: send JWT token immediately
    createSendToken(newUser, 201, "Signup successful", res);

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error, try again later" });
  }
};

exports.login = async(req,res) => {
    try{
        const {email,password} = req.body;

        const targetUser = await User.findOne({email});
         if (!targetUser || !(await bcrypt.compare(password, targetUser.password))) {
        return res.status(401).json({ message: "Invalid email or password" });
         }
        createSendToken(targetUser,200,"You are logged in successfully", res);

    }catch(err){
        console.log(err);
        res.status(500).json({ message: "Server error, please try again" });
    }
};

exports.protect = async(req, res, next) => {
    try{
        let token; //extracting token
        const authHeader = req.headers.authorization;
        if(authHeader?.startsWith("Bearer")){
            token = authHeader.split(" ")[1];
        };
        if(!token){
            return res.status(401).json({message: "Not authenticated"});
        }

        const decoded = await jwt.verify(token, process.env.JWT_SECRET); //verifing token

        const currentUser = await User.findById(decoded.id);
        if(!currentUser){
            return res.status(401).json({message: "User no longer exists"})
        }


        //verifying if password not changed after token issued
        if (currentUser.passwordChangedAt) {
        const changedTimestamp = parseInt(currentUser.passwordChangedAt.getTime() / 1000, 10);

        if (decoded.iat < changedTimestamp) {
        return res.status(401).json({ message: "Password recently changed, please login again" });
        }
        };



        req.user = currentUser;
        next();

    }catch(err){

        if(err.name === "JsonWebTokenError"){
            return res.status(401).json({message: "Invalid Token"});

        };
        if(err.name === "TokenExpiredError"){
            return res.status(401).json({message: "Token Expired, you should login again"});

        }
        res.status(500).json({message: "Something went wrong, try again later"})
    }
}
