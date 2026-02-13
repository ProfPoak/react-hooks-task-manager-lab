import React, { createContext, useState } from "react";

export const TaskContext = createContext();

export function TaskProvider({ children }) {
    const [tasks, setTasks] = useState([])
    const serverUrl = "http://localhost:6001/tasks"

    function toggleComplete(task) {
        const toggledTask = {
            completed:!task.completed
        }

        fetch(`${serverUrl}/${task.id}`, {
            method: "PATCH",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(toggledTask)
        })
        .then(response => {
            if(response.ok) {
               return response.json()
            }
            else {
                console.log("Unable to mark task complete")
            }
        })
        .then(updatedTask => {
            setTasks(prevTasks => prevTasks.map((task) =>
                task.id === updatedTask.id ? updatedTask : task
            ))
        })
        .catch(error => console.log(error))
    }

    function addTask(taskName) {
        const newTask = {
            title: taskName,
            completed: false,
        }

        fetch(`${serverUrl}`, {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body:JSON.stringify(newTask)
        })
        .then(response => {
            if(response.ok) {
                return response.json()
            }
            else{
                console.log("unable to add task")
            }
        })
        .then(returnedTask => {
            setTasks(prevTasks => [...prevTasks, returnedTasks])
        })
        .catch(error => console.log(error))
    }

    return (
        <TaskContext.Provider value={{tasks, setTasks, serverUrl, toggleComplete, addTask }}>
            {children}
        </TaskContext.Provider>
    )
}
