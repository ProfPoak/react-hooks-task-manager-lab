import React, { useEffect, useContext, useState } from "react";
import { TaskContext } from "../context/TaskContext";
import TaskForm from "./TaskForm";
import SearchBar from "./SearchBar";

function App() {
  const { setTasks, serverUrl } = useContext(TaskContext)

  useEffect(() => {
    fetch(`${serverUrl}`)
    .then(r=>r.json())
    .then(data=>setTasks(data))
    .catch(error => console.log(error))
  }, []);

  return (
    <div>
      <h1>Task Manager</h1>
      <TaskForm />
      <SearchBar />
    </div>
  );
}

export default App;
