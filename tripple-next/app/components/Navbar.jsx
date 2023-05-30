"use client";


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

export default function NavbarComponent() {




  const logout = () => {
    localStorage.clear()
    setLoggedIn(false)
  }
  const [openNav, setOpenNav] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [role, setRole] = useState(null)
  
 
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
      
      {loggedIn && (<Typography
        as="li"
        variant="medium"
        color="blue-gray"
        className="p-1 font-normal"
      >
        <Link href={role === 1 ? '/myTrips' : 'myAgentTrips'} className="flex items-center mr-40 font-semibold">
          My Trips
        </Link>
      </Typography>)}

    </ul>
  );
 
  useEffect(() => {
    if (typeof window !== "undefined") {
      // Check if localStorage is available on the client-side
      if (localStorage.getItem("accessToken") === null) {
        setLoggedIn(false)
      } else {
        setLoggedIn(true)
        const decoded = jwt.decode(localStorage.getItem('accessToken'))
        console.log(decoded.role)
        setRole(decoded.role)
      }
    }
  }, []); // Run this effect only once on mount

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
          <span className="text-2xl text-blue-500 font-semibold">Tripple</span>
        </Typography>
        <div className="hidden lg:block">{navList}</div>
        {!loggedIn ? (
          <div className="ml-48 ml-auto">
            <Link href="/register">
              <Button variant="gradient" size="sm" className="hidden lg:inline-block">
                <span>Register</span>
              </Button>
            </Link>
            <Link href="/login">
              <Button variant="gradient" size="sm" className="hidden lg:inline-block ml-2">
                <span>Login</span>
              </Button>
            </Link>
          </div>
        ) : (
          <div className="ml-7 ml-auto">
            <Link href="/">
              <Button onClick={logout} variant="gradient" size="sm" className="hidden lg:inline-block">
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
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </IconButton>
      </div>
      
      <MobileNav open={openNav}>
        <div className="container mx-auto">{navList}</div>
      </MobileNav>
      
    </Navbar>
    <div className="w-full h-2 bg-gradient-to-r from-blue-500 to-purple-500" />
    </div>
  );
}