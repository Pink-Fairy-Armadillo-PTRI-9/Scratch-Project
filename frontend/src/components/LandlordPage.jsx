import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import AddReview from './AddReview.jsx';
import ReviewDetails from './ReviewDetails.jsx';

const LandlordPage = () => {
  const location = useLocation();
  const { id } = location.state;

  const [data, setData] = useState({ landlord: {}, reviews: [] });

  useEffect(() => {
    fetch('/api/getlandlord/' + id)
      .then((res) => res.json())
      .then((data) => setData(data));
  }, []);

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
        {data.landlord.rating}
      </p>
      <p className="mb-2">
        <strong>Would Rent Again: </strong>
        {data.landlord.would_rent_again}
      </p>
      <div className="reviews">
        {data.reviews &&
          data.reviews.map((review) => (
            <ReviewDetails key={review._id} review={review} />
          ))}
        <AddReview />
      </div>
    </div>
  );
};

export default LandlordPage;
