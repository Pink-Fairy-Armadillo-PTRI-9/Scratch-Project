//renders multiple of these upon search in home page if they fit search criteria

import React from 'react';
import { Link } from 'react-router-dom';

const LandlordCard = ({
  landlord
}) => {
  return (
    // className="lanlord-search-results"
    <article className="landlordCards">
      <h4>{landlord.name}</h4>
      <ul>
        <li><strong>Main City: </strong>{landlord.location}</li>
        <li><strong>Average Rating: </strong>{landlord.rating}</li>
        <li><strong>Would Rent Again: </strong>{landlord.would_rent_again}</li>
      </ul> 
      <Link to='/landlord/'{landlord._id}>
        <button type="button">
          See Landlord Reviews
        </button>
      </Link>
    </article>
  );
};

export default LandlordCard;
