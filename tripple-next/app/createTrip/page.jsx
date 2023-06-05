'use client'
import Head from "next/head";
import { useState } from "react";
import { Typography } from "@material-tailwind/react";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';


export default function CreateTripPage() {

    const [formData, setFormData] = useState({
        name: "",
        description: "",
        duration: "",
        images: "",
        tripCategory: "educational",
        tripType: "local",
        cost: "",
        availableSeats: "",
        startingLocation: "",
        destination: "",
        itinerary: "",
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
        console.log(tripCategory)
        // Check if tripCategory is one of "educational", "entertainment", or "recreational"
        if (!["educational", "entertainment", "recreational"].includes(tripCategory)) {
            errors.tripCategory = "Trip category must be one of 'educational', 'entertainment', or 'recreational'";
            isValid = false;
        }
        console.log(tripType)
        // Check if tripType is one of "local" or "international"
        if (!["local", "international"].includes(tripType)) {
            errors.tripType = "Trip type must be one of 'local' or 'international'";
            isValid = false;
        }

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
        console.log("submit clicked on create trip form")

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
                method: 'POST',
                headers,
                body: JSON.stringify(formData),
            }


            // make the API request
            const response = await fetch('http://localhost:5000/api/trips', requestOptions)

            if (response.ok) {

                console.log(response.json)

                toast.success('Trip created successfully!', {
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
        <div className="container mx-auto">
            <div className="grid grid-cols-2 gap-0">
                <div className="col-span-1">
                    <Head>
                        <title>Create trip</title>
                    </Head>
                    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
                        <Typography align='center' variant='h3'>
                            Create Trip
                        </Typography>
                        <br></br>
                        <div className="grid md:grid-cols-2 md:gap-2 mb-2">
                            <div className="mb-4">
                                <label htmlFor="name" className="block text-gray-700 font-bold mb-2">Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    id="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className={`block w-full px-3 py-2 text-gray-700 border rounded ${formErrors.name ? 'border-red-500' : 'border-gray-400'}`}
                                    required
                                />
                                {formErrors.name && <span className="text-sm text-red-500">{formErrors.name}</span>}
                            </div>

                            <div className="mb-4">
                                <label htmlFor="itinerary" className="block text-gray-700 font-bold mb-2">Itinerary</label>
                                <input
                                    type="text"
                                    name="itinerary"
                                    id="itinerary"
                                    value={formData.itinerary}
                                    onChange={handleChange}
                                    className={`block w-full px-3 py-2 text-gray-700 border rounded ${formErrors.itinerary ? 'border-red-500' : 'border-gray-400'}`}
                                    required
                                />
                                {formErrors.itinerary && <span className="text-sm text-red-500">{formErrors.itinerary}</span>}
                            </div>
                            <div className="mb-4">
                                <label htmlFor="duration" className="block text-gray-700 font-bold mb-2">Duration</label>
                                <input
                                    type="number"
                                    pattern="[0-99]{1}"
                                    name="duration"
                                    id="duration"
                                    value={formData.duration}
                                    onChange={handleChange}
                                    className={`block w-full px-3 py-2 text-gray-700 border rounded ${formErrors.duration ? 'border-red-500' : 'border-gray-400'}`}
                                    required
                                />
                                {formErrors.duration && <span className="text-sm text-red-500">{formErrors.duration}</span>}
                            </div>
                            <div className="mb-4">
                                <label htmlFor="description" className="block text-gray-700 font-bold mb-2 ">Description</label>
                                <textarea
                                    name="description"
                                    id="description"
                                    value={formData.description}
                                    onChange={handleChange}
                                    className={`block w-full px-3 py-2 text-gray-700 border rounded ${formErrors.description ? 'border-red-500' : 'border-gray-400'}`}
                                    required
                                    style={{ height: '75px', resize: 'vertical' }}
                                />

                                {formErrors.description && <span className="text-sm text-red-500">{formErrors.description}</span>}
                            </div>

                            <div className="mb-4">
                                <label htmlFor="tripCategory" className="block text-gray-700 font-bold mb-2">Select trip category</label>
                                <select id="tripCategory" onChange={(e) => setFormData({ ...formData, tripCategory: e.target.value })} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                    <option>educational</option>
                                    <option>recreational</option>
                                    <option>entertainment</option>
                                </select>
                                {formErrors.tripCategory && <span className="text-sm text-red-500">{formErrors.tripCategory}</span>}
                            </div>

                            <div className="mb-4">

                                <label htmlFor="tripType" className="block text-gray-700 font-bold mb-2">Select trip type</label>
                                <select id="tripType" onChange={(e) => setFormData({ ...formData, tripType: e.target.value })} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                    <option>local</option>
                                    <option>international</option>

                                </select>
                                {formErrors.tripType && <span className="text-sm text-red-500">{formErrors.tripType}</span>}
                            </div>

                            <div className="mb-4">
                                <label htmlFor="cost" className="block text-gray-700 font-bold mb-2">Cost</label>
                                <input
                                    type="number"
                                    name="cost"
                                    id="cost"
                                    value={formData.cost}
                                    onChange={handleChange}
                                    className={`block w-full px-3 py-2 text-gray-700 border rounded ${formErrors.cost ? 'border-red-500' : 'border-gray-400'}`}
                                    required
                                />
                                {formErrors.cost && <span className="text-sm text-red-500">{formErrors.cost}</span>}
                            </div>
                            <div className="mb-4">
                                <label htmlFor="availableSeats" className="block text-gray-700 font-bold mb-2">Available Seats</label>
                                <input
                                    type="number"
                                    pattern="[0-99]{1}"
                                    name="availableSeats"
                                    id="availableSeats"
                                    value={formData.availableSeats}
                                    onChange={handleChange}
                                    className={`block w-full px-3 py-2 text-gray-700 border rounded ${formErrors.availableSeats ? 'border-red-500' : 'border-gray-400'}`}
                                    required
                                />
                                {formErrors.availableSeats && <span className="text-sm text-red-500">{formErrors.availableSeats}</span>}
                            </div>
                            <div className="mb-4">
                                <label htmlFor="startingLocation" className="block text-gray-700 font-bold mb-2">Starting Location</label>
                                <input
                                    type="text"
                                    name="startingLocation"
                                    id="startingLocation"
                                    value={formData.startingLocation}
                                    onChange={handleChange}
                                    className={`block w-full px-3 py-2 text-gray-700 border rounded ${formErrors.startingLocation ? 'border-red-500' : 'border-gray-400'}`}
                                    required
                                />
                                {formErrors.startingLocation && <span className="text-sm text-red-500">{formErrors.startingLocation}</span>}
                            </div>
                            <div className="mb-4">
                                <label htmlFor="destination" className="block text-gray-700 font-bold mb-2">Destination</label>
                                <input
                                    type="text"
                                    name="destination"
                                    id="destination"
                                    value={formData.destination}
                                    onChange={handleChange}
                                    className={`block w-full px-3 py-2 text-gray-700 border rounded ${formErrors.destination ? 'border-red-500' : 'border-gray-400'}`}
                                    required
                                />
                                {formErrors.destination && <span className="text-sm text-red-500">{formErrors.destination}</span>}
                            </div>
                        </div>
                        <div className="grid md:grid-cols-1 md:gap-2 mb-2">
                            <div className="flex items-center justify-center w-full">
                                <label for="logo" className="flex flex-col items-center justify-center w-full h-28 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                        <svg aria-hidden="true" className="w-10 h-10 mb-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path></svg>
                                        <div className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</div>
                                        <div className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</div>
                                    </div>
                                    <input id="logo" type="file" className="hidden" />
                                </label>
                            </div>
                        </div>
                        <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-small rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Create</button>
                    </form>
                </div>
                <div className="col-span-1" style={{ backgroundImage: "url('/create.jpg')", backgroundSize: 'cover', backgroundPosition: 'center' }}>
                </div>
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
        </div>
    )
}
