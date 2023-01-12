//if logged in, renders form to submit new review to relevant landlord and updates review components
//if not logged in, prompt user in some way to log in/disallow entry of a new review

import React, { useState } from 'react'
import { render } from 'sass'

const AddReview = () => {
    const [name, setName] = useState('')
    const [address, setAddress] = useState('') 
    const [rating, setRating] = useState('') //should be out of 5 (don't accept a value higher in submit, so throw error)
    const [rentAgain, setRentAgain] = useState('') //should be yes/no boolean
    const [text, setText] = useState('') // bigger text box
    const [date, setDate] = useState('') // MM/YY Format
    const [submitted, setSubmitted] = useState(false)
    const [error, setError] = useState(null)

    const handleSubmit = async (e) => {
        e.preventDefault()

        const review = {name, address, rating, rentAgain, date}

        const response = await fetch('http://localhost:3000/', {
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
            setSubmitted(true);
            setInterval(setSubmitted(false), 3000)
            /*
            should render something indicating success????
            */
        }
    }

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

        {submitted && <h3>Submission success!</h3>} 
     </form>
    )
}

export default AddReview
