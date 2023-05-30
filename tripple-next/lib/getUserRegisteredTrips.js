

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

    if (res.status === 200) {
      const tripData = await res.json();
      return tripData;
    } else if (res.status === 401) {
      console.log("helper 401")
      throw new Error("Token expired")
    } else {
      throw new Error(`Request failed with status: ${res.status}`); // Throw the status code as an error for other cases
    }

  } catch (error) {
    console.log("in api helper")
    console.log(error.message);
    throw error;
  }





}

export default getUserRegisteredTrips;
