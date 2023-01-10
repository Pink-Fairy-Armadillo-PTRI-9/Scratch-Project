import { TasksContext } from "../context/TaskContext";
import React from 'react'
import { useContext } from 'react'

export const useTasksContext = () => {
    const context = useContext(TasksContext)

if (!context) {
    throw Error('useTasksContext muse be inside an TasksContextProvider')
}

    return context
}