'use client'

import getAgentTrips from "@/lib/getAgentTrips";
//import { Suspense } from 'react';
//import LoadingSpinner from './loading';
import AgentTripList from "./components/AgentTripList";
import { useState } from "react";
import { useEffect } from "react";
import refreshToken from "@/lib/refreshToken";
import Link from "next/link";

const AgentTripsPage = () => {


  const [agentTrips, setAgentTrips] = useState([]);
  const accessToken = typeof window !== 'undefined' ? localStorage.getItem('accessToken') : null;

  //console.log(accessToken)
 

  useEffect(() => {
    if (accessToken) {
      getAgentTrips(accessToken)
        .then((data) => {
          setAgentTrips(data);
        })
        .catch((error) => {
          
          console.log(error.message)
          if(error.message === 'Not authorized'){ //check this later for the refreshing token thingie. not working rn
            const newAccessToken = refreshToken(localStorage.getItem('refreshToken'))
            localStorage.setItem('accessToken', newAccessToken)
            getAgentTrips(accessToken)
            .then((data) => {
              setAgentTrips(data);
            })
          }
        });
    }

    
  }, [accessToken]);

  return (
    <div>
      {(agentTrips.length === 0) ? (
        <div class="flex flex-col justify-center items-center my-52">
        <h1 class="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">Your agency has no <span class="underline underline-offset-3 decoration-8 decoration-blue-400 dark:decoration-blue-600">Uploaded Trips</span></h1>
        <Link href='#' class="ml-2 font-semibold text-gray-500 dark:text-gray-400">Click here to create a trip!</Link>
      </div>

      ) : (
        <AgentTripList agentTrips={agentTrips} />
      )}
    </div>
  );

  
}

export default AgentTripsPage