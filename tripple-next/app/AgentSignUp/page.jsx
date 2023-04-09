'use client'
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
      }
  return (
    <></>
  )
}

