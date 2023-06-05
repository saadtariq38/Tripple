const getTravellerDetails = async (id) => {
    const headers = {
        'Content-Type': 'application/json',

    }
    const requestOptions = {
        method: 'GET',
        headers,
    }

    try {
        const res = await fetch(`http://localhost:5000/api/user/details/${id}`, requestOptions);
        const details = await res.json()
        return details
    } catch (error) {
        throw new Error(`Get Traveller Details request failed with status ${res.status}`)
    }


    
}


export default getTravellerDetails