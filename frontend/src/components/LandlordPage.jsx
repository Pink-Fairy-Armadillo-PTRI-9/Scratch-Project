import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import AddReview from './AddReview.jsx';
import ReviewDetails from './ReviewDetails.jsx';

const LandlordPage = () => {
  const location = useLocation();
  const { id } = location.state;
  console.log('id: ', id);

  const [data, setData] = useState({ landlord: {}, reviews: [] });

  useEffect(() => {
    fetch('/api/getlandlord/' + id)
    .then(res => res.json())
    .then(data => setData(data))
  }, []);

  console.log('data: ', data);
    return (
      <div className="container">
        <h3><strong>{data.landlord.name}</strong></h3>
        <h2><strong>Main City: </strong></h2>
        <p><strong>Rating: </strong>{data.landlord.rating}</p>
        <p><strong>Would Rent Again: </strong>{data.landlord.would_rent_again}</p>
          <div className="reviews">
          {data.reviews && data.reviews.map((review)=> (
              <ReviewDetails key = {review._id} review={review}/>
          ))}
          <AddReview/>
        </div>
      </div>
    )
}

export default LandlordPage