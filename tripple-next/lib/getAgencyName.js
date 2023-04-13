
export default async function getAgencyName(agent_user_id) {
    
    const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      };
    
      const res = await fetch(`http://localhost:5000/api/user/agent/${agent_user_id}`, requestOptions);
      if (!res.ok) throw new Error("Failed to fetch agent data");
      const resData = await res.json();
    
      return resData
}
