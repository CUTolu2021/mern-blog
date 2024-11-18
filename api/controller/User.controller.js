const Usermodel = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require('dotenv').config();
 
const salt = bcrypt.genSaltSync(10);

const registerUser = async (req, res) => {
    const { fullname, username, password } = req.body;
    try{
        const user = await Usermodel.create({ 
            fullname,
            username,
            password: bcrypt.hashSync(password,salt)
        });
        res.json(user);
    }catch(err){
        res.status(400).json({ error: err.message });
    }
};

const loginUser = async (req, res) => {
    const { username, password } = req.body;
    try{
        const user = await Usermodel.findOne({ username });
        if(!user){
            return res.status(400).json({ error: "User not found" });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.status(400).json({ error: "Invalid credentials" });
        }
        jwt.sign({ username, id: user._id }, process.env.JWT_SECRET, (err, token) => {
            if(err) throw err;
            res.cookie("token", token).json({ username, id: user._id });
        });
    
    }catch(err){
        res.status(400).json({ error: err.message });
    }
};

const logoutUser = async(req,res) => {
    res.clearCookie("token");
    res.json({ message: "Logged out successfully" });
}





module.exports = {
    registerUser,
    loginUser,
    logoutUser 
}