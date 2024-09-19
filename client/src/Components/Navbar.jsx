import React, { useEffect, useState } from "react"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faBars} from "@fortawesome/free-solid-svg-icons"
import { useNavigate } from "react-router-dom"
import { useToasts } from "react-toast-notifications"

const Navbar = ({userStatus, setUserStatus, setProducts, allProducts}) => {
    const {addToast} = useToasts()
    const navigate = useNavigate()
    const [screenSize, setScreenSize] = useState(true)
    const [toggle, setToggle] = useState(false)
    const [search, setSearch] = useState("")
    const updateScreen = () => {
        if (window.innerWidth < 1024) setScreenSize(true)
        else {
            setScreenSize(false)
            setToggle(false)
        }
    }
    useEffect(() => {
        updateScreen(window.innerWidth);
        window.addEventListener("resize", updateScreen);
        return () => {
            window.removeEventListener('resize', updateScreen);
        }
    }, [])
    useEffect(() => {
        if (search === "") setProducts(allProducts)
        else {
            const arr = allProducts.filter(product => product.name.toLowerCase().includes(search.toLowerCase()))
            setProducts(arr)
        }
    }, [search])
    const handleLogout = () => {
        localStorage.removeItem("token")
        addToast("User logged out", {
            appearance: "success",
            autoDismiss: true, 
            autoDismissTimeout: 3000 
        });
        setUserStatus(false)
    }
    const handleSearch = (e) => {
        const {value} = e.target
        setSearch(value)
    }
    return (
        <nav className="grid grid-cols-3 bg-white py-3 px-5 md:px-20">
            {/* first div for the company title and logo */}
            <div className="bg-white w-full text-2xl col-span-2 lg:col-span-1 ">
                {/* this image later on will be replaced by the logo for the Campus Olx */}
                <p className="inline-block ml-1.5">CampusOLX</p>
            </div>
            {
                !screenSize && 
                <div className="invisible lg:visible col-span-1 lg:col-span-2 grid grid-cols-2">
                    <div className="w-full">
                        <form>   
                            <div className="relative">
                                <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                                    <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                                    </svg>
                                </div>
                                <input type="search" onChange={handleSearch} id="default-search" className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500" placeholder="Search for items..." required />
                            </div>
                        </form>
                    </div> 
                    <div className="w-full flex justify-end py-2">
                        {
                            userStatus ? 
                            (
                                <div>
                                    <button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 mx-1" onClick={() => navigate("/offers")}>Offers</button>
                                    <button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 mx-1" onClick={handleLogout}>Logout</button>
                                    <button type="button" disabled={localStorage.getItem('token') ? false : true} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 mx-1" onClick={() => navigate("/sellproduct")}>Sell</button>
                                </div>
                            ) : 
                            (
                                <div>
                                    <button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 mx-1" onClick={() => navigate("/login")}>Login</button>
                                    <button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 mx-1" onClick={() => navigate("/signup")}>SignUp</button>
                                    <button type="button" disabled={localStorage.getItem('token') ? false : true} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 mx-1" onClick={() => navigate("/sellproduct")}>Sell</button>
                                </div>
                            )
                        }
                    </div>
                </div>
            }
            {
                screenSize && 
                <div className="flex justify-end">
                     <button onClick={() => setToggle(!toggle)}>
                        <FontAwesomeIcon icon={faBars} size="2xl" />
                    </button>
                </div>
            }
            <div className={`col-span-3 ${toggle ? "visible" : "hidden"}`}>
                <ul>
                    <li>
                        <div className="w-full m-auto">
                            <form>   
                                <div className="relative">
                                    <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                                        <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                                        </svg>
                                    </div>
                                    <input type="search" onChange={handleSearch} id="default-search" className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500" placeholder="Search for items..." required />
                                </div>
                            </form>
                        </div> 
                    </li>
                    {
                        userStatus ? 
                        (
                            <div>
                                <li>
                                    <div className="w-full flex justify-start py-2">    
                                        <button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 mx-1" onClick={() => navigate('/offers')} disabled={localStorage.getItem('token') ? false : true}>Offers</button>
                                    </div>
                                </li>
                                <li>
                                    <div className="w-full flex justify-start py-2">
                                        <button type="button" disabled={localStorage.getItem('token') ? false : true} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 mx-1" onClick={handleLogout}>Logout</button>
                                    </div>
                                </li>
                                <li>
                                    <div className="w-full flex justify-start py-2">
                                        <button type="button" disabled={localStorage.getItem('token') ? false : true} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 mx-1" onClick={() => navigate("/sellproduct")}>Sell</button>
                                    </div>
                                </li>
                            </div>
                        ) : 
                        (
                            <div>
                                <li>
                                    <div className="w-full flex justify-start py-2">
                                        <button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 mx-1" onClick={() => navigate("/login")}>Login</button>
                                    </div>
                                </li>
                                <li>
                                    <div className="w-full flex justify-start py-2">
                                        <button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 mx-1" onClick={() => navigate("/signup")}>Signup</button>
                                    </div>
                                </li>
                                <li>
                                    <div className="w-full flex justify-start py-2">
                                        <button type="button" disabled={localStorage.getItem('token') ? false : true} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 mx-1" onClick={() => navigate("/sellproduct")}>Sell</button>
                                    </div>
                                </li>
                            </div>
                        )
                    }
                </ul>
            </div>
        </nav>
    )
}

export { Navbar }