'use client'

import getUserRegisteredTrips from "@/lib/getUserRegisteredTrips"
//import { Suspense } from 'react';
//import LoadingSpinner from './loading';
import UserTripList from "./components/UserTripList";
import { useState } from "react";
import { useEffect } from "react";
import refreshToken from "@/lib/refreshToken";
import Link from "next/link";

const MyTripsPage = () => {

  // const [data, setData] = useState()
  // console.log("meow")
  

  // useEffect(() => {
  //   const accessToken = localStorage.getItem('accessToken')
  //   console.log("hello")

  //   if (!accessToken) {
  //     window.location.href = '/login';
  //   }

  //   async function getData() {
  //     const userTrips = await getUserRegisteredTrips(accessToken)
  //     console.log(userTrips)
  //     console.log("here")
  //     setData(userTrips);
  //   }
  //   getData();
  // }, []);

  const [userTrips, setUserTrips] = useState([]);
  const accessToken = typeof window !== 'undefined' ? localStorage.getItem('accessToken') : null;

  //console.log(accessToken)
 

  useEffect(() => {
    if (accessToken) {
      getUserRegisteredTrips(accessToken)
        .then((data) => {
          setUserTrips(data);
        })
        .catch((error) => {
          
          console.log(error.message)
          if(error.message === 'Not authorized'){ //check this later for the refreshing token thingie. not working rn
            const newAccessToken = refreshToken(localStorage.getItem('refreshToken'))
            localStorage.setItem('accessToken', newAccessToken)
            getUserRegisteredTrips(accessToken)
            .then((data) => {
              setUserTrips(data);
            })
          }
        });
    }

    
  }, [accessToken]);

  return (
    <div>
      {(userTrips.length === 0) ? (
        <div class="flex flex-col justify-center items-center my-52">
        <h1 class="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">You have no <span class="underline underline-offset-3 decoration-8 decoration-blue-400 dark:decoration-blue-600">Registered Trips</span></h1>
        <Link href='trips/all' class="ml-2 font-semibold text-gray-500 dark:text-gray-400">Click here to start browsing!</Link>
      </div>

      ) : (
        <UserTripList userTrips={userTrips} />
      )}
    </div>
  );

  


  // return (
  //   <>
  //           <UserTripList data={data} />
  //       {/* <Suspense fallback={<LoadingSpinner/>} >
  //       </Suspense> */}
  //   </>
  // )
}

export default MyTripsPage
