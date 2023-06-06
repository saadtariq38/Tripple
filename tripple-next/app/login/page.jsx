'use client'

import { useState } from "react";
import Link from "next/link"


export default function LoginForm() {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const [formErrors, setFormErrors] = useState(null);


    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const roleSelect = document.getElementById("role");
        const selectedRole = roleSelect.options[roleSelect.selectedIndex].value;
        const role = selectedRole === "Agency" ? 2 : 1;
        const formDataWithRole = { ...formData, role: role }
        console.log(formDataWithRole)

        
        const response = await fetch('http://localhost:5000/api/user/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formDataWithRole)
        });

        

        if (response.ok) {
            // get the access and refresh tokens from the response
            
            const data = await response.json();
           
            // store the tokens in the local storage
            localStorage.setItem('accessToken', data.accessToken);
            localStorage.setItem('refreshToken', data.refreshToken);

            setFormErrors(null)
            // redirect the user to the dashboard or homepage

            window.location.href = "/";
            
           
        } else {
            // handle the error
            console.error('API request failed');
            const errorData = await response.json();
            // if(response.status === 401){
            //     const invalidCredentials = "Incorrect credentials. Please try again"
            //     setFormErrors(invalidCredentials)
            // }
            setFormErrors(errorData);
        }
    }
  return (
      <section className="bg-gray-50 dark:bg-gray-900" style={{ backgroundImage: "url('/login2.jpg')", backgroundSize: 'cover', backgroundPosition: 'center', backgroundBlendMode: "multiply" }}>
          <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
              <Link href="/" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
                  <img className="w-8 h-8 mr-2" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg" alt="logo" />
                  Tripple
              </Link>
              <div className="w-full bg-white bg-opacity-50 rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                  <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                      <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                          Sign in to your account
                      </h1>
                      <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
                          <div>
                              <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                              <input type="email" name="email" id="email" onChange={handleChange} className={`${formErrors ? 'border-red-500' : 'border-gray-300'
                                  } bg-gray-50 border text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`} placeholder="name@example.com" required="" />
                          </div>
                          <div>
                              <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                              <input type="password" name="password" id="password" placeholder="••••••••" onChange={handleChange} className={`${formErrors ? 'border-red-500' : 'border-gray-300'
                                  } bg-gray-50 border text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`} required="" />
                                  {formErrors && <span className="text-red-500 text-sm">Incorrect credentials. Please try again</span>}
                          </div>

                          <label htmlFor="role" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Select your Role</label>
                          <select id="role" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                              <option>Agency</option>
                              <option>Traveller</option>
                          </select>

                          <div className="flex items-center justify-between">
                              <div className="flex items-start">
                                  <div className="flex items-center h-5">
                                      <input id="remember" aria-describedby="remember" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-black-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" required="" />
                                  </div>
                                  <div className="ml-3 text-sm">
                                      <label htmlFor="remember" className="text-black-500 dark:text-black-300">Remember me</label>
                                  </div>
                              </div>
                              <Link href="/Forgot" className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500">Forgot password?</Link>
                          </div>

                          <button type="submit" className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Sign in</button>
                          <p className="text-sm font-light text-black-500 dark:text-gray-400">
                              Don’t have an account yet?  
                              <Link href="/register" className="font-medium text-primary-600 hover:underline dark:text-primary-500 ml-1">
                                Sign Up
                              </Link>
                          </p>
                      </form>
                  </div>
              </div>
          </div>
      </section>
  )
}
