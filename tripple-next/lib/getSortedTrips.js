export default async function getSortedTrips(sortBy, sortOrder, trips) {
    try {
        const response = await fetch('http://localhost:5000/api/trips/sortedTrips', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                sortBy: sortBy,
                sortOrder: sortOrder,
                trips: trips
            })
        });

        if (!response.ok) {
            throw new Error('Unable to sort trips');
        }

        const sortedTrips = await response.json(); // Parse the response as JSON
        return sortedTrips;
    } catch (error) {
        console.error(error);
    }
};
