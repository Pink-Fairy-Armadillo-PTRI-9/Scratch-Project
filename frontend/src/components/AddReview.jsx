//if logged in, renders form to submit new review to relevant landlord and updates review components
//if not logged in, prompt user in some way to log in/disallow entry of a new review

import React, { useState } from 'react'
import Container from '../css/Container.jsx';
import Submit from '../css/form/Submit.jsx';
import Title from '../css/form/Title.jsx';
import FormInput from '../css/form/FormInput.jsx';
const AddReview = ({ landlord }) => {
    
    const [id, setId] = useState(landlord._id)
    const [rating, setRating] = useState('') //should be out of 5 (don't accept a value higher in submit, so throw error)
    const [would_rent_again, setRentAgain] = useState('') //should be yes/no boolean
    const [text, setText] = useState('') // bigger text box
    const [date, setDate] = useState('') // MM/YY Format
    const [submitted, setSubmitted] = useState(false)
    const [error, setError] = useState(null)

    const handleSubmit = async (e) => {
        e.preventDefault()
        would_rent_again === true ? setRentAgain(1) : setRentAgain(0)
        const review = {id, text, rating, date, would_rent_again}

        const response = await fetch('/api/postReviews', {
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
            setRating('') // int
            setRentAgain('') // 1 or 0
            setText('') // str
            setDate('') // str
            setError(null)
            console.log('new review added', json)
            setSubmitted(true);
            setInterval(setSubmitted(false), 3000)
        }
    }
    return (

        <div className="inset-0  flex justify-center items-center ">
            <Container>

            {/* <div className=" bg-primary flex justify-center items-center h-screen -z-10 "> */}
            <form
                onSubmit={handleSubmit}
                className={' bg-white drop-shadow rounded p-6 space-y-6 w-80'}
            >
          <Title>Add Review</Title>
          <FormInput
            value={rating}
            onChange={(e) => setRating(e.target.value)}
            label="Rating:"
            placeholder="_"
            name="rating"
          />
          <FormInput
            value={would_rent_again}
            onClick={(e) => setRentAgain(true)}
            label="Rent Again"
            placeholder="_"
            name="RentAgain"
            type="checkbox"
          />
          <FormInput
            value={text}
            onChange={(e) => setText(e.target.value)}
            label="Comments"
            placeholder="_"
            name="Comments"
            type="Text"
          />
          <Submit value="Submit" />
        {error && <div className="error">{error}</div>}
        {submitted && <h3>Submission success!</h3>}  
        </form> 

            </Container>
            {error && <div className="error">{error}</div>}
        </div> 
    )
}

export default AddReview
