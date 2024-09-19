const jwt = require("jsonwebtoken");
const appError = require("../utlis/appError");
const dotenv = require("dotenv");
dotenv.config({ path: "../.env" });
const jwtkey = process.env.JWT

exports.jwtValidation = (req, res, next) => {
    const storedJWT = req.body.token;
    try {
        const decoded = jwt.verify(storedJWT, jwtkey);   
        if (decoded.exp < Date.now() / 1000) {
            res.json({message: "Verified user..."}).status(200)
        } else {
            res.json({message: "Token expired..."}).status(200)
        }
    } catch (err) {
        res.json({message: "Unauthorized access..."}).status(401)
    }
    next()
}
