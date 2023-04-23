const jwt = require('jsonwebtoken')

const unregisterFromTrip = async (tripId, accessToken) => {

    const decodedToken = jwt.decode(accessToken);
    const userRole = decodedToken.role;

    if (userRole === 2) {
        throw new Error("Unauthorized-only traveller can unregister from trips")
    }


    const headers = {
        Authorization: `Bearer ${accessToken}`,
    };

    try {
        const response = await fetch(`http://localhost:5000/api/trips/unregister/${tripId}`, {
            method: 'PUT',
            headers,
        });
        const data = await response.json();
        
    } catch (error) {
        console.log(error);
        throw new Error("could not unregister from trip")
    }
}

export default unregisterFromTrip