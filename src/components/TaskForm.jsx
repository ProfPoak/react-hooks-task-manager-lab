import React, { useState, useId, useContext } from "react";
import { TaskContext } from "../context/TaskContext";

function TaskForm() {
  const { addTask } = useContext(TaskContext)
  const [taskName, setTaskName] = useState("");
  const nameId = useId()

  function handleSubmit(e) {
    e.preventDefault();
    if (taskName.trim() === "") return;
    setTaskName("");

      addTask()
  }

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor={nameId}>New Task:</label>
      <input
        type="text"
        value={taskName}
        onChange={(e) => setTaskName(e.target.value)}
        placeholder="Add a new task..."
        id={nameId}
      />
      <button type="submit">Add Task</button>
    </form>
  );
}

export default TaskForm;
