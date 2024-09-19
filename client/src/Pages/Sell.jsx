import React, { useState } from "react";
import { Navbar } from "../Components/Navbar";
import { useNavigate } from "react-router-dom";
import { useToasts } from "react-toast-notifications";

const Sell = ({userStatus, setUserStatus, allProducts, setProducts}) => {
    const {addToast} = useToasts()
    const navigate = useNavigate()
    const [product, setProduct] = useState({
        name: null,
        image: null,
        price: 0
    })
    const [imagePreview, setImagePreview] = useState(null)
    const handleChange = (e) => {
        const {name, value} = e.target
        if (name === "price" && value !== "" && isNaN(value)) {
            return
        }
        setProduct({
            ...product,
            [name]: value !== "" ? value : null
        })
    }
    const handleImage = (e) => {
        const {name, files} = e.target
        if (files[0]) {
            const reader = new FileReader();
      
            reader.onloadend = () => {
              setImagePreview(reader.result);
            };
      
            reader.readAsDataURL(files[0]);
        }
        setProduct({
            ...product,
            [name]: files[0] ? files[0] : null
        })
    }
    const handleSubmit = async () => {
        if (!product.name || !product.image || !product.price) {
            alert("Enter all the details... ")
            return
        }
        if (localStorage.getItem('token') === null) {
            navigate('/')
        }
        const seller = localStorage.getItem("token")
        const formData = new FormData()
        formData.append('name', product.name)
        formData.append('price', product.price)
        formData.append('file', product.image)
        formData.append('seller', seller)
        formData.append('offers', []);
        await fetch("http://localhost:5000/products/add-product", {
            method: "POST",
            body: formData,
            mode: "cors"
        }).then(res => res.json())
        .then(res => {
            if (res.message === "Unauthorized access requested...") {
                showToast("You don't have an access to this feature", "error")
                navigate("/signup")
            } else {
                showToast("Product is on sale now", "success")
                navigate('/');
            }
        })
    }

    const showToast = (message, appearance) => {
        addToast(message, {
            appearance: appearance,
            autoDismiss: true, 
            autoDismissTimeout: 3000 
        });
    };

    return (
        <div>
            <Navbar key="navbar" userStatus={userStatus} setUserStatus={setUserStatus} allProducts={allProducts} setProducts={setProducts} />
            <div className="flex flex-col items-center my-10">
                <p className="text-3xl p-5">Fill the Details of the Product</p>
                <div className="w-2/3 grid md:grid-cols-2 gap-5">
                    <div className="mb-5">
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name of the Product</label>
                        <input type="text" onChange={handleChange} name="name" value={product.name} id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="electric kettle" required />
                    </div>  
                    <div className="mb-5">
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Proposed price</label>
                        <input type="text" onChange={handleChange} name="price" value={product.price} id="price" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="in rupees" required />
                    </div>
                </div>
                <div className="flex items-center justify-center w-2/3 mb-5">
                    <label for="dropzone-file" className="flex flex-col items-center justify-center w-full h-2/3 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                        {imagePreview === null &&
                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                                </svg>
                                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                                <p className="text-xs text-gray-500 dark:text-gray-400">Upload files in PNG, JPG and JPEG format only</p>
                            </div>
                        }
                        <input id="dropzone-file" accept=".jpg, .jpeg, .png" onChange={handleImage} type="file" name="image" class="hidden" />
                        {imagePreview !== null && (
                            <img
                                src={imagePreview}
                                alt="Preview"
                                className="w-1/2 h-full mt-10"
                            />
                        )}
                    </label>
                </div>
                <button type="button" onClick={handleSubmit} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Submit Details</button> 
            </div>
        </div>
    )
}

export { Sell };