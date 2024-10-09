import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import {useJwt} from "react-jwt"

const LoginPage = () => {



  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);


  const navigate = useNavigate();

  const [token, setToken] = useState(localStorage.getItem('jwt') || null);
  const [isAdmin, setIsAdmin] = useState(localStorage.getItem('admin') || false);

    async function JWTDecode() {
    const token = localStorage.getItem("jwt")

    const { decodedToken } = useJwt(token);
    console.log(decodedToken)
}

  const login = async (username, password) => {
    try {
      const response = await fetch('http://localhost:8080/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });
      if (!response.ok) {
        throw new Error('Login failed');
      }
      const jwt = await response.text();
      setToken(jwt);
      localStorage.setItem('jwt', jwt);
      JWTDecode();
      return true;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    const success = await login(username, password);
    if (!success) {
      setError('Invalid username or password');
    } else {

      navigate('/home', { replace: true });
      console.log('Login successful');
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default LoginPage;
