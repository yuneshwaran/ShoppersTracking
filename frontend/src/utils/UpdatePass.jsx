import React, { useState } from 'react';
import { useLogin } from './LoginContext';
import {jwtDecode} from 'jwt-decode'; 
import { useNavigate } from 'react-router-dom';

const Password = ({ showModal, handleClose }) => {

const navigate = useNavigate();
  const [password, setPassword] = useState(''); 
  const [newPassword, setNewPassword] = useState('');
  const [error, setError] = useState(null);
  const { token,logout } = useLogin(); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      // Validate that newPassword is not empty and matches the password
      if (newPassword === '') {
        setError('Please confirm your new password.');
        return;
      }

      if (password !== newPassword) {
        setError('New password and confirmation do not match.');
        return;
      }

      const decodedToken = jwtDecode(token);
      const user = decodedToken.sub;
      console.log(user);
      const endpoint = 'http://localhost:8080/login';

      const body = JSON.stringify({
        username: `${user}`,
        password: `${newPassword}`
      }); 

      const response = await fetch(endpoint, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: body
      });

      if (!response.ok) throw new Error('Password update failed');

      alert('Password updated successfully. Please login again.');
      handleClose(); 
      handleLogout();
      setPassword(''); 
      setNewPassword('');
    } catch (error) {
      console.error('Error:', error);
      setError('Password update failed. Please check your credentials or connection.');
    }
  };

  const handleLogout = () => {
    const confirm = window.confirm("You will be logged out\nDo you want to continue?");
    if (confirm) {
      logout();
      navigate('/');
    }
  };

  return (
    <div className={`modal fade ${showModal ? 'show' : ''}`} style={{ display: showModal ? 'block' : 'none' }} tabIndex="-1" aria-labelledby="loginModalLabel" aria-hidden={!showModal}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="loginModalLabel">Update Password</h5>
            <button type="button" className="btn-close" onClick={handleClose} aria-label="Close"></button>
          </div>
          <div className="modal-body">
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="password" className="form-label">New Password</label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="newPassword" className="form-label">Confirm Password</label>
                <input
                  type="password"
                  className="form-control"
                  id="newPassword"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                />
              </div>

              {error && <div className="alert alert-danger" role="alert">{error}</div>}

              <button type="submit" className="btn btn-primary w-100" >Update Password</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Password;
