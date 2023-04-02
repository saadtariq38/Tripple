import Link from 'next/link'
import getCatTrips from '@/lib/getCatTrips'
import TripList from './components/TripList';
import { Suspense } from 'react';

async function TripCategoryDisplay({params: { tripCat }}) {

    const tripData = getCatTrips(tripCat);

  return (
    <>
        <h1>{tripCat.charAt(0).toUpperCase() + tripCat.slice(1)} trips</h1>
        <br />
        <Link href ='/'>Go to home</Link>
        <br />
        <Suspense fallback={<div>Loading...</div>}>
            <TripList promise={tripData} />
        </Suspense>
    </>
    
  )
}

export default TripCategoryDisplay