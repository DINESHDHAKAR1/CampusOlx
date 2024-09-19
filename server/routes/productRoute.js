const express = require("express")
const { body } = require("express-validator")
const { storeData, getData, getDataByUser, offerToProduct, removeProduct } = require("../controllers/productController")
const multer = require("multer")
const path = require("path")

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'images')
    },
    filename: function(req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname))
    }
})

const upload = multer({ storage })
const router = express.Router()

router
    .route('/add-product')
    .post(
        [
            body("name").exists().withMessage("Enter a valid Name"),
            body("price").exists().withMessage("Enter a price"),
        ],
        upload.single('file'),
        storeData
    )

router
    .route('/get-products')
    .get(getData)

router
    .route('/get-products-by-seller')
    .get(getDataByUser)

router
    .route('/update-offer')
    .get(offerToProduct)

router
    .route("/sell-product")
    .post(removeProduct)

module.exports = router