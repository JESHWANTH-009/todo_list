import React from 'react';

function TaskItem({
  task,
  index,
  handleToggleCompletion,
  handleDeleteTask,
  handleEditTask,
  editingIndex,
  editingText,
  handleEditChange,
  handleSaveEdit
}) {
  return (
    <li
      className={`list-group-item d-flex justify-content-between align-items-center ${
        task.completed ? 'list-group-item-success' : ''
      }`}
    >
      {editingIndex === index ? (
        <>
          <input
            type="text"
            value={editingText}
            onChange={handleEditChange}
            className="form-control me-2"
          />
          <button className="btn btn-success btn-sm" onClick={handleSaveEdit}>
            Save
          </button>
        </>
      ) : (
        <>
          <span
            style={{ textDecoration: task.completed ? 'line-through' : 'none', cursor: 'pointer' }}
            onClick={() => handleToggleCompletion(index)}
          >
            {task.text}
          </span>
          <div>
            <button
              className="btn btn-warning btn-sm me-2"
              onClick={() => handleEditTask(index)}
            >
              Edit
            </button>
            <button
              className="btn btn-danger btn-sm"
              onClick={() => handleDeleteTask(index)}
            >
              Delete
            </button>
          </div>
        </>
      )}
    </li>
  );
}

export default TaskItem;
