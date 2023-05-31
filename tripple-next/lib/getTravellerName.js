const getTravellerName = async (id) => {
    const headers = {
        'Content-Type': 'application/json',

    }
    const requestOptions = {
        method: 'GET',
        headers,
    }

    try {
        const res = await fetch(`http://localhost:5000/api/user/${id}`, requestOptions);
        const name = await res.json()
        return name
    } catch (error) {
        throw new Error(`Get Traveller Name request failed with status ${res.status}`)
    }


    
}


export default getTravellerName