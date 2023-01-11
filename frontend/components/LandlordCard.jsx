import React from 'react';
import { Link } from 'react-router-dom';


const LandlordCard = ({
  id, name, rating
}) => {
  return (
    <article className="card charCard">
      <div className="charHeadContainer">
          <h3 className="charName">{name}</h3>
      </div>
      <ul className="charDetailsList">
        <li className="charDetail">Rating: {rating}</li>
       </ul> 
       <Link to="/landlord">
        <button
        type="button"
        className="btnSecondary btnLg"
        >
          See landlord details
        </button>
        </Link>
    </article>
  );
};

export default LandlordCard;
