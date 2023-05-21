'use client'
import { Typography } from "@material-tailwind/react";
import Head from "next/head";
import { useState } from "react";


export default function AgentSignUpPage() {

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    name: "",
    description: "",
    logo: "",
    address: "",
    phone_number: "",
    logo: null,
  });

  const [formErrors, setFormErrors] = useState({
  });

  const [isFormValid, setIsFormValid] = useState(null);



  const handleChange = (event) => {
    const { name, value, files } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: name === "logo" ? files[0] : value
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
    // Validate address
    if (!formData.address) {
      errors.address = "Address is required";
      isValid = false;
    }
    // Validate description
    if (!formData.description) {
      errors.description = "Description is required";
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
  }

  const handleSubmit = async (event) => {
    console.log("submit clicked on form")

    validateForm()
    console.log(isFormValid)
    console.log("form errors below")
    console.log(formErrors)
    event.preventDefault();
    if (isFormValid) {
      console.log("form is valid condition true")
      // get the form data
      // Remove confirmPassword field from formData
      const { confirmPassword, ...dataWithoutConfirmPassword } = formData;

      // Add role field with a value of 1
      const dataWithRole = { ...dataWithoutConfirmPassword, role: 2, logo: formData.logo };

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


  return (

      <div className="container mx-auto">
        <div className="grid grid-cols-2 gap-0">
          <div className="col-span-1" style={{ backgroundImage: "url('/regAgent.avif')", backgroundSize: 'cover', backgroundPosition: 'center' }}>
          </div>
          <div className="col-span-1">
            <Head>
              <title>Register</title>
            </Head>
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md " >
              <Typography align='center' variant='h3'>
                Sign Up
              </Typography>
              <br></br>
              <div className="grid md:grid-cols-2 md:gap-2 mb-4">
                <div className="mb-4">
                  <label htmlFor="name" className="block text-gray-700 font-bold mb-2 ">Name</label>
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
                  <label htmlFor="email" className="block text-gray-700 font-bold mb-2 ">Email</label>
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
                  <label htmlFor="password" className="block text-gray-700 font-bold mb-2 ">Password</label>
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
                  <label htmlFor="confirm_password" className="block text-gray-700 font-bold mb-2 ">Confirm Password</label>
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
                  <label htmlFor="phone_number" className="block text-gray-700 font-bold mb-2 ">Phone Number</label>
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
                  <label htmlFor="address" className="block text-gray-700 font-bold mb-2 ">Address</label>
                  <input
                    type="text"
                    name="address"
                    id="address"
                    value={formData.address}
                    onChange={handleChange}
                    className={`block w-full px-3 py-2 text-gray-700 border rounded ${formErrors.address ? 'border-red-500' : 'border-gray-400'}`}
                    required
                  />
                  {formErrors.address && <span className="text-sm text-red-500">{formErrors.address}</span>}
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

              <button type="submit" style={{marginLeft: '85.5%'}} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" >Submit</button>
            </form>
          </div>
        </div>
      </div>

  )
}

