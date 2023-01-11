import { ReviewContext } from "../context/ReviewContext";
import React from 'react'
import { useContext } from 'react'

export const useReviewContext = () => {
    const context = useContext(ReviewContext)

if (!context) {
    throw Error('useTasksContext muse be inside an TasksContextProvider')
}

    return context
}