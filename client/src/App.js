import React, { useState, useEffect } from 'react'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './App.css';
import { Signup } from './Pages/Signup';
import { Login } from './Pages/Login';
import { Home } from './Pages/Home';
import { Sell } from './Pages/Sell';
import { Offers } from './Pages/Offers';

function App() {
	const [userStatus, setUserStatus] = useState(false);
	const [products, setProducts] = useState([])
	const [allProducts, setAllProducts] = useState([])
	useEffect(() => {
			const token = localStorage.getItem("token")
			if (token) setUserStatus(true)
		}, [])
	const router = createBrowserRouter([
		{
		path: "/",
		element: <Home key="home" userStatus={userStatus} setUserStatus={setUserStatus} allProducts={allProducts} setAllProducts={setAllProducts} products={products} setProducts={setProducts} />
		},
		{
		path: "/login",
		element: <Login key="login" userStatus={userStatus} setUserStatus={setUserStatus} />
		},
		{
		path: "/signup",
		element: <Signup key="signup" userStatus={userStatus} setUserStatus={setUserStatus} />
		},
		{
		path: "/sellproduct",
		element: <Sell key="sell" userStatus={userStatus} setUserStatus={setUserStatus} allProducts={allProducts} setProducts={setProducts} />
		},
		{
		path: "/offers",
		element: <Offers key="offers" userStatus={userStatus} setUserStatus={setUserStatus} allProducts={allProducts} setProducts={setProducts} />
		}
	])
	return (
		<RouterProvider router={router} />
	);
}

export default App;
