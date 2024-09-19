const express = require("express")
const { body } = require("express-validator")
const { signup, login } = require("../controllers/authController")

const router = express.Router()

router
    .route("/signup")
    .post(
        [
            body("username").exists().withMessage("Enter a valid Name"),
            body("email").isEmail().withMessage("Enter a valid email"),
            body("password")
                .exists()
                .isLength({ min: 8 })
                .withMessage("Enter a password with atleast 8 characters"),
        ],
        signup
    )

router
    .route("/login")
    .post(
        [
            body("email").isEmail().withMessage("Enter a valid email"),
            body("password")
                .exists()
                .isLength({ min: 8 })
                .withMessage("Enter a password with atleast 8 characters"),
        ],
        login
    )

module.exports = router