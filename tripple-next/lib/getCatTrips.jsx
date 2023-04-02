
export default async function getCatTrips(cat) {
    const data = {
        tripCategory: cat
    };

    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded'},
        body: JSON.stringify(data)
    }

    const res = await fetch('http://localhost:5000/api/trips', requestOptions)
    if(!res.ok) throw new Error("Failed to fetch trips")
    const resData = await res.json()
  
    return resData
    
  
}
