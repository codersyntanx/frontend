import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AddTask from './AddTask';
import EditTask from './EditTask';
import { Spin, Modal, message } from 'antd'; // Import Modal from antd

const TaskList = ({ filter }) => {
  const [tasks, setTasks] = useState([]);
  const [taskToEdit, setTaskToEdit] = useState(null);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [deleting, setDeleting] = useState(false); 

  const fetchTasks = async () => {
    setLoading(true);
    try {
      const res = await axios.get('http://localhost:5000/api/tasks/tasks', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      let filteredTasks = res.data;

      if (filter === 'completed') {
        filteredTasks = res.data.filter(task => task.completed);
      } else if (filter === 'uncompleted') {
        filteredTasks = res.data.filter(task => !task.completed);
      }

      setTasks(filteredTasks);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [filter]);

  const handleEditClick = (task) => {
    setTaskToEdit(task);
    setOpen(true);
  };

  const handleTaskUpdated = () => {
    setTaskToEdit(null);
    fetchTasks();
  };

  const handleDeleteTask = async (taskId) => {
    setDeleting(true);
    try {
      await axios.delete(`http://localhost:5000/api/tasks/${taskId}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      fetchTasks();
      message.success("Items is deleted")

    } catch (err) {
      console.error(err);
      message.error("something went wrong")
    } finally {
      setDeleting(false);
    }
  };

  const confirmDelete = (taskId) => {
    Modal.confirm({
      title: 'Are you sure you want to delete this task?',
      content: 'This action cannot be undone.',
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk: () => handleDeleteTask(taskId),
    });
  };

  return (
    <div>
      <AddTask fetchTasks={fetchTasks} />
      {taskToEdit && <EditTask open={open} setOpen={setOpen} task={taskToEdit} onTaskUpdated={handleTaskUpdated} />}
      <div className="list-groups d-flex gap-3 mt-3">
        {
          loading ? (
            <div className='container mt-4 d-flex justify-content-center'>
              <Spin tip="Loading" size="large" />
            </div>
          ) : (
            <>
              {tasks.map(task => (
                <div key={task._id} className="listitem">
                  <div className='d-flex align-items-center justify-content-between'>
                    <h5>{task.title}</h5>
                    <div className='d-flex gap-2'>
                      <div onClick={() => handleEditClick(task)}>
                        <i className="fa-regular fa-pen-to-square"></i>
                      </div>
                      <div onClick={() => confirmDelete(task._id)}>
                        <i className="fa-solid fa-trash-can"></i>
                      </div>
                    </div>
                  </div>
                  <p>{task.description}</p>
                  <small><i className="fa-solid fa-calendar"></i> {new Date(task.createdAt).toLocaleString()}</small>
                </div>
              ))}
            </>
          )
          
        }
      </div>
    </div>
  );
};

export default TaskList;
