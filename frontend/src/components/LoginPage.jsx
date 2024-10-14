import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLogin } from '../utils/LoginContext';
import { FaArrowLeft } from "react-icons/fa";
import './Styles.css'; 

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { login } = useLogin();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await fetch('http://localhost:8080/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) throw new Error('Login failed');

      const jwt = await response.text();
      login(jwt);
      alert("Login Successful!!!")
      navigate('/', { replace: true });
    } catch (error) {
      console.error('Login error:', error);
      setError('Invalid username or password');
    }
  };

  return (
    <div className="container-fluid d-flex justify-content-center align-items-center vh-100 bg-dark">
      <div className="background-blur"></div>
      <div className="card p-4" style={{ width: '400px' }}>
        <button className='btn me-auto' onClick={() => navigate('/')}><FaArrowLeft /></button>
        <h2 className="text-center mb-4">Welcome Back</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group mb-3">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              className="form-control"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="form-group mb-3">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              className="form-control"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {error && <div className="alert alert-danger" role="alert">{error}</div>}
          <button type="submit" className="btn btn-primary w-100">Sign-in</button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
