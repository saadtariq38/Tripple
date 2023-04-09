'use client'
import Head from "next/head";
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
        <div>

        <Head>
        <title>Register</title>
        </Head>
        <form onSubmit={handleSubmit}>
            <div className="relative z-0 w-full mb-6 group">
                <input type="email" name="email" id="email" value={formData.email} onChange={handleChange} className={`block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer ${formErrors.email ? 'border-red-500' : ''}`} placeholder=" " required />
                <label htmlFor="email" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email address</label>
                <span className={` ${formErrors.email ? 'text-sm text-red-500' : 'hidden'}`}>{formErrors.email}</span>
            </div>
            <div className="relative z-0 w-full mb-6 group">
                <input type="password" name="password" id="password" value={formData.password} onChange={handleChange} className={`block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer ${formErrors.password ? 'border-red-500' : ''}`} placeholder=" " required />
                <label htmlFor="password" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Password</label>
                <span className={` ${formErrors.password ? 'text-sm text-red-500' : 'hidden'}`}>{formErrors.password}</span>
            </div>
            <div className="relative z-0 w-full mb-6 group">
                <input type="password" id="confirm_password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} className={`block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer ${formErrors.confirmPassword ? 'border-red-500' : ''}`} placeholder=" " required />
                <label htmlFor="confirm_password" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Confirm password</label>
                <span className={` ${formErrors.confirmPassword ? 'text-sm text-red-500' : 'hidden'}`}>{formErrors.confirmPassword}</span>
            </div>
            <div className="grid md:grid-cols-2 md:gap-6">
                <div className="relative z-0 w-full mb-6 group">
                    <input type="text" name="name" id="name" value={formData.name} onChange={handleChange} className={`block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer ${formErrors.name ? 'border-red-500' : ''}`} placeholder=" " required />
                    <label htmlFor="name" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Name</label>
                    <span className={` ${formErrors.name ? 'text-sm text-red-500' : 'hidden'}`}>{formErrors.name}</span>
                </div>
                <div className="relative z-0 w-full mb-6 group">
                    <input type="text" name="country" id="country" value={formData.country} onChange={handleChange} className={`block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer ${formErrors.country ? 'border-red-500' : ''}`} placeholder=" " required />
                    <label htmlFor="country" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Country</label>
                    <span className={` ${formErrors.country ? 'text-sm text-red-500' : 'hidden'}`}>{formErrors.country}</span>
                </div>
            </div>
            <div className="grid md:grid-cols-2 md:gap-6">
                <div className="relative z-0 w-full mb-6 group">
                    <input type="tel" pattern="[0-9]{4}[0-9]{7}" name="phone_number" id="phone_number" value={formData.phone_number} onChange={handleChange} className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                    <label htmlFor="phone_number" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Phone number (03xx-xxxxxxx)</label>
                </div>
                <div className="relative z-0 w-full mb-6 group">
                    <input type="text" name="gender" id="gender" value={formData.gender} onChange={handleChange} className={`block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer ${formErrors.gender ? 'border-red-500' : ''}`} placeholder=" " required />
                    <label htmlFor="gender" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Gender</label>
                    <span className={` ${formErrors.gender ? 'text-sm text-red-500' : 'hidden'}`}>{formErrors.gender}</span>
                </div>
            </div>
            <div className="grid md:grid-cols-2 md:gap-6">
                <div className="relative z-0 w-full mb-6 group">
                    <input type="text"  name="age" id="age" value={formData.age} onChange={handleChange} className={`block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer ${formErrors.age ? 'border-red-500' : ''}`} placeholder=" " required />
                    <label htmlFor="age" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Age</label>
                    <span className={` ${formErrors.age ? 'text-sm text-red-500' : 'hidden'}`}>{formErrors.age}</span>
                </div>
                <div className="relative z-0 w-full mb-6 group">
                    <input type="text" name="passport_number" id="passport_number" value={formData.passport_number} onChange={handleChange} className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                    <label htmlFor="passport_number" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Passport Number</label>
                </div>
            </div>
            <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
        </form>
        </div>


    );
}
  






