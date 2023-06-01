import Link from 'next/link'
import getCatTrips from '@/lib/getCatTrips'
import TripList from './components/SortedTripList';
import { Suspense } from 'react';
import LoadingSpinner from './loading';
import getSortedTrips from '@/lib/getSortedTrips';

async function TripsDisplaySorted({ params: { sortOption } }) {



    const tripCat = ''
    const allTrips = await getCatTrips(tripCat);

    var sortBy = ""
    var sortOrder = ""
    switch (sortOption) {
        case 'CostAsc':
            sortBy = 'cost';
            sortOrder = 'asc';
            break;
        case 'CostDesc':
            sortBy = 'cost';
            sortOrder = 'desc';
            break;
        case 'DurationAsc':
            sortBy = 'duration';
            sortOrder = 'asc';
            break;
        case 'DurationDesc':
            sortBy = 'duration';
            sortOrder = 'desc';
            break;
        default:
            break;
    }

    const tripData = await getSortedTrips(sortBy, sortOrder, allTrips)




    return (
        <div style={{ backgroundImage: "url('/sorted.jpg')", backgroundSize: 'cover', backgroundPosition: 'center', backgroundColor: "#4a5568", backgroundBlendMode: "multiply" }} >
            <div className='flex flex-col'>

            <h5 className='flex justify-center mt-10 text-lg font-semibold text-white lg:text-xl sm:px-16 lg:px-48'>Sort trips</h5>
            <div className='flex justify-center mt-3' >


                <div class="inline-flex rounded-md shadow-sm" role="group">

                    <Link href='/sortedTrips/CostAsc'>
                        <button type="button" class="px-4 py-2 text-sm font-medium text-white bg-transparent border border-gray-900 rounded-l-lg hover:bg-gray-900 hover:text-white focus:z-10 focus:ring-2 focus:ring-gray-500 focus:bg-gray-900 focus:text-white dark:border-white dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:bg-gray-700">
                            Cost Asc
                        </button>
                    </Link>
                    <Link href='/sortedTrips/CostDesc'>
                        <button type="button" class="px-4 py-2 text-sm font-medium text-white bg-transparent border-t border-b border-gray-900 hover:bg-gray-900 hover:text-white focus:z-10 focus:ring-2 focus:ring-gray-500 focus:bg-gray-900 focus:text-white dark:border-white dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:bg-gray-700">
                            Cost Desc
                        </button>
                    </Link>
                    <Link href='/sortedTrips/DurationAsc'>
                        <button type="button" class="px-4 py-2 text-sm font-medium text-white bg-transparent border border-gray-900 hover:bg-gray-900 hover:text-white focus:z-10 focus:ring-2 focus:ring-gray-500 focus:bg-gray-900 focus:text-white dark:border-white dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:bg-gray-700">
                            Duration Asc
                        </button>
                    </Link>
                    <Link href='/sortedTrips/DurationDesc'>
                        <button type="button" class="px-4 py-2 text-sm font-medium text-white bg-transparent border border-gray-900 hover:bg-gray-900 hover:text-white focus:z-10 focus:ring-2 focus:ring-gray-500 focus:bg-gray-900 focus:text-white dark:border-white dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:bg-gray-700">
                            Duration Desc
                        </button>
                    </Link>
                    <Link href='/trips/all'>
                        <button type="button" class="px-4 py-2 text-sm font-medium text-white bg-transparent border border-gray-900 rounded-r-md hover:bg-gray-900 hover:text-white focus:z-10 focus:ring-2 focus:ring-gray-500 focus:bg-gray-900 focus:text-white dark:border-white dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:bg-gray-700">
                            None
                        </button>
                    </Link>
                </div>
            </div>
            </div>


            <Suspense fallback={<LoadingSpinner />} >
                <TripList promise={tripData} />
            </Suspense>
        </div>

    )
}

export default TripsDisplaySorted