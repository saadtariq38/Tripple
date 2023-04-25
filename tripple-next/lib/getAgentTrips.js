
export default async function getAgentTrips(accessToken) {

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
        return tripData;
    } catch (error) {
        console.log(error.message)
        throw new Error("could not get user trips")
    }
}