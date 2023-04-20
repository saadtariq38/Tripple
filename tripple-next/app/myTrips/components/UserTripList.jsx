import UserTrip from "./UserTrip"

export default function UserTripList({ userTrips }) {

   
    //console.log(userTrips)

    const content = userTrips.map((trip => {
        return (
            <div key={trip._id}>
                
                <UserTrip
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
                    tripCategory={trip.tripCategory}
                    tripType={trip.tripType}
                    status={trip.status}
                    comments={trip.comments}
                    startingLocation={trip.startingLocation}
                    itinerary={trip.itinerary}
                />
            </div>

            
        )
    }))

    return content
 
}
