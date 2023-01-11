import React from 'react'
import { createContext, useReducer } from 'react'


export const LandlordsContext = createContext()

export const landlordsReducer = (state, action) => {
    switch(action.type) {
        case 'SET_LANDLORDS':
            console.log('set_landlords',state)
            return {
                ...state,
                landlords: action.payload
            }
        case 'CREATE_LANDLORD':
            console.log('create_landlord',state);
            return {
                ...state,
                landlords: [action.payload, ...state.tasks]
            }
        case 'SEARCH_LANDLORDS':
            console.log('search_landlords', state)
            return {
                ...state,
            }
        default:
            return state
    }
}

export const LandlordsContextProvider = ({ children }) => {

    const [state, dispatch] = useReducer(landlordsReducer, {
        landlords: null,
        landlordsResults: null,
        search: false
    })

    return (
        <LandlordsContext.Provider value={{...state, dispatch}}>
            { children }
        </LandlordsContext.Provider>
    )
}


