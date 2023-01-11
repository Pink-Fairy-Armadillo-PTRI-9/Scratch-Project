import React from 'react'
import { createContext, useReducer } from 'react'


export const ReviewsContext = createContext()

export const reviewsReducer = (state, action) => {
    switch(action.type) {
        case 'SET_REVIEWS':
            console.log('set_reviews',state)
            return {
                ...state,
                reviews: action.payload
            }
        case 'CREATE_REVIEW':
            console.log('create_review', state);
            return {
                ...state,
                reviews: [action.payload, ...state.tasks]
            }
        default:
            return state
    }
}

export const ReviewsContextProvider = ({ children }) => {

    const [state, dispatch] = useReducer(reviewsReducer, {
        tasks: null
    })

    return (
        <ReviewsContext.Provider value={{...state, dispatch}}>
            { children }
        </ReviewsContext.Provider>
    )
}


