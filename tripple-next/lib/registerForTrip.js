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
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };
  

export default registerForTrip;

