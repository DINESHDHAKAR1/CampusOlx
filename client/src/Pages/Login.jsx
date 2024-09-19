import React, { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useToasts } from "react-toast-notifications";

const Login = ({ userStatus, setUserStatus }) => {
    const { addToast } = useToasts()
    const navigate = useNavigate()
    const [user, setUser] = useState({
        email: null,
        password: null
    })
    const handleChange = (e) => {
        const {name, value} = e.target
        setUser({
            ...user,
            [name]: value === "" ? null : value
        })
    }
    const handleSubmit = async () => {
        if (!user.email || !user.password) return
        await fetch("http://localhost:5000/auth/login", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            credentials: "include",
            withCredntials: true,
            body: JSON.stringify(user),
            mode: "cors"
        }).then(res => res.json())
        .then(res => {
            if (res.message === "User login successful...") {
                const tokenCookie = document.cookie.split(';').find(cookie => cookie.trim().startsWith('token='))
                if (tokenCookie) {
                    const token = tokenCookie.split('=')[1].trim()
                    localStorage.setItem("token", token)
                    showToast("User logged in", "success")
                    setUserStatus(true)
                    navigate("/")
                } else {
                    showToast("Token not generated", "error")
                }
            } else if (res.message === "User doesn't exist... Try signing in first...") {
                showToast("User does not exist, please signup", "warning")
                navigate("/signup")
            } else {
                showToast("Error occured, validation failed", "error")
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
        <section className="bg-gray-50 dark:bg-gray-900">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <a href="/" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
                    Campus OLX
                </a>
                <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                            Sign in to your account
                        </h1>
                        <form className="space-y-4 md:space-y-6" action="#">
                            <div>
                                <label for="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                                <input type="email" onChange={handleChange} name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required="" />
                            </div>
                            <div>
                                <label for="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                                <input type="password" onChange={handleChange} name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" />
                            </div>
                            <button type="button" onClick={handleSubmit} className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Sign in</button>
                            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                Don’t have an account yet? <Link to="/signup" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Sign up</Link>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}

export { Login }