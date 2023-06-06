'use client'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import { useState } from "react";
import Link from "next/link"
import axios from 'axios';

export default function ResetPassword(props) {
    const [formData, setFormData] = useState({
        otpCode: "",
        password: "",
        confirmPassword: "",
    });

    const [formErrors, setFormErrors] = useState({});

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
        console.log(isValid)

        // Validate otp
        if (!formData.otpCode) {
            errors.otpCode = "Otp is required";
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
        console.log(isValid)
        setFormErrors(errors);
        setIsFormValid(isValid);
    }
    const handleSubmit = async (event) => {
        console.log("hi")
        validateForm()
        console.log(isFormValid)
        console.log(formErrors)
        event.preventDefault();
        console.log(formData)
        if (isFormValid) {
            Object.assign(formData, props)
            let response = await axios({
                method: 'POST',
                url: 'http://localhost:5000/api/user/change-password',
                data: formData
            })
            if (response.status == 200){
                toast.success("Password Changed Successfully");
            }
            else{
                toast.error("Error");
            }

        }       
    };

    return (
        <section className="bg-transparent">
          <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0 bg-opacity-0">
            <Link href="/" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
              <img className="w-8 h-8 mr-2" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg" alt="logo" />
              Tripple
            </Link>
            <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
              <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
                  <div>
                    <label htmlFor="otpCode" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Otp</label>
                    <input
                      type="text"
                      name="otpCode"
                      id="otpCode"
                      value={formData.otpCode}
                      onChange={handleChange}
                      placeholder="••••"
                      className={`block w-full px-3 py-2 text-gray-700 border rounded ${formErrors.otpCode ? 'border-red-500' : 'border-gray-400'}`}
                      required
                    />
                    {formErrors.otpCode && <span className="text-sm text-red-500">{formErrors.otpCode}</span>}
                  </div>
                  <div>
                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
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
                  <div className="mb-6">
                    <label htmlFor="confirmPassword" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm Password</label>
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
                  <Link href="http://localhost:3000/login">
                    <button type="button" onClick={handleSubmit} className="w-full mt-4 text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Reset Password</button>
                  </Link>
                </form>
              </div>
            </div>
          </div>
          <div>
            <ToastContainer
              position="bottom-center"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="light"
            />
          </div>
        </section>
      );
      
      
}
