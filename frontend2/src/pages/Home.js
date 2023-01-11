import React, { useEffect } from 'react'
import { useLandlordsContext } from '../hooks/useLandlordsContext';

//components
import LandlordCards from '../components/LandlordCards';
import AddLandlord from '../components/AddLandlord';


/*
we need to conditionally render landlords upon the search. my suggestion is that we fetch all the landlords
in one variable of state, called landlords, and filter those out into another state variable labelled
along the lines of landlordsResults
*/

const Home = () => {
    const {landlords, landlordsResults, dispatch} = useLandlordsContext()

    useEffect( () => {
        const fetchTasks = async () => {
            const response = await fetch('http://localhost:3000/tasks/');
            console.log(response);
            const json = await response.json();
            console.log(json);
            if (response.ok) {
                dispatch({type: 'SET_LANDLORDS', payload: json})
            }
        }
        fetchTasks()
    }, [])
    return (
        <div className="home">
        <div className="landlords">
        {landlordsResults && landlordsResults.map((landlord)=> (
            <Landlords key = {landlord._id} landlord={landlord}/>
        ))}
        </div>
        <AddLandlord/>
        </div>
    )
}

export default Home