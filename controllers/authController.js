const jwt = require("jsonwebtoken");
const bcrypt = require('bcryptjs'); 
const User = require("../models/userSchema");

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
