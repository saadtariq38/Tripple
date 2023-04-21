'use client'

import getUserRegisteredTrips from "@/lib/getUserRegisteredTrips"
import { Suspense } from 'react';
import LoadingSpinner from './loading';
import UserTripList from "./components/UserTripList";
import { useState } from "react";
import { useEffect } from "react";
import refreshToken from "@/lib/refreshToken";

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
  console.log("acces token here")

  useEffect(() => {
    if (accessToken) {
      getUserRegisteredTrips(accessToken)
        .then((data) => {
          setUserTrips(data);
        })
        .catch((error) => {
          if(error.message === "token expired sending 401"){
            const newAccessToken = refreshToken(localStorage.getItem('refreshToken'))
            localStorage.setItem('accessToken', newAccessToken)
            getUserRegisteredTrips(accessToken)
            .then((data) => {
              setUserTrips(data);
            })
          }
        });
    }

    console.log(userTrips)
  }, [accessToken]);

  return (
    <div>
      
      <UserTripList userTrips={userTrips} />
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
