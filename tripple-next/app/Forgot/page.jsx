'use client'

import { useRef, useState } from "react";
import Link from "next/link"
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import ResetPasword from "../resetPassword/page";
import 'react-toastify/dist/ReactToastify.min.css';

export default function OtpForm() {
    const [formErrors] = useState(null);
    const [OtpForm, showForm] = useState(true);
    const emailRef = useRef();
    const sendOtp = async()=>{
            let response = await axios({
                method: 'POST',
                url: 'http://localhost:5000/api/user/email-send',
                data: {email: emailRef.current.value}
            })
            if (response.status == 200){
                toast.success("Success");
                showForm(false);
            }
            else{
                toast.error("Error");
            }
    }
    
  return (
      <section className="bg-gray-50 dark:bg-gray-900" style={{ backgroundImage: "url('/login2.jpg')", backgroundSize: 'cover', backgroundPosition: 'center', backgroundBlendMode: "multiply" }}>
          <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
              <Link href="/" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
                  <img className="w-8 h-8 mr-2" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg" alt="logo" />
                  Tripple
              </Link>
                  <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
          {  OtpForm ?  <form  className="space-y-4 md:space-y-6">
                <div>
                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                    <input type="email" name="email" id="email" ref = {emailRef} className={`${formErrors ? 'border-red-500' : 'border-gray-300'
                        } bg-gray-50 border text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`} placeholder="name@example.com" required="" />
                </div>
                <button type="button" onClick ={sendOtp} className="mx-auto text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-small mt-2 rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800" style={{ display: "block" }}>Send OTP</button>
            </form>
             :<ResetPasword email = {emailRef.current.value}/>
          }
                  </div>
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
      </section>
  )
}
