export default async function rateTripOnlyRating(rating, tripId, accessToken) {


    const headers = {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
    };

    const requestOptions = {
        method: 'POST',
        headers,
        body: JSON.stringify({
          rating,
        }),
      };

    const res = await fetch(`http://localhost:5000/api/trips/review/${tripId}`, requestOptions);
    if (!res.ok) throw new Error("Failed to add a review");
    const resData = await res.json();

    return resData
}