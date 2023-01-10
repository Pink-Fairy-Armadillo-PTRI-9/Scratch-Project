import React, { useState, useEffect } from 'react';
import tasksModel from '../../../backend/models/tasksModel'
import { useTasksContext } from '../hooks/useTasksContext'


const TaskDetails = ({ task }) => {

    const [time, setTime] = useState({
        hours: 0,
        minutes: 0,
        seconds: 0,
        totalInMinutes: 0,
      });
    const [timerOn, setTimerOn] = useState(false)
    
      // Use the useEffect hook to run an effect that starts the stopwatch
      useEffect(() => {
        let interval = null;
        if (timerOn) {
            interval = setInterval(() => {
              setTime((prevTime) => {
                let { hours, minutes, seconds } = prevTime;
                seconds++;
                if (seconds === 60) {
                  seconds = 0;
                  minutes++;
                }
                if (minutes === 60) {
                  minutes = 0;
                  hours++;
                }
                let totalInMinutes = (hours * 60) + minutes + (seconds / 60)
                return { hours, minutes, seconds, totalInMinutes };
              });
            }, 1000);
        } else {
            clearInterval(interval);
        }
    
        // Clean up the effect by clearing the interval when the component unmounts
        return () => clearInterval(interval);
      }, [timerOn]);
    
      let { hours, minutes, seconds, totalInMinutes } = time;

    const {  dispatch, ...state } = useTasksContext()

    const startTime = () => {
        setTimerOn(true);
        const newTasks = state.tasks.map((t) => {
            if (task._id === t._id) {
                return {
                    ...t,
                    timer: true,
                }
            }
            return t
        })
        dispatch({type:'START_TIME', payload: newTasks})
        console.log('new Tasks', newTasks)
    }


    const stopAndAddTime = async () => {
        setTimerOn(false);
        console.log(totalInMinutes);
        const newTasks = state.tasks.map((t) => {
            if (t._id === task._id) {
                return {
                    ...t,
                    timer: false
                }
            }
            return t
        })

        // dispatch({type:'STOP_TIME', payload: newTasks})
        const response = await fetch('http://localhost:3000/tasks/timer/' + task._id, {
            method: 'PATCH',
            body: JSON.stringify({time: totalInMinutes}),
            headers: {
              'Content-Type': 'application/json',
            }
        })
        const json = await response.json()
        if (response.ok) {
            dispatch({type:'STOP_TIME', payload: newTasks})
        }

        setTime({
            hours: 0,
            minutes: 0,
            seconds: 0,
            totalInMinutes: 0,
          });    
    }

    const handleClick = async () => {
        const response = await fetch('http://localhost:3000/tasks/' + task._id, {
            method: 'PATCH',
        })
        const json = await response.json()
        if (response.ok) {
            dispatch({type:'COMPLETE_TASK', payload: json})
        }
    }

    return(
        <div className="task-details">
            <h4>{task.name}</h4>
            <p><strong>Due Date:</strong>{task.dueDate}</p>
            <p><strong>Category: </strong>{task.category}</p>
            <span onClick={handleClick}>Complete</span>
            <button onClick={task.timer ? stopAndAddTime : startTime}>{task.timer ? '◾' : '▶'}</button>
            {task.timer && 
                <small>
            {hours.toString().padStart(2, '0')}:
            {minutes.toString().padStart(2, '0')}:
            {seconds.toString().padStart(2, '0')}
                </small>
            }
            
        </div>
    )
}

export default TaskDetails