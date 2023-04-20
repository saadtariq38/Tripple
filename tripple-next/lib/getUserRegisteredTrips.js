

const getUserRegisteredTrips = async (accessToken) => {

    

    const headers = {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
    }

    const requestOptions = {
        method: 'GET',
        headers,
    };

    try {
        const res = await fetch(`http://localhost:5000/api/trips/userTrips`, requestOptions);
        const tripData = await res.json()
        console.log(tripData)
        return tripData
    } catch (error) {
        console.log(error)
        throw new Error("could not get user trips")
    }

    



}

export default getUserRegisteredTrips;
