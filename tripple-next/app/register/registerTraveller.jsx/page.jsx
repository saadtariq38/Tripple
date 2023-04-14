'use client'

import {
    Card,
    Input,
    Checkbox,
    Button,
    Typography,
} from "@material-tailwind/react";
import { useState } from "react";

export default function RegisterForm() {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        confirmPassword: "",
    });
    const [formErrors, setFormErrors] = useState({
        email: "",
        password: "",
        confirmPassword: "",
    });

    const handleInputChange = (e) => {
        setFormData((prevFormData) => ({
            ...prevFormData,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const errors = {};
        if (!formData.email) {
            errors.email = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            errors.email = "Email is invalid";
        }

        if (!formData.password) {
            errors.password = "Password is required";
        } else if (formData.password.length < 8) {
            errors.password = "Password must be at least 8 characters";
        }

        if (!formData.confirmPassword) {
            errors.confirmPassword = "Confirm password is required";
        } else if (formData.password !== formData.confirmPassword) {
            errors.confirmPassword = "Passwords do not match";
        }

        setFormErrors(errors);

        if (Object.keys(errors).length === 0) {
            console.log("Form submitted successfully");
        }
    };

    return (
        <Card color="transparent" shadow={false} className="">
            <div className="flex justify-center">

            <div>

            <Typography variant="h4" color="blue-gray">
                Sign Up
            </Typography>
            <Typography color="gray" className="mt-1 font-normal">
                Enter your details to register.
            </Typography>
            </div>
            
            <form onSubmit={handleSubmit} className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
                <div className="mb-4 flex flex-col gap-6">
                    <Input
                        size="lg"
                        label="Name"
                        name="name"
                        id="name"
                        value={formData.name}
                        onChange={handleInputChange}
                    />
                    <div className="mb-4">
                        <label
                            htmlFor="email"
                            className="block text-gray-700 font-bold mb-2"
                        >
                            Email
                        </label>
                        <input
                            type="email"
                            name="email"
                            id="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            className={`${formErrors.email ? "border-red-500" : ""
                                } shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
                        />
                        {formErrors.email && (
                            <p className="text-red-500 text-xs italic">
                                {formErrors.email}
                            </p>
                        )}
                    </div>
                    <div className="mb-4">
                        <label
                            htmlFor="password"
                            className="block text-gray-700 font-bold mb-2"
                        >
                            Password
                        </label>
                        <input
                            type="password"
                            name="password"
                            id="password"
                            value={formData.password}
                            onChange={handleInputChange}
                            className={`${formErrors.password ? "border-red-500" : ""
                                } shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
                        />
                        {formErrors.password && (
                            <p className="text-red-500 text-xs italic">
                                {formErrors.confirmPassword}
                            </p>
                        )}
                    </div>
                    <Checkbox color="blueGray" text="I agree to the terms and conditions" />
                    <Button
                        color="indigo"
                        buttonType="filled"
                        size="lg"
                        block={true}
                        className="mt-8"
                        onClick={handleSubmit}
                    >
                        Sign Up
                    </Button>
                </div>
            </form>
            </div>
        </Card>
    );
}



{/* <fieldset>
    <legend class="sr-only">Countries</legend>

    <div class="flex items-center mb-4">
        <input id="country-option-1" type="radio" name="countries" value="USA" class="w-4 h-4 border-gray-300 focus:ring-2 focus:ring-blue-300 dark:focus:ring-blue-600 dark:focus:bg-blue-600 dark:bg-gray-700 dark:border-gray-600" checked />
        <label for="country-option-1" class="block ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
            United States
        </label>
    </div>

    <div class="flex items-center mb-4">
        <input id="country-option-2" type="radio" name="countries" value="Germany" class="w-4 h-4 border-gray-300 focus:ring-2 focus:ring-blue-300 dark:focus:ring-blue-600 dark:focus:bg-blue-600 dark:bg-gray-700 dark:border-gray-600" />
        <label for="country-option-2" class="block ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
            Germany
        </label>
    </div>

    <div class="flex items-center mb-4">
        <input id="country-option-3" type="radio" name="countries" value="Spain" class="w-4 h-4 border-gray-300 focus:ring-2 focus:ring-blue-300 dark:focus:ring-blue-600 dark:bg-gray-700 dark:border-gray-600" />
        <label for="country-option-3" class="block ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
            Spain
        </label>
    </div>

    <div class="flex items-center mb-4">
        <input id="country-option-4" type="radio" name="countries" value="United Kingdom" class="w-4 h-4 border-gray-300 focus:ring-2 focus:ring:blue-300 dark:focus-ring-blue-600 dark:bg-gray-700 dark:border-gray-600" />
        <label for="country-option-4" class="block ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
            United Kingdom
        </label>
    </div>

    <div class="flex items-center">
        <input id="option-disabled" type="radio" name="countries" value="China" class="w-4 h-4 border-gray-200 focus:ring-2 focus:ring-blue-300 dark:focus:ring-blue-600 dark:bg-gray-700 dark:border-gray-600" disabled />
        <label for="option-disabled" class="block ml-2 text-sm font-medium text-gray-300 dark:text-gray-700">
            China (disabled)
        </label>
    </div>
</fieldset> */}