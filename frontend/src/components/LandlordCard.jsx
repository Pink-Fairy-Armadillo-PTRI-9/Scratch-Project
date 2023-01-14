//renders multiple of these upon search in home page if they fit search criteria

import React from 'react';
import { Link } from 'react-router-dom';

const LandlordCard = ({ landlord }) => {
  return (
    <div className="landlordCards bg-secondary  p-4 rounded-md  text-gray-600 ">
      <h4 className="font-bold text-xl">{landlord.name}</h4>
      <td>
        <div className="flex space-x-1">
          <div className="font-medium">Location: </div>
          <p> {landlord.location}</p>
        </div>
        
        <div className="flex ">
          <div className="font-medium mr-1">Rating: </div>
          {landlord.averageRating ? landlord.averageRating : 'N/A'}
        </div>
      </td>

      {/* <strong className="font-medium">Would Rent Again: </strong>
        {landlord.would_rent_again} */}

      <div className="flex flex-col items-end">
        <Link
          to="/landlord"
          state={{ landlord: landlord, from: 'LandlordCard' }}
          className="text-gray-800 text-md "
        >
          <button
            type="button"
            className="cursor-pointer w-full py-2 text-gray-600 hover:text-dark-purple"
          >
            See Landlord Reviews
          </button>
        </Link>
      </div>
    </div>
  );
};

export default LandlordCard;
