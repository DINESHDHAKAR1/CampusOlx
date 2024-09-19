const User = require("../schema/userSchema");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const appError = require("../utlis/appError");
const bcrypt = require("bcryptjs");
const dotenv = require("dotenv");
dotenv.config({ path: "../.env" });
const jwtkey = process.env.JWT

exports.signup = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({message: "Invalid data..."})
    }
    const {username, email, password} = req.body
    const userCheck = await User.find({ email })
    
    if (userCheck.length > 0) {
        return res.status(401).json({message: "User already exist..."})
    }
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)
    const userData = new User({
        username: username,
        email: email,
        password: hash
    })
    await userData.save();
    const token = jwt.sign({
        username: username,
        email: email
    }, jwtkey, {
        expiresIn: 24 * 60 * 60
    });
    res.cookie("token", token, {
        withCredentials: true,
        httpOnly: false,
        sameSite: 'None',
        secure: true,
    });
    res.setHeader('cookie', token);
    res.json({message: "User created...", token: token}).status(200);
}

exports.login = async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({message: "Invalid data..."})
    }
    const {email, password} = req.body;
    const userData = await User.find({ email })
    if (userData.length === 0) {
        return res.status(400).json({message: "User doesn't exist... Try signing in first..."})
    }
    bcrypt.compare(password, userData[0].password, (err, result) => {
        if (err) {
            console.error(err);
            return res.status(401).json({message: "Incorrect password..."})
        } else if (result) {
            const token = jwt.sign({
                username: userData.username,
                email: email
            }, jwtkey, {
                expiresIn: 24 * 60 * 60
            });
            res.cookie("token", token, {
                withCredentials: true,
                httpOnly: false,
                sameSite: 'None',
                secure: true,
            });
            res.setHeader('cookie', token);
            res.status(200).json({message: "User login successful..."});
        } else {
            res.status(401).json({message: "Incorrect Password..."});
        }
    });
}