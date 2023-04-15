'use client'

import {  useSelector } from 'react-redux';

import TripDetail from './components/TripDetail';


export default function TripDetailsPage() {
    const storedTrip = useSelector((state) => state.trip.trip);
   
    

  return (
    <TripDetail />
  )
}
