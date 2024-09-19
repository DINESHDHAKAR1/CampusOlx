import React from "react"

const BuyModal = ({ setToggle, offer, setOffer, setUserVerification }) => {
    
    const closeModal = () => {
        setToggle(false)
    }
    const handleChange = (e) => {
        const {name, value} = e.target
        if (name === "contactNum" && value !== "" && isNaN(value)) {
            return
        }
        setOffer({
            ...offer,
            [name]: value !== "" ? value : null
        })
    }
    const handleSubmit = () => {
        if (offer.message === null || offer.contactNum === "+91" || offer.contactNum.length !== 13) {
            alert("Enter the details properly...")
            return
        }
        closeModal()
        setUserVerification(true)
    }
    return (
        <div className="flex ">
            <div id="authentication-modal" tabIndex="-1" aria-hidden="true" className="flex justify-center items-center fixed top-0 right-0 bottom-0 left-0 z-50 bg-black bg-opacity-50">
                <div className="relative p-4 w-full max-w-md max-h-full">
                    <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                        <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                                Fill the details to propose an offer to the seller
                            </h3>
                            <button type="button" onClick={closeModal} className="end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="authentication-modal">
                                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                                </svg>
                                <span className="sr-only">Close modal</span>
                            </button>
                        </div>
                        <div className="p-4 md:p-5">
                                <div>
                                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Message:</label>
                                    <textarea type="text" name="message" value={offer.message} onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="name@company.com" required />
                                </div>
                                <div>
                                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Contact Number</label>
                                    <input type="text" name="contactNum" value={offer.contactNum} onChange={handleChange} placeholder="Enter a valid phone number" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required />
                                </div>
                        </div>
                        <button type="button" onClick={handleSubmit} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 mx-5 mb-5">Submit</button>
                    </div>
                </div>
            </div> 
        </div>
    )
}

export { BuyModal }
