export default async function TripList({ promise }) {
    const trips = await promise
    

    const content = trips.map(trip => {
        return (
            <div key={trip._id}>
                <h2>{trip.name}</h2>
                <p>{trip.description}</p>
                <p>{trip.duration}</p>
                <p>{trip.description}</p>
                <p>{trip.tripCategory}</p>
                <p>{trip.tripType}</p>
                <p>{trip.images}</p>
                <p>{trip.cost}</p>
            </div>

            
        )
    })

    return content
  
}

