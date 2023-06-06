const jwt = require('jsonwebtoken');

const registerForTrip = async (tripId, accessToken) => {
    
  
    const decodedToken = jwt.decode(accessToken);
    const userRole = decodedToken.role;
  
    if (userRole === 2) {
        throw new Error("Unauthorized-only traveller can register for trips")
    }
  
    const headers = {
      Authorization: `Bearer ${accessToken}`,
    };
  
    try {
      const response = await fetch(`http://localhost:5000/api/trips/register/${tripId}`, {
        method: 'POST',
        headers,
      });
      if(response.status == 200){
        const data = await response.json();
      } else if(response.status == 401) {
        console.log("token error thrown in register for trip")
        throw new Error("Token expired")
      } else {
        throw new Error( `Error with status code ${response.status}`)
      }
    } catch (error) {
      console.log(error);
      throw error
    }
  };
  

export default registerForTrip;

