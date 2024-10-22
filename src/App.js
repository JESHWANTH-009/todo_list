import React, { useState, useEffect } from 'react';
import './App.css'; // Correcting the import statement for CSS
import TaskItem from './TaskItem'; // Correcting the import statement for TaskItem

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [editingIndex, setEditingIndex] = useState(null);
  const [editingText, setEditingText] = useState('');

  // Function to add a new task
  const handleAddTask = () => {
    if (newTask.trim() === '') return;
    setTasks([...tasks, { text: newTask, completed: false }]);
    setNewTask('');
  };

  // Function to toggle task completion status
  const handleToggleCompletion = (index) => {
    const updatedTasks = tasks.map((task, i) =>
      i === index ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
  };

  // Function to delete a task
  const handleDeleteTask = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  };

  // Function to handle task editing
  const handleEditTask = (index) => {
    setEditingIndex(index);
    setEditingText(tasks[index].text);
  };

  // Function to handle input change for editing a task
  const handleEditChange = (event) => {
    setEditingText(event.target.value);
  };

  // Function to save the edited task
  const handleSaveEdit = () => {
    const updatedTasks = [...tasks];
    updatedTasks[editingIndex].text = editingText;
    setTasks(updatedTasks);
    setEditingIndex(null);
    setEditingText('');
  };

  // Load tasks from localStorage on initial render
  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem('tasks'));
    if (savedTasks) {
      setTasks(savedTasks);
    }
  }, []);

  // Save tasks to localStorage whenever the tasks array changes
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  return (
    <div className="App container mt-4">
      <h1 className="text-center">To-Do List</h1>
      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Add a new task"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <button className="btn btn-primary" onClick={handleAddTask}>
          Add Task
        </button>
      </div>
      <ul className="list-group">
        {tasks.map((task, index) => (
          <TaskItem
            key={index}
            task={task}
            index={index}
            handleToggleCompletion={handleToggleCompletion}
            handleDeleteTask={handleDeleteTask}
            handleEditTask={handleEditTask}
            editingIndex={editingIndex}
            editingText={editingText}
            handleEditChange={handleEditChange}
            handleSaveEdit={handleSaveEdit}
          />
        ))}
      </ul>
    </div>
  );
}

export default App;
