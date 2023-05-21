'use client'
import Head from "next/head";
import { Typography } from "@material-tailwind/react";
import { useState } from "react";



export default function SignUpTravellerPage() {

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    name: "",
    country: "",
    passport_number: "",
    age: "",
    gender: "",
    phone_number: "",
  });

  const [formErrors, setFormErrors] = useState({
  });

  const [isFormValid, setIsFormValid] = useState(null);



  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const validateForm = () => {
    let errors = {};
    let isValid = true;

    // Validate email
    if (!formData.email) {
      errors.email = "Email is required";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Email is invalid";
      isValid = false;
    }

    // Validate password
    if (!formData.password) {
      errors.password = "Password is required";
      isValid = false;
    } else if (formData.password.length < 8) {
      errors.password = "Password must be at least 8 characters long";
      isValid = false;
    }

    // Validate confirm password
    if (!formData.confirmPassword) {
      errors.confirmPassword = "Confirm password is required";
      isValid = false;
    } else if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = "Passwords do not match";
      isValid = false;
    }

    // Validate name
    if (!formData.name) {
      errors.name = "Name is required";
      isValid = false;
    }

    // Validate country
    if (!formData.country) {
      errors.country = "Country is required";
      isValid = false;
    }

    // Validate passport number
    if (!formData.passport_number) {
      errors.passport_number = "Passport number is required";
      isValid = false;
    }

    // Validate age
    if (!formData.age) {
      errors.age = "Age is required";
      isValid = false;
    } else if (isNaN(formData.age)) {
      errors.age = "Age must be a number";
      isValid = false;
    }

    // Validate gender
    if (!formData.gender) {
      errors.gender = "Gender is required";
      isValid = false;
    }

    // Validate phone number
    if (!formData.phone_number) {
      errors.phone_number = "Phone number is required";
      isValid = false;
    } else if (!/^\d{11}$/.test(formData.phone_number)) {
      errors.phone_number = "Phone number must be an 11-digit number";
      isValid = false;
    }

    setFormErrors(errors);
    setIsFormValid(isValid);
  };

  const handleSubmit = async (event) => {
    console.log("hi")

    validateForm()
    console.log(isFormValid)
    console.log(formErrors)
    event.preventDefault();
    if (isFormValid) {
      console.log("hi2")
      // get the form data
      // Remove confirmPassword field from formData
      const { confirmPassword, ...dataWithoutConfirmPassword } = formData;

      // Add role field with a value of 1
      const dataWithRole = { ...dataWithoutConfirmPassword, role: 1 };

      // Send POST request with form data as x-www-url-encoded data in the request body


      console.log(formData)

      // make the API request
      const response = await fetch('http://localhost:5000/api/user/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: new URLSearchParams(dataWithRole).toString()
      });

      // check if the request was successful
      if (response.ok) {
        // get the access and refresh tokens from the response
        const data = await response.json();
        // store the tokens in the local storage
        localStorage.setItem('accessToken', data.accessToken);
        localStorage.setItem('refreshToken', data.refreshToken);

        // redirect the user to the dashboard or homepage
        window.location.href = '/';
      } else {
        // handle the error
        console.error('API request failed');
        const errorData = await response.json();
        setFormErrors(errorData);
      }
    }
  };

  //add red line conditional rendering for all here
  return (
    <div className="container mx-auto">
      <div className="grid grid-cols-2 gap-0">
        <div className="col-span-1">  <Head>
          <title>Register</title>
        </Head>
          <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md " >
            <Typography align='center' variant='h3'>
              Sign Up
            </Typography>
            <br></br>
            <div className="grid md:grid-cols-2 md:gap-2 mb-2">
              <div className="mb-4">
                <label htmlFor="email" className="block text-gray-700 font-bold mb-2">Email address</label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`block w-full px-3 py-2 text-gray-700 border rounded ${formErrors.email ? 'border-red-500' : 'border-gray-400'}`}
                  required
                />
                {formErrors.email && <span className="text-sm text-red-500">{formErrors.email}</span>}
              </div>
              <div className="mb-4">
                <label htmlFor="password" className="block text-gray-700 font-bold mb-2">Password</label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  value={formData.password}
                  onChange={handleChange}
                  className={`block w-full px-3 py-2 text-gray-700 border rounded ${formErrors.password ? 'border-red-500' : 'border-gray-400'}`}
                  required
                />
                {formErrors.password && <span className="text-sm text-red-500">{formErrors.password}</span>}
              </div>
              <div className="mb-4">
                <label htmlFor="confirm_password" className="block text-gray-700 font-bold mb-2">Confirm password</label>
                <input
                  type="password"
                  id="confirm_password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className={`block w-full px-3 py-2 text-gray-700 border rounded ${formErrors.confirmPassword ? 'border-red-500' : 'border-gray-400'}`}
                  required
                />
                {formErrors.confirmPassword && <span className="text-sm text-red-500">{formErrors.confirmPassword}</span>}
              </div>
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
                <label htmlFor="country" className="block text-gray-700 font-bold mb-2">Country</label>
                <input
                  type="text"
                  name="country"
                  id="country"
                  value={formData.country}
                  onChange={handleChange}
                  className={`block w-full px-3 py-2 text-gray-700 border rounded ${formErrors.country ? 'border-red-500' : 'border-gray-400'}`}
                  required
                />
                {formErrors.country && <span className="text-sm text-red-500">{formErrors.country}</span>}
              </div>
              <div className="mb-4">
                <label htmlFor="phone_number" className="block text-gray-700 font-bold mb-2">Phone Number</label>
                <input
                  type="tel"
                  pattern="[0-9]{4}[0-9]{7}"
                  name="phone_number"
                  id="phone_number"
                  value={formData.phone_number}
                  onChange={handleChange}
                  className={`block w-full px-3 py-2 text-gray-700 border rounded ${formErrors.phone_number ? 'border-red-500' : 'border-gray-400'}`}
                  required
                />
                {formErrors.phone_number && <span className="text-sm text-red-500">{formErrors.phone_number}</span>}
              </div>
              <div className="mb-4">
                <label htmlFor="gender" className="block text-gray-700 font-bold mb-2">Gender</label>
                <input
                  type="text"
                  name="gender"
                  id="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  className={`block w-full px-3 py-2 text-gray-700 border rounded ${formErrors.gender ? 'border-red-500' : 'border-gray-400'}`}
                  required
                />
                {formErrors.gender && <span className="text-sm text-red-500">{formErrors.gender}</span>}
              </div>
              <div className="mb-4">
                <label htmlFor="age" className="block text-gray-700 font-bold mb-2">Age</label>
                <input
                  type="text"
                  id="age"
                  name="age"
                  value={formData.Age}
                  onChange={handleChange}
                  className={`block w-full px-3 py-2 text-gray-700 border rounded ${formErrors.Age ? 'border-red-500' : 'border-gray-400'}`}
                  required
                />
                {formErrors.Age && <span className="text-sm text-red-500">{formErrors.Age}</span>}
              </div>
              <div className="mb-4">
                <label htmlFor="passport_number" className="block text-gray-700 font-bold mb-2">Passport Number</label>
                <input
                  type="text"
                  name="passport_number"
                  id="passport_number"
                  value={formData.passport_number}
                  onChange={handleChange}
                  className={`block w-full px-3 py-2 text-gray-700 border rounded ${formErrors.passport_number ? 'border-red-500' : 'border-gray-400'}`}
                  required
                />
                {formErrors.passport_number && <span className="text-sm text-red-500">{formErrors.passport_number}</span>}
              </div>
            </div>
            <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-lg w-full sm:w-auto px-6 py-3 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
          </form>
        </div>
        <div className="col-span-1" style={{ backgroundImage: "url('/regTrav.avif')", backgroundSize: 'cover', backgroundPosition: 'center' }}>
        </div>
      </div>
    </div>

  );
}







