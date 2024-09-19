import React, { useState } from 'react';
import {  Routes, Route,  } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import TaskList from './components/TaskList.jsx';
import AddTask from './components/AddTask';
import EditTask from './components/EditTask';
import Login from './components/Login';
import Signup from './components/Signup.jsx';
import Tabs from './components/Tabs';
import "./App.css"
const App = () => {
  const [filter, setFilter] = useState('all');
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'));

  return (
    <div className="container">
              <Navbar isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />
              <Tabs setFilter={setFilter} filter={filter}/>

    <Routes>
          
          <Route path='/' element={isAuthenticated ? <TaskList filter={filter} /> : <Login setIsAuthenticated={setIsAuthenticated} />}/>
          <Route path="/signup" element={<Signup setIsAuthenticated={setIsAuthenticated} />} />
          <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />}/>  
          
    </Routes>
    </div>
  );
};

export default App;
