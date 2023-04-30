'use client'
import Head from "next/head";
import { useState } from "react";
import { useSelector } from "react-redux";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';


export default function EditTripPage() {

    const tripData = useSelector((state) => state.agentTrip.agentTrip)

    const [formData, setFormData] = useState({
        name: tripData.name,
        description: tripData.description,
        duration: tripData.duration,
        images: tripData.images,
        tripCategory: tripData.tripCategory,
        tripType: tripData.tripType,
        cost: tripData.cost,
        availableSeats: tripData.availableSeats,
        startingLocation: tripData.startingLocation,
        destination: tripData.destination,
        itinerary: tripData.itinerary,
    });

    const [imageNum, setImageNum] = useState(0)

    const [formErrors, setFormErrors] = useState({
    });

    const [isFormValid, setIsFormValid] = useState(null);

    const handleChange = (event) => {
        const { name, value, files } = event.target
        setFormData((prev) => ({
            ...prev,
            [name]: name === "images" ? files[imageNum] : value
        }))

        if (name === 'images') {
            setImageNum(imageNum + 1)
        }
    }

    const validateForm = () => {
        const { name, description, duration, tripCategory, tripType, cost, availableSeats, startingLocation, destination, itinerary } = formData;
        const errors = {};
        let isValid = true;

        // Validate name
        if (!name) {
            errors.name = "Name is required";
            isValid = false;
        }

        // Validate description
        if (!description) {
            errors.description = "Description is required";
            isValid = false;
        }

        // Check if duration is a positive integer
        if (!/^\d+$/.test(duration) || Number(duration) <= 0) {
            errors.duration = "Duration must be a positive integer";
            isValid = false;
        }
        // console.log(tripCategory)
        // // Check if tripCategory is one of "educational", "entertainment", or "recreational"
        // if (!["Educational", "Entertainment", "Recreational"].includes(tripCategory)) {
        //     errors.tripCategory = "Trip category must be one of 'educational', 'entertainment', or 'recreational'";
        //     isValid = false;
        // }
        // console.log(tripType)
        // // Check if tripType is one of "local" or "international"
        // if (!["Local", "International"].includes(tripType)) {
        //     errors.tripType = "Trip type must be one of 'local' or 'international'";
        //     isValid = false;
        // }

        // Check if cost is a positive number
        if (!/^\d+(\.\d{1,2})?$/.test(cost) || Number(cost) <= 0) {
            errors.cost = "Cost must be a positive number";
            isValid = false;
        }

        // Check if availableSeats is a positive integer
        if (!/^\d+$/.test(availableSeats) || Number(availableSeats) <= 0) {
            errors.availableSeats = "Available seats must be a positive integer";
            isValid = false;
        }

        // Check if startingLocation is not empty
        if (startingLocation.trim() === "") {
            errors.startingLocation = "Starting location cannot be empty";
            isValid = false;
        }

        // Check if destination is not empty
        if (destination.trim() === "") {
            errors.destination = "Destination cannot be empty";
            isValid = false;
        }

        // Check if itinerary is not empty
        if (itinerary.trim() === "") {
            errors.itinerary = "Itinerary cannot be empty";
            isValid = false;
        }

        setFormErrors(errors);
        setIsFormValid(isValid);
    };

    const handleSubmit = async (event) => {
        console.log("submit clicked on edit trip form")
        
        validateForm()
        console.log(isFormValid)
        console.log("form errors below")
        console.log(formErrors)
        event.preventDefault();

        if (isFormValid) {
            console.log("form is valid condition true")
            
            console.log(formData)

            
            const accessToken = localStorage.getItem('accessToken')

            const headers = {
                Authorization: `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
            }

            const requestOptions = {
                method: 'PUT',
                headers,
                body: JSON.stringify(formData),
            }


            // make the API request
            const response = await fetch(`http://localhost:5000/api/trips/${tripData._id}`, requestOptions)
                
            if (response.ok) {
                
                console.log(response.json)

                toast.success('Trip edited successfully!', {
                    position: "bottom-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    });

                // redirect the user to the dashboard or homepage
                window.location.href = '/myAgentTrips';
            } else {
                // handle the error
                console.error('API request failed');

                const errorData = await response.json();
                setFormErrors(errorData);

                toast.error('unable to create new trip!', {
                    position: "bottom-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });

                window.location.href = '/myAgentTrips';
            }
        } else {
            toast.error('invalid form data, Please try again', {
                position: "bottom-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        }


    }

    return (

        <div>
            <Head>
                <title>Create trip</title>
            </Head>
            <form onSubmit={handleSubmit}>
                
                <div className="grid md:grid-cols-2 md:gap-6">


                    <div className="relative z-0 w-full mb-6 group">
                        <input type="text" name="name" id="name" value={formData.name} onChange={handleChange} className={`block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer ${formErrors.name ? 'border-red-500' : ''}`} placeholder=" " required />
                        <label htmlFor="name" className="peer-focus:font-small absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Name</label>
                        <span className={` ${formErrors.name ? 'text-sm text-red-500' : 'hidden'}`}>{formErrors.name}</span>
                    </div>

                    <div className="relative z-0 w-full mb-6 group">
                        <input type="text" name="itinerary" id="itinerary" value={formData.itinerary} onChange={handleChange} className={`block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer ${formErrors.itinerary ? 'border-red-500' : ''}`} placeholder=" " required />
                        <label htmlFor="itinerary" className="peer-focus:font-small absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Itinerary</label>
                        <span className={` ${formErrors.itinerary ? 'text-sm text-red-500' : 'hidden'}`}>{formErrors.itinerary}</span>
                    </div>
                </div>

                <div className="grid md:grid-cols-2 md:gap-6">
                    <div className="relative z-0 w-full mb-6 group">
                        <input type="number" pattern="[0-99]{1}" name="duration" id="duration" value={formData.duration} onChange={handleChange} className={`block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer ${formErrors.duration ? 'border-red-500' : ''}`} placeholder=" " required />
                        <label htmlFor="duration" className="peer-focus:font-small absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Duration (in days)</label>
                        <span className={` ${formErrors.duration ? 'text-sm text-red-500' : 'hidden'}`}>{formErrors.duration}</span>
                    </div>
                    <div className="relative z-0 w-full mb-6 group">
                        <input type="text" name="description" id="description" value={formData.description} onChange={handleChange} className={`block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer ${formErrors.description ? 'border-red-500' : ''}`} placeholder=" " required />
                        <label htmlFor="description" className="peer-focus:font-small absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Description</label>
                        <span className={` ${formErrors.description ? 'text-sm text-red-500' : 'hidden'}`}>{formErrors.description}</span>
                    </div>
                </div>

                <div className="grid md:grid-cols-2 md:gap-6">
                    <div className="relative z-0 w-full mb-6 group">

                        <label htmlFor="tripCategory" className="block mb-2 text-sm font-small text-gray-900 dark:text-white">Select trip category</label>
                        <select id="tripCategory" onChange={(e) => setFormData({ ...formData, tripCategory: e.target.value })} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                            <option>educational</option>
                            <option>recreational</option>
                            <option>entertainment</option>
                        </select>
                        <span className={` ${formErrors.tripCategory ? 'text-sm text-red-500' : 'hidden'}`}>{formErrors.tripCategory}</span>
                    </div>

                    <div className="relative z-0 w-full mb-6 group">

                        <label htmlFor="tripType" className="block mb-2 text-sm font-small text-gray-900 dark:text-white">Select trip type</label>
                        <select id="tripType" onChange={(e) => setFormData({ ...formData, tripType: e.target.value })} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                            <option>local</option>
                            <option>international</option>
                            
                        </select>
                        <span className={` ${formErrors.tripType ? 'text-sm text-red-500' : 'hidden'}`}>{formErrors.tripType}</span>
                    </div>
                </div>

                <div className="grid md:grid-cols-2 md:gap-6">
                    <div className="relative z-0 w-full mb-6 group">
                       <input type="number" name="cost" id="cost" value={formData.cost} onChange={handleChange} className={`block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer ${formErrors.cost ? 'border-red-500' : ''}`} placeholder="" required />
                        <label htmlFor="cost" className="peer-focus:font-small absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Cost</label>
                        <span className={` ${formErrors.cost ? 'text-sm text-red-500' : 'hidden'}`}>{formErrors.cost}</span>
                    </div>

                    <div className="relative z-0 w-full mb-6 group">
                       <input type="number" pattern="[0-99]{1}" name="availableSeats" id="availableSeats" value={formData.availableSeats} onChange={handleChange} className={`block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer ${formErrors.availableSeats ? 'border-red-500' : ''}`} placeholder=" " required />
                        <label htmlFor="duration" className="peer-focus:font-small absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Available seats</label>
                        <span className={` ${formErrors.availableSeats ? 'text-sm text-red-500' : 'hidden'}`}>{formErrors.availableSeats}</span>
                    </div>
                </div>

                <div className="grid md:grid-cols-2 md:gap-6">
                    <div className="relative z-0 w-full mb-6 group">
                        <input type="text" name="startingLocation" id="startingLocation" value={formData.startingLocation} onChange={handleChange} className={`block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer ${formErrors.startingLocation ? 'border-red-500' : ''}`} placeholder=" " required />
                        <label htmlFor="startingLocation" className="peer-focus:font-small absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Starting Location</label>
                        <span className={` ${formErrors.startingLocation ? 'text-sm text-red-500' : 'hidden'}`}>{formErrors.startingLocation}</span>
                    </div>

                    <div className="relative z-0 w-full mb-6 group">
                        <input type="text" name="destination" id="destination" value={formData.destination} onChange={handleChange} className={`block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer ${formErrors.destination ? 'border-red-500' : ''}`} placeholder=" " required />
                        <label htmlFor="destination" className="peer-focus:font-small absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Destination</label>
                        <span className={` ${formErrors.destination ? 'text-sm text-red-500' : 'hidden'}`}>{formErrors.destination}</span>
                    </div>
                </div>

                <div className="flex items-center justify-center w-full">
                    <label htmlFor="images" className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                            <svg aria-hidden="true" className="w-10 h-10 mb-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path></svg>
                            <div className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</div>
                            <div className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</div>
                        </div>
                        <input id="images" type="file" className="hidden" />
                    </label>
                </div>

                <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-small rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Edit details</button>


            </form>
            <div><ToastContainer position="bottom-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light" /></div>
        </div>
    )


    


}