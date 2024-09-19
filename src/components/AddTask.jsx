import React, { useState } from 'react';
import axios from 'axios';

const AddTask = ({ fetchTasks }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleAddTask = async () => {
    try {
      await axios.post('http://localhost:5000/api/tasks/tasks', {
        title,
        description
      }, {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
      });
      setTitle('');
      setDescription('');
      fetchTasks();
    } catch (err) {
      console.error(err);
    }
  };
  

  return (
    <div className="mb-3">
      <input
        type="text"
        className="form-control mb-2"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        className="form-control mb-2"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button className="buttonnor" onClick={handleAddTask}>Add Task</button>
    </div>
  );
};

export default AddTask;
