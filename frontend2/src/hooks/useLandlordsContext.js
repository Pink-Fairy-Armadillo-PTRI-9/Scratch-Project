import { LandlordsContext } from "../context/LandlordsContext";
import React from 'react'
import { useContext } from 'react'

export const useLandlordsContext = () => {
    const context = useContext(LandlordsContext)

if (!context) {
    throw Error('useTasksContext muse be inside an TasksContextProvider')
}

    return context
}