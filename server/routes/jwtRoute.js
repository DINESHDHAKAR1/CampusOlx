const express = require("express")
const { body } = require("express-validator")
const { jwtValidation } = require("../controllers/jwtController")

const router = express.Router();

router
    .route('/verifyuser')
    .post(
        [
            body("token").exists().withMessage("Enter a valid request"),
        ],
        jwtValidation
    )

module.exports = router