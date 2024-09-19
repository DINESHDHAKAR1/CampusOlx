const Product = require("../schema/productSchema")
const jwt = require("jsonwebtoken")
const nodemailer = require("nodemailer")
const User = require("../schema/userSchema")
const fs = require("fs")

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.GMAIL_ID, // Your email address
      pass: process.env.GMAIL_PASSWORD // Your email password
    }
});

exports.storeData = async (req, res) => {
    const {name, price, seller} = req.body
    const image = req.file.filename
    const sellerEmail = jwt.decode(seller).email;
    const sellerCheck = User.findOne({email: sellerEmail})
    if (!sellerCheck) {
        return res.status(401).json({message: "Unauthorized access requested..."})
    }
    const newProductData = {
        name, 
        price,
        image,
        sellerEmail
    }
    const productData = new Product(newProductData)
    await productData.save()
    .then(() => res.json({message: "Product is added..."}).status(200))
    .catch(err => res.json({message: "Error occured...", error: err}).status(400))
}

exports.getData = async (req, res) => {
    Product.find()
        .then(products => {
            res.json({productData: products})
        }).catch(err => res.json({message: "Error: " + err}).status(400))
}

exports.getDataByUser = async (req, res) => {
    const token = req.query.token
    const sellerEmail = jwt.decode(token).email
    Product.find({sellerEmail: sellerEmail})
        .then(products => {
            res.json({productData: products})
        }).catch(err => res.json({message: "Error: " + err}).status(400))
}

exports.offerToProduct = async (req, res) => {
    try {
        const {token, productId, message, contactNum} = req.query
        const buyerDetails = jwt.decode(token, process.env.JWT)
        const buyerCheck = User.findOne({email: buyerDetails.email})
        if (!buyerCheck) {
            return res.status(404).json({message: "User not found..."})

        }
        const productDetails = await Product.findOne({_id: productId})
        if (!productDetails) {
            return res.status(404).json({message: "Product not found..."})
        }
        productDetails.offers.push({
            buyerEmail: buyerDetails.email,
            message: message,
            contactNum: contactNum
        })
        await productDetails.save()
        res.json({message: "Product updated..."}).status(200)
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Error occured..." + error})
    }
}

exports.removeProduct = async (req, res) => {
    const { token, contactNumSeller, buyerEmail, productId} = req.body
    if (!token || !contactNumSeller || !productId || !buyerEmail) return res.json(400).json({message: "Details incomplete..."})
    const sellerDetails = jwt.decode(token, process.env.JWT)
    const sellerEmail = sellerDetails.email
    try {
        const mailOptions = {
          from: sellerEmail, 
          to: buyerEmail, 
          subject: "Response to the offer on CampusOlx", 
          text: "This email is to confirm the sale of the product to you for payment and other details you can call at +" + contactNumSeller, 
        };
        await transporter.sendMail(mailOptions);
        const productDetails = await Product.findOne({_id: productId})
        fs.unlink("../server/images/" + productDetails.image, (err) => {
            if (err) {
              console.error('Error deleting file:', err);
              return;
            }
            console.log('File deleted successfully');
          });
        await Product.findOneAndDelete({_id: productId})
        res.status(200).json({message: "Product sold and deleted from database..."})
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({message: "Mail not sent..."})
    }
}