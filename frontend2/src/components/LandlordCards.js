import React, { useState, useEffect } from 'react';
import tasksModel from '../../../backend/models/tasksModel'
import { useTasksContext } from '../hooks/useTasksContext'


const LandLordCards = ({ landlord }) => {

    const handleClick = async () => {
    

    }

    return(
        <div className="lanlord-search-results" onClick={handleClick}>
            <h4 onClick={handleClick}>{landlord.name}</h4>
            <p><strong>Main City:</strong>{landlord.location}</p>
            <p><strong>Average Rating: </strong>{landlord.rating}</p>
            <p><strong>Would Rent Again: </strong>{landlord.rentAgain}</p>
        </div>
    )
}

export default LandlordCards