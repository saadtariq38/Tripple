'use client'

import {  useSelector } from 'react-redux';

import TripDetail from './components/TripDetail';


export default function TripDetailsPage() {
    const storedTrip = useSelector((state) => state.trip.trip);
   
    

  return (
    <TripDetail
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
      tripCategory={storedTrip.tripCategory}
      tripType={storedTrip.tripType}
      status={storedTrip.stastoredTrip}
      comments={storedTrip.comments}
      startingLocation={storedTrip.startingLocation}
      itinerary={storedTrip.itinerary}
    />
  )
}
