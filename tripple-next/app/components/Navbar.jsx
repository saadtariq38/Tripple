"use client"
import { useState, useEffect } from "react";
import {
  Navbar,
  MobileNav,
  Typography,
  Button,
  IconButton,
} from "@material-tailwind/react";
import Link from "next/link";
import jwt from "jsonwebtoken";
import { XMarkIcon } from "@heroicons/react/24/solid"; 

export default function NavbarComponent() {
  const logout = () => {
    localStorage.clear();
    setLoggedIn(false);
  };

  const [openNav, setOpenNav] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [role, setRole] = useState(null);
  const [showContactUs, setContactUs] = useState(false);

  useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false)
    );
  }, []);

  const navList = (
    <ul className="mb-4 mt-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-normal"
      >
        <Link href="/About" className="flex items-center">
          About
        </Link>
      </Typography>

            <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-normal"
      >
        <button
        type = "button"
        className=" bg-transparent text-black flex items-center" onClick={() => setContactUs(true)}>
          Contact Us
        </button>
      </Typography>




      {loggedIn && (
        <Typography
          as="li"
          variant="medium"
          color="blue-gray"
          className="p-1 font-normal"
        >
          <Link
            href={role === 1 ? "/myTrips" : "myAgentTrips"}
            className="flex items-center mr-40 font-semibold"
          >
            My Trips
          </Link>
        </Typography>
      )}
    </ul>
  );

  useEffect(() => {
    if (typeof window !== "undefined") {
      // Check if localStorage is available on the client-side
      if (localStorage.getItem("accessToken") === null) {
        setLoggedIn(false);
      } else {
        setLoggedIn(true);
        const decoded = jwt.decode(localStorage.getItem("accessToken"));
        console.log(decoded.role);
        setRole(decoded.role);
      }
    }
  }, []); // Run this effect only once on mount

  const handleButtonClick = () => {
    setContactUs(true);
  };

  const handleCloseModal = () => {
    setContactUs(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
  };

  return (
    <div className="flex flex-col">
      <Navbar className="max-w-screen-3xl py-2 px-4 lg:px-8 lg:py-4 w-full">
        <div className="container mx-auto flex items-center justify-between text-blue-gray-900">
          <Typography
            as="a"
            href="/"
            variant="small"
            className="mr-4 cursor-pointer py-1.5 font-normal"
          >
            <span className="text-2xl text-blue-500 font-semibold">
              Tripple
            </span>
          </Typography>
          <div className="hidden lg:block">{navList}</div>
          {!loggedIn ? (
            <div className="ml-48 ml-auto">
              <Link href="/register">
                <Button
                  variant="gradient"
                  size="sm"
                  className="hidden lg:inline-block"
                >
                  <span>Register</span>
                </Button>
              </Link>
              <Link href="/login">
                <Button
                  variant="gradient"
                  size="sm"
                  className="hidden lg:inline-block ml-2"
                >
                  <span>Login</span>
                </Button>
              </Link>
            </div>
          ) : (
            <div className="ml-7 ml-auto">
              <Link href="/">
                <Button
                  onClick={logout}
                  variant="gradient"
                  size="sm"
                  className="hidden lg:inline-block"
                >
                  <span>Log out</span>
                </Button>
              </Link>
            </div>
          )}
          <IconButton
            variant="text"
            className="h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
            ripple={false}
            onClick={() => setOpenNav(!openNav)}
          >
            {openNav ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                className="h-6 w-6"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </IconButton>
        </div>

        <MobileNav open={openNav}>
          <div className="container mx-auto">{navList}</div>
        </MobileNav>
      </Navbar>
      <div className="w-full h-2 bg-gradient-to-r from-blue-500 to-purple-500" />
      {showContactUs && (
  <div className="fixed top-0 left-0 right-0 z-50 w-full h-screen overflow-x-hidden overflow-y-auto bg-opacity-75 bg-gray-500 flex items-center justify-center">
    <div className="relative w-full max-w-md max-h-full bg-white rounded-md p-4">
      <button
        onClick={handleCloseModal}
        className="absolute top-0 right-0 m-4"
      >
        <XMarkIcon className="h-7 w-7" />
      </button>
      <h2 className="text-lg font-medium text-gray-900 mb-4">
        Contact Us
      </h2>
      <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
        <div>
          <label
            htmlFor="custom-message"
            className="text-gray-700 font-medium mb-2 block"
          >
            Reach out to us at Tripple
          </label>
          <textarea
            id="custom-message"
            name="custom-message"
            rows="3"
            className="shadow-sm focus:ring-blue-300 focus:border-blue-300 block w-full sm:text-sm border-gray-300 rounded-md"
            placeholder=" "
          ></textarea>
        </div>
        <div className="flex justify-end">
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded-md"
            onClick={handleCloseModal}
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  </div>
)}

    </div>
  );
}
