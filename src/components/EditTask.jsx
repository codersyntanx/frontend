import React, { useState } from 'react';
import axios from 'axios';
import { Modal } from 'antd';

const EditTask = ({ task, onTaskUpdated, open, setOpen }) => {
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);
  const [completed, setCompleted] = useState(task.completed);

  const handleUpdateTask = async () => {
    try {
      await axios.put(
        `http://localhost:5000/api/tasks/${task._id}`,
        {
          title,
          description,
          completed
        },
        {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        }
      );
      onTaskUpdated();
    } catch (err) {
      console.error(err);
      onTaskUpdated();
    } finally {
      onTaskUpdated();
    }
  };


  return (
    <Modal
      open={open}
      closeIcon={false}
      footer={null}
      >
      <div className="mb-3">
        <input
          type="text"
          className="form-control mb-2"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          className="form-control mb-2"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <div className="form-check">
          <input
            type="checkbox"
            className="form-check-input"
            checked={completed}
            onChange={(e) => setCompleted(e.target.checked)}
          />
          <label className="form-check-label">Completed</label>
        </div>
        <div className='d-flex justify-content-end gap-3 align-items-center'>
            <div className='' onClick={() => {
          setOpen(false);
          onTaskUpdated();
        }}>Cancel</div>
        <button className="buttonnor" onClick={handleUpdateTask}>Update Task</button>
        </div>
      
      </div>
    </Modal>

  );
};

export default EditTask;
