import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { BuyModal } from "./BuyModal"
import { OtpModal } from "./OtpModal"
import { useToasts } from "react-toast-notifications";
const imageNotAvailable = require("../Assets/imageNotAvailable.jpg")

const ProductCard = ({product}) => {
	const {addToast} = useToasts()
    const [imageExist, setImageExist] = useState(null)
    const [image, setImage] = useState(null)
    const [toggle, setToggle] = useState(false)
    const [offer, setOffer] = useState({
		message: null,
		contactNum: "+91"
    })
    const [userVerifiction, setUserVerification] = useState(false)
    useEffect(() => {
        const checkFileExists = async () => {
			try {
				const response = await fetch(`../../../server/images/${product.image}`);
				if (response.ok) {
				setImageExist(true);
				setImage(require(`../../../server/images/${product.image}`))
				} else {
				setImageExist(false);
				}
			} catch (error) {
				setImageExist(false);
			}
        };
    
        checkFileExists();
      }, [product.image]);
    const handleBuy = () => {
			if (localStorage.getItem("token")) {
				setToggle(true)
			} else {
				showToast("You are not authorized... Please create an account...", "error")
			}
    }

	const showToast = (message, appearance) => {
		addToast(message, {
			appearance: appearance,
			autoDismiss: true,
			autoDismissTimeout: 3000
		})
	}

    return (
        <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            {/* Enter the url for the detailed product detail page */}
            <Link to="/">
                <img className="p-8 rounded-t-lg" src={imageExist ? image : imageNotAvailable} alt="product" />
            </Link>
            <div className="px-5 pb-5">
                <Link to="/">
                    <h5 className="text-3xl font-semibold tracking-tight text-gray-900 dark:text-white my-1">{product.name}</h5>
                </Link>
                <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-gray-900 dark:text-white">Rs.{product.price}</span>
                    <Link to="/" onClick={handleBuy} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-2.5 md:px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Buy</Link>
                </div>
                {toggle && <BuyModal toggle={toggle} setToggle={setToggle} product={product} offer={offer} setOffer={setOffer} setUserVerification={setUserVerification} showToast={showToast} />}
                {userVerifiction && <OtpModal setUserVerification={setUserVerification} product={product} offer={offer} showToast={showToast} />}
            </div>
        </div>
    )
}

export { ProductCard }