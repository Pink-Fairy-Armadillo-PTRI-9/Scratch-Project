import React, { useState } from 'react'
import { useReviewContext } from '../hooks/useReviewerContext'

const AddReview = () => {
    const { dispatch } = useReviewContext()
    const [name, setName] = useState('')
    const [address, setAddress] = useState('') 
    const [rating, setRating] = useState('') //should be out of 5 (don't accept a value higher in submit, so throw error)
    const [rentAgain, setRentAgain] = useState('') //should be yes/no boolean
    const [text, setText] = useState('') // bigger text box
    const [date, setDate] = useState('') // MM/YY Format
    const [error, setError] = useState(null)

    const handleSubmit = async (e) => {
        e.preventDefault()

        const review = {name, address, rating, rentAgain, date}

        const response = await fetch('http://localhost:3000/tasks/', {
            method: 'POST',
            body: JSON.stringify(review),
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
            setRating('')
            setRentAgain('')
            setText('')
            setDate('')
            setError(null)
            console.log('new review added', json)
            dispatch({type: 'CREATE_REVIEW', payload: json})
            //!!!need to dispatch something here for state management!!!
        }
    }

            setName('')
            setAddress('')
            setRating('')
            setRentAgain('')
            setText('')
            setDate('')
            setError(null)

    return (
        <form className="create" onSubmit={handleSubmit}>
        <h3>Add a New Landlord</h3>

        <label>Landlord Name: {landlord.name}</label> 

        <label>Address of Residence:</label>
        <input 
            type="text"
            onChange={(e)=> setCategory(e.target.value)} 
            value={address} 
        />

        <label>Rating:</label>
        <input 
            type="text"
            onChange={(e)=> setDueDate(e.target.value)} 
            value={rating} 
        />

        <label>Would You Rent Again?</label>
        <input 
            type="text"
            onChange={(e)=> setDueDate(e.target.value)} 
            value={rentAgain} 
        />

        <label>Comments:</label>
        <input 
            type="text"
            onChange={(e)=> setDueDate(e.target.value)} 
            value={text} 
        />

        <label>Date of Residency:</label>
        <input 
            type="text"
            onChange={(e)=> setDueDate(e.target.value)} 
            value={date} 
        />

        <button>Submit Landlord</button>
        {error && <div className="error">{error}</div>}
     </form>

    )
}

export default AddReview