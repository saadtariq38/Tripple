'use client'

import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setAgentTrip } from '@/redux/features/agentTripSlice';

import AgentTripDetail from './components/AgentTripDetails';
import getTravellerDetails from '@/lib/getTravellerDetails';



export default function AgentTripDetailsPage() {
    

  const dispatch = useDispatch();
  const storedTrip = useSelector((state) => state.agentTrip.agentTrip);
  const [usernames, setUsernames] = useState();
  
  //const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      // check if `storedTrip` is not set
      if (!storedTrip) {
        console.log("hll")
        const storedData = localStorage.getItem('AgentTripDetailsData');
        if (storedData) {
          // dispatch the `setTrip` action to set the data to the store
          dispatch(setAgentTrip(JSON.parse(storedData)));
        }
        const users = {};
        await Promise.all(
          storedTrip.registeredUsers.map(async (user) => {
            const userData = await getTravellerDetails(user);
            users[user] = userData
          })
        );
        setUsernames(users);
        console.log("usernames and phone numbers")
        console.log(usernames)
      } else {
        const users = {};
        await Promise.all(
          storedTrip.registeredUsers.map(async (user) => {
            
            const userData = await getTravellerDetails(user);
            users[user] = userData
            console.log("in loop", users[user] )
          })
        );
        setUsernames(users);
        console.log("usernsmes and phones")
        console.log(usernames)
      }
      //setLoading(false);
    }

    

    fetchData();
  }, [dispatch, storedTrip]);
   
    

  if (usernames && storedTrip) {

    return (
      <AgentTripDetail
        // _id={storedTrip._id}
        // description={storedTrip.description}
        // images={storedTrip.images}
        // cost={storedTrip.cost}
        // rating={storedTrip.rating}
        // numOfRatings={storedTrip.numOfRatings}
        // destination={storedTrip.destination}
        // availableSeats={storedTrip.availableSeats}
        // agent={storedTrip.agent}
        // name={storedTrip.name}
        // duration={storedTrip.duration}
        // tripCategory={storedTrip.tripCategory}
        // tripType={storedTrip.tripType}
        // status={storedTrip.stastoredTrip}
        // comments={storedTrip.comments}
        // startingLocation={storedTrip.startingLocation}
        // itinerary={storedTrip.itinerary}
  
        _id={storedTrip._id}
        description={storedTrip.description}
        images={storedTrip.images}
        cost={storedTrip.cost}
        rating={storedTrip.rating}
        numOfRatings={storedTrip.numOfRatings}
        destination={storedTrip.destination}
        availableSeats={storedTrip.availableSeats}
        agent={storedTrip.agent}
        name={storedTrip.name}
        duration={storedTrip.duration}
        usernames={usernames}
        //status={storedTrip.status}
        //comments={storedTrip.comments}
        startingLocation={storedTrip.startingLocation}
        itinerary={storedTrip.itinerary}
        registeredUsers={storedTrip.registeredUsers}
      />
    )
  }
}
