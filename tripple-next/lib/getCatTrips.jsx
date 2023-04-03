export default async function getCatTrips(cat) {
    const queryParams = new URLSearchParams({ tripCategory: cat });
  
    const requestOptions = {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    };
  
    const res = await fetch(`http://localhost:5000/api/trips?${queryParams}`, requestOptions);
    if (!res.ok) throw new Error("Failed to fetch trips");
    const resData = await res.json();
  
    return resData;
  }
