

const cancelTrip = async (tripId, accessToken) => {


    const headers = {
        Authorization: `Bearer ${accessToken}`,
    };

    try {
        const response = await fetch(`http://localhost:5000/api/trips/cancel/${tripId}`, {
            method: 'PUT',
            headers,
        });
        const data = await response.json();
        
    } catch (error) {
        console.log(error.message);
        throw new Error("could not unregister from trip")
    }
}

export default cancelTrip