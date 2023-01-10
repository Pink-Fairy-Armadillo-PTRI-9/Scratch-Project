import React, { useEffect } from 'react'
import { useTasksContext } from '../hooks/useTasksContext';

//components
import TaskDetails from '../components/TaskDetails';
import NewTask from '../components/NewTask';


const Home = () => {
    const {tasks, dispatch} = useTasksContext()

    useEffect( () => {
        const fetchTasks = async () => {
            const response = await fetch('http://localhost:3000/tasks/');
            console.log(response);
            const json = await response.json();
            console.log(json);
            if (response.ok) {
                dispatch({type: 'SET_TASKS', payload: json})
            }
        }
        fetchTasks()
    }, [])
    return (
        <div className="home">
        <div className="tasks">
        {tasks && tasks.map((task)=> (
            <TaskDetails key = {task._id} task={task}/>
        ))}
        </div>
        <NewTask/>
        </div>
    )
}

export default Home