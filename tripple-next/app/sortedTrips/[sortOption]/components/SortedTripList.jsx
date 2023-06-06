import Trip from "./SortedTrip"


export default async function SortedTripList({ promise }) {
    const sortedTrips = await promise
    
    
    

    const content = sortedTrips.map(trip => {
        
        return (
            <div key={trip._id} class = "text-white">
                
                <Trip
                    _id={trip._id}
                    description={trip.description}
                    images={trip.images}
                    cost={trip.cost}
                    rating={trip.rating}
                    numOfRatings={trip.numOfRatings}
                    destination={trip.destination}
                    availableSeats={trip.availableSeats}
                    agent={trip.agent}
                    name={trip.name}
                    duration={trip.duration}
                    status={trip.status}
                    comments={trip.comments}
                    startingLocation={trip.startingLocation}
                    itinerary={trip.itinerary}
                />
                {/* agentName = data <= prop to be passed in Trip
                <h2>{trip.name}</h2>
                <p>{trip.description}</p>
                <p>{trip.duration}</p>
                <p>{trip.description}</p>
                <p>{trip.tripCategory}</p>
                <p>{trip.tripType}</p>
                <p>{trip.images}</p>
                <p>{trip.cost}</p> */}
            </div>

            
        )
    })

    return content
  
}
