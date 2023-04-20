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

export default function NavbarComponent() {


  const logout = () => {
    localStorage.clear()
    setLoggedIn(false)
  }
  const [openNav, setOpenNav] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  
 
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
        <a href="#" className="flex items-center">
          Pages
        </a>
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-normal"
      >
        <a href="#" className="flex items-center">
          Account
        </a>
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-normal"
      >
        <a href="#" className="flex items-center">
          Blocks
        </a>
      </Typography>
      
      {loggedIn && (<Typography
        as="li"
        variant="medium"
        color="blue-gray"
        className="p-1 font-normal"
      >
        <a href="/myTrips" className="flex items-center mr-40 font-semibold">
          My Trips
        </a>
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
      }
    }
  }, []); // Run this effect only once on mount

  return (
    <Navbar className="mx-auto max-w-screen-xl py-2 px-4 lg:px-8 lg:py-4 w-full">
      <div className="container mx-auto flex items-center text-blue-gray-900">
        <Typography
          as="a"
          href="/"
          variant="small"
          className="mr-4 cursor-pointer py-1.5 font-normal"
        >
          <span className="text-2xl text-blue-500 font-bold">Tripple</span>
        </Typography>
        <div className="hidden lg:block">{navList}</div>
        {!loggedIn ? (
          <div className="ml-48">
            <Link href='/register'>
              <Button variant="gradient" size="sm" className="hidden lg:inline-block ml-96">
                <span>Register</span>
              </Button>
            </Link >
            <Link href='/login'>
              <Button variant="gradient" size="sm" className="hidden lg:inline-block ml-2">
                <span>Login</span>
              </Button>
            </Link>
          </div>
        ) : (
          <div className="ml-7">
          <Link href='/'>
            <Button onClick={logout} variant="gradient" size="sm" className="hidden lg:inline-block ml-96">
              <span>Log out</span>
            </Button>
          </Link>
          </div>
        )}
        
        
        <IconButton
          variant="text"
          className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
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
        <div className="container mx-auto">
          {navList}
        </div>
      </MobileNav>
    </Navbar>
  );
}