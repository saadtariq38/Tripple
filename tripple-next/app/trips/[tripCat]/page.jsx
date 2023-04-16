import Link from 'next/link'
import getCatTrips from '@/lib/getCatTrips'
import TripList from './components/TripList';
import { Suspense } from 'react';
import LoadingSpinner from './loading';

async function TripCategoryDisplay({params: { tripCat }}) {

    tripCat = tripCat === 'all' ? '' : tripCat;
    const tripData = getCatTrips(tripCat);

  return (
    <>
        
        <Suspense fallback={<LoadingSpinner/>} >
            <TripList promise={tripData} />
        </Suspense>
    </>
    
  )
}

export default TripCategoryDisplay