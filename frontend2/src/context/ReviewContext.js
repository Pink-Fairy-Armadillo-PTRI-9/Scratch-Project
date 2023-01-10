import React from 'react'
import { createContext, useReducer } from 'react'


export const TasksContext = createContext()

export const tasksReducer = (state, action) => {
    switch(action.type) {
        case 'SET_TASKS':
            console.log(state)
            return {
                ...state,
                tasks: action.payload
            }
        case 'CREATE_TASK':
            console.log(state);
            return {
                ...state,
                tasks: [action.payload, ...state.tasks]
            }
        case 'COMPLETE_TASK':
            console.log(state);
            return {
                ...state,
                tasks: state.tasks.filter((task) => task._id !== action.payload._id)
            }
        case 'START_TIME':
            console.log(state);
            return {
                ...state,
                tasks: action.payload
            }
        case 'STOP_TIME':
            console.log(state);
            return {
                ...state,
                tasks: action.payload
            }
        default:
            return state
    }
}

export const TasksContextProvider = ({ children }) => {

    const [state, dispatch] = useReducer(tasksReducer, {
        tasks: null
    })

    return (
        <TasksContext.Provider value={{...state, dispatch}}>
            { children }
        </TasksContext.Provider>
    )
}


