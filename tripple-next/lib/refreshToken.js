

export default async function refreshToken(refreshToken) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ refreshToken: refreshToken })
      };
    
      
      try {
        const res = await fetch("http://localhost:5000/api/user/token", requestOptions);
        const newToken = await res.json()
        console.log("new token generated")
        return newToken
    } catch (error) {
        console.log(error)
        throw new Error("could not refresh token")
    }
}