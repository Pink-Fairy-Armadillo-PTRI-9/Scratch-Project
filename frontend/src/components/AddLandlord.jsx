//at the bottom of search results, display a new landlord form


import React, { useState } from 'react'

const AddLandlord = () => {
    // const { dispatch } = useTasksContext()
    const [name, setName] = useState('')
    const [address, setAddress] = useState('')
    const [location, setLocation] = useState('')
    const [error, setError] = useState(null)

    const handleSubmit = async (e) => {
        e.preventDefault()

        const landlord = {name, address, location}

        const response = await fetch('http://localhost:3000/tasks/', {
            method: 'POST',
            body: JSON.stringify(task),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const json = await response.json()

        if (!response.ok) {
            setError(json.error);
        }
        if (response.ok) {
            setName('')
            setAddress('')
            setLocation('')
            setError(null)
            console.log('new landlord added', json)
            // dispatch({type: 'CREATE_TASK', payload: json})
            //!!!need to dispatch something here for state management!!!
        }
    }

    return (
        <form className="create" onSubmit={handleSubmit}>
        <h3>Add a New Landlord</h3>

        <label>Landlord Name:</label>
        <input 
            type="text"
            onChange={(e)=> setName(e.target.value)} 
            value={name} 
        />

        <label>Address of Residence:</label>
        <input 
            type="text"
            onChange={(e)=> setCategory(e.target.value)} 
            value={address} 
        />

        <label>Landlord's City:</label>
        <input 
            type="text"
            onChange={(e)=> setDueDate(e.target.value)} 
            value={location} 
        />

        <button>Submit Landlord</button>
        {error && <div className="error">{error}</div>}
     </form>

    )
}

export default AddLandlord