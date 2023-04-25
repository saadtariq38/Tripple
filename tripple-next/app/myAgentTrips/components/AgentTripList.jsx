import AgentTrip from "./AgentTrip"

export default function AgentTripList({ agentTrips }) {

   
    //console.log(userTrips)

    const content = agentTrips.map((trip => {
        return (
            <div key={trip._id}>
                
                <AgentTrip
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
                    registeredUsers={trip.registeredUsers}
                />
            </div>

            
        )
    }))

    return content
 
}

