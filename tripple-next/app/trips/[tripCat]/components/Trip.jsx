'use client'

import Link from 'next/link';
import { useDispatch } from 'react-redux';
import { setTrip } from '@/redux/features/tripSlice';

export default function Trip( props ) {

  const dispatch = useDispatch()

  function handleTripClick(trip) {
    dispatch(setTrip(trip));
    
  }
  
  
  
  
  return (
    <div className="max-w-4xl mx-auto grid grid-cols-1 lg:max-w-5xl lg:gap-x-20 lg:grid-cols-2 mt-16">
      <div className="relative p-3 col-start-1 row-start-1 flex flex-col-reverse rounded-lg bg-gradient-to-t from-black/75 via-black/0 sm:bg-none sm:row-start-2 sm:p-0 lg:row-start-1">
        <h1 className="mt-1 text-lg font-semibold text-black sm:text-slate-900 md:text-2xl dark:sm:text-white">{props.name}</h1>
        <p className="text-lg leading-4 font-medium text-black sm:text-slate-500 dark:sm:text-slate-400">Pkr {props.cost}/head</p>
      </div>
      <div className="grid gap-4 col-start-1 col-end-3 row-start-1 sm:mb-6 sm:grid-cols-4 lg:gap-6 lg:col-start-2 lg:row-end-6 lg:row-span-6 lg:mb-0">
        <img src="/trip1.jpg" alt="" className="w-full h-60 object-cover rounded-lg sm:h-52 sm:col-span-2 lg:col-span-full" loading="lazy" />
        <img src="/trip2.jpg" alt="" className="hidden w-full h-52 object-cover rounded-lg sm:block sm:col-span-2 md:col-span-1 lg:row-start-2 lg:col-span-2 lg:h-32" loading="lazy" />
        <img src='/trip3.jpg' alt="" className="hidden w-full h-52 object-cover rounded-lg md:block lg:row-start-2 lg:col-span-2 lg:h-32" loading="lazy" />
      </div>
      <dl className="mt-4 text-xs font-medium flex items-center row-start-2 sm:mt-1 sm:row-start-3 md:mt-2.5 lg:row-start-2">
        <dt className="sr-only">Reviews</dt>
        <dd className="text-indigo-600 flex items-center dark:text-indigo-400">
          <svg width="24" height="24" fill="none" aria-hidden="true" className="mr-1 stroke-current dark:stroke-indigo-500">
            <path d="m12 5 2 5h5l-4 4 2.103 5L12 16l-5.103 3L9 14l-4-4h5l2-5Z" th="2" cap="round" strokeLinejoin="round" />
          </svg>
          <span>{props.rating} <span className="text-slate-400 font-normal">{`(${props.numOfRatings})`}</span></span>
        </dd>
        <dt className="sr-only">{props.destination}</dt>
        <dd className="flex items-center">
          <svg width="2" height="2" aria-hidden="true" fill="currentColor" className="mx-3 text-slate-300">
            <circle cx="1" cy="1" r="1" />
          </svg>
          <svg width="24" height="24" fill="none" stroke="currentColor" th="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1 text-slate-400 dark:text-slate-500" aria-hidden="true">
            <path d="M12 21l-2-2m0 0L8 17m4 4l4-4m-4 4v-6" />
          </svg>
          <span className="text-slate-400">{props.destination}</span>
        </dd>

      </dl>
      <div className="mt-4 col-start-1 row-start-3 self-center sm:mt-0 sm:col-start-2 sm:row-start-2 sm:row-span-2 lg:mt-6 lg:col-start-1 lg:row-start-3 lg:row-end-4">
        <Link href='/TripDetails'>
          <button onClick={() => handleTripClick(props)} type="button"className="bg-indigo-600 text-white text-sm leading-6 font-medium py-2 px-3 rounded-lg">
            More Info
          </button>
        </Link>
      </div>
      <p className="mt-4 text-sm leading-6 col-start-1 sm:col-span-2 lg:mt-6 lg:row-start-4 lg:col-span-1 dark:text-slate-400">
        {props.description}
      </p>
    </div>


  )
}
