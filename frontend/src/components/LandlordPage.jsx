import React, { useEffect, useState } from 'react'

const LandlordPage = ({ landlord }) => {
  const [landlordPage, setLandlordPage] = useState()

  useEffect(() => {
    fetch('/api/getlandlord/' + landlord._id)
    .then(res => res.json())
    .then(json => setLandlordPage(json))
    .then(console.log('landlord page in state', landlordPage))
  }, []);

    return (
      <div className="container">
        <h3><strong>{landlord.name}</strong></h3>
        <h2><strong>Main City: </strong></h2>
        <p><strong>Rating: </strong>{landlord.rating}</p>
        <p><strong>Would Rent Again: </strong>{landlord.would_rent_again}</p>
        <div className="reviews">
        {landlordPage.reviews && landlordPage.reviews.map((review)=> (
            <ReviewDetails key = {review._id} task={review}/>
        ))}
        <AddReview/>
      </div>
      </div>
    )
}

export default LandlordPage