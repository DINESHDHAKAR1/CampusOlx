import React, { useEffect, useState } from "react";
import { Navbar } from "../Components/Navbar"
import { useNavigate } from "react-router-dom";
import { ProductCard } from "../Components/ProductCard"
import noProducts from "../Assets/product-not-found.jpg"
import { useToasts } from "react-toast-notifications";

const Offers = ({ userStatus, setUserStatus, setProducts, allProducts }) => {
    const {addToast} = useToasts()
    const navigate = useNavigate();
    const [productData, setProductData] = useState([]);
    useEffect(() => {
        if (localStorage.getItem("token") === null) navigate("/");
        fetchOffers()
    }, [])

    const fetchOffers = async () => {
        await fetch(`http://localhost:5000/products/get-products-by-seller?token=${localStorage.getItem("token")}`, {
            method: "GET",
            mode: "cors",
        }).then(res => res.json())
        .then(res => {
            setProductData(res.productData)
        })
    }

    const handleSold = async (productId, buyerEmail, contactNumSeller) => {
        if (!localStorage.getItem("token")) {
            showToast("Unauthorized access", "error")
            navigate("/")
        }
        await fetch("http://localhost:5000/products/sell-product", {
            mode: "cors",
            body: JSON.stringify({
                token: localStorage.getItem("token"),
                buyerEmail: buyerEmail,
                productId: productId,
                contactNumSeller: contactNumSeller
            }),
            headers: {
                "Content-Type": "application/json"
            },
            method: "POST"
        }).then(res => res.json())
        .then(res => {
            if (res.message === "Product sold and deleted from database...") {
                fetchOffers()
                showToast("Product sold... Email is sent to the buyer at " + buyerEmail, "success")
            } else {
                showToast("Error occured", "error")
            }
        })
    }

    const showToast = (message, appearance) => {
        addToast(message, {
            appearance: appearance,
            autoDimiss: true,
            autoDimissTimeout: 3000
        })
    }

    return(
        <div>
             <Navbar userStatus={userStatus} setUserStatus={setUserStatus} setProducts={setProducts} allProducts={allProducts} />
            <div className="flex flex-col items-center my-10">
                <div className="flex md:w-4/5 w-full flex-col items-center my-10">
                    {productData.length !== 0 && productData.map(item => {
                        return (
                            <div className="grid md:grid-cols-3 gap-5 my-5">
                                <div className="flex flex-col items-center">
                                    <ProductCard product={item} />
                                </div>
                                <div className="col-span-2">
                                    <table className="table-auto w-full">
                                        <thead>
                                        <tr>
                                            <th className="px-4 py-2">Buyer Email</th>
                                            <th className="px-4 w-1/2 py-2">Message</th>
                                            <th className="px-4 py-2">Contact Number</th>
                                            <th className="px-4 py-2">Sold</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {item.offers && item.offers.map(offer => {
                                            return (
                                                <tr>
                                                    <td className="border px-4 py-2">{offer.buyerEmail}</td>
                                                    <td className="border px-4 py-2">{offer.message}</td>
                                                    <td className="border px-4 py-2">{offer.contactNum}</td>
                                                    <td className="border px-4 py-2">
                                                        <button onClick={() => handleSold(item._id, offer.buyerEmail, offer.contactNum)} className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded">Sold</button>
                                                    </td>
                                                </tr>
                                            )
                                        })}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        )
                    })}
                    {productData.length === 0 && 
                        <img src={noProducts} alt="no products found" />
                    }
                </div>
            </div>
        </div>
    )
}

export { Offers }