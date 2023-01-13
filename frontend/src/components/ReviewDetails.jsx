import React from 'react'

const ReviewDetails = ( { review }) => {

/*The HTML Tags here are just placeholders so that way we could
ensure that we were getting the right informationa nd rendering it, 
so making it pretty and readable will be a whole other task in itself
*/

    return(
        <div className="review-details">
        
        <p><strong>Rating:</strong>{review.rating} /5</p>
        <p><strong>Would Rent Again:</strong>{review.would_rent_again > 0 ? ✓: 𐄂 } </p>
        <p>Date: {review.date}</p>
        <p><strong>Comments:</strong></p>
        <p>{review.text}</p>
        </div>
    )
}