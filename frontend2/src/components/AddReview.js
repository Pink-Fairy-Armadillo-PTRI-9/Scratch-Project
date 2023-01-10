import React, { useState } from 'react'
import { useTasksContext } from '../hooks/useTasksContext'

const NewTaskForm = () => {
    const { dispatch } = useTasksContext()
    const [name, setName] = useState('')
    const [category, setCategory] = useState('')
    const [dueDate, setDueDate] = useState('')
    const [error, setError] = useState(null)

    const handleSubmit = async (e) => {
        e.preventDefault()

        const task = {name, category, dueDate}

        const response = await fetch('http://localhost:3000/tasks/', {
            method: 'POST',
            body: JSON.stringify(task),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const json = await response.json()

        if (!response.ok) {
            setError(json.error);
        }
        if (response.ok) {
            setName('')
            setCategory('')
            setDueDate('')
            setError(null)
            console.log('new task added', json)
            dispatch({type: 'CREATE_TASK', payload: json})
        }
    }

    return (
        <form className="create" onSubmit={handleSubmit}>
        <h3>Add a New Task</h3>

        <label>Task Name:</label>
        <input 
            type="text"
            onChange={(e)=> setName(e.target.value)} 
            value={name} 
        />

        <label>Category:</label>
        <input 
            type="text"
            onChange={(e)=> setCategory(e.target.value)} 
            value={category} 
        />

        <label>Due Date:</label>
        <input 
            type="text"
            onChange={(e)=> setDueDate(e.target.value)} 
            value={dueDate} 
        />

        <button>Add Task</button>
        {error && <div className="error">{error}</div>}
     </form>

    )
}

export default NewTaskForm