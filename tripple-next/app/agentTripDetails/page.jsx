'use client'

import {  useSelector } from 'react-redux';

import AgentTripDetail from './components/AgentTripDetails';


export default function AgentTripDetailsPage() {
    const storedTrip = useSelector((state) => state.agentTrip.agentTrip);
    console.log(storedTrip)
   
    

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
      //status={storedTrip.status}
      //comments={storedTrip.comments}
      startingLocation={storedTrip.startingLocation}
      itinerary={storedTrip.itinerary}
      registeredUsers={storedTrip.registeredUsers}
    />
  )
}
