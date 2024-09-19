const express = require('express')
const dotenv = require("dotenv")
dotenv.config({path: "./.env"})
const bodyParser = require("body-parser")
const cors = require("cors");
const cookieParser = require("cookie-parser")
// routes
const userRoute = require("./routes/authRoute")
const jwtRoute = require("./routes/jwtRoute")
const productRoute = require("./routes/productRoute")

const app = express()
app.use(cors({
    origin: 'http://localhost:3000',
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
}));
app.use(cookieParser())
app.use(express.static("public"))
app.use(bodyParser.json({limit: '10mb'}))
app.use(bodyParser.urlencoded({limit: '10mb',  extended: true }))
app.use(express.json())

app.use("/auth", userRoute)
app.use("/auth", jwtRoute)
app.use("/products", productRoute)


module.exports = app
