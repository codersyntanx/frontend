import React, { useState } from 'react';
import axios from 'axios';
import { useHistory, useNavigate } from 'react-router-dom';
import { message } from 'antd';

const Signup = ({ setIsAuthenticated }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const history = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      await axios.post('http://localhost:5000/auth/signup', {
        username,
        password
      });
      const res = await axios.post('http://localhost:5000/auth/login', {
        username,
        password
      });
      localStorage.setItem('token', res.data.token);
      setIsAuthenticated(true);
      message.success("user is been created successfully")
      history('/');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="container mt-4">
      <h3>Signup</h3>
      <form onSubmit={handleSignup}>
        <div className="form-group">
          <input
            type="text"
            className="form-control mb-2"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            type="password"
            className="form-control mb-2"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" className="btn btn-primary">Signup</button>
        </div>
      </form>
    </div>
  );
};

export default Signup;
