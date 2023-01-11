//renders multiple of these upon search in home page if they fit search criteria

import React from 'react';
import { Link } from 'react-router-dom';

const LandlordCard = ({
  landlord
}) => {
  return (
    // className="lanlord-search-results"
    <article className="task-details">
      <h4>{landlord.name}</h4>
      <ul>
        <li><strong>Main City:</strong>{landlord.location}</li>
        <li><strong>Average Rating: </strong>{landlord.rating}</li>
        <li><strong>Would Rent Again: </strong>{landlord.rentAgain}</li>
      </ul> 
      <Link to="/landlord">
        <button type="button">
          See landlord details
        </button>
      </Link>
    </article>
  );
};

export default LandlordCard;
