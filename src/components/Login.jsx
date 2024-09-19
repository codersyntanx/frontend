import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { message } from 'antd';

const Login = ({ setIsAuthenticated }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const history = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post('http://localhost:5000/auth/login', {
        username,
        password
      });
      localStorage.setItem('token', res.data.token);
      setIsAuthenticated(true);
      message.success("Your are Sucessfully logedin ")

      history('/');
    } catch (err) {
      console.error(err);
      message.error("Invalid credentials ")

    }
  };

  return (
    <div className="container mt-4">
      <h3>Login</h3>
      <form onSubmit={handleLogin}>
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
          <button type="submit" className="buttonnor">Login</button>
        </div>
      </form>
    </div>
  );
};

export default Login;
