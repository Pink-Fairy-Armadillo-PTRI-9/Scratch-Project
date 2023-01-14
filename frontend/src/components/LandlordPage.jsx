import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import AddReview from './AddReview.jsx';
import ReviewDetails from './ReviewDetails.jsx';

const LandlordPage = () => {
  const location = useLocation();
  const { landlord, from } = location.state;

  const [data, setData] = useState({ landlord: {}, reviews: [] }); // data.landlord, data.reviews
  
  useEffect(() => {
    if (from === 'LandlordCard') {
      fetch('/api/getlandlord/' + landlord._id)
      .then((res) => res.json())
      .then((data) => setData(data))
      .then(console.log('data in fetch', data));
    } else {
      setData({ landlord })
    }}, [])

  return (
    <div className="flex flex-col items-center py-2">
      <h3 className="py-4">
        <strong>{data.landlord.name}</strong>
      </h3>
      <h2>
        <strong>Main City: </strong>
        {data.landlord.location}
      </h2>
      <p>
        <strong>Rating: </strong>
        {data.landlord.rating ? data.landlord.rating : 'N/A'}
      </p>
      <p className="mb-2">
        <strong>Would Rent Again: </strong>
        {data.landlord.would_rent_again ? data.landlord.would_rent_again : 'N/A'}
      </p>
      <div className="reviews">
        {data.reviews &&
          data.reviews.map((review) => (
            <ReviewDetails key={review._id} review={review} />
          ))}
        <AddReview landlord={data.landlord}/>
      </div>
    </div>
  );
};

export default LandlordPage;
