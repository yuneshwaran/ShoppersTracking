import React, { useState } from 'react';
import { useLogin } from './LoginContext';
import {jwtDecode} from 'jwt-decode'; 
import { useNavigate } from 'react-router-dom';
import { Modal, Button, Form, Alert } from 'react-bootstrap';


export const AddUser=({ showModal, handleClose })=>{

const [newUsername , setNewUserName] = useState('');
const [NewPassword,setNewPassword] = useState('');
const [role,setRole] = useState('user');
const [error,setError] = useState(null);

const validate =(value)=>{
  setNewUserName(value.trim())
}


const handleSubmit = async(e) =>{
  e.preventDefault();

  try{
      const token = localStorage.getItem('jwt');
      const body = JSON.stringify({username : newUsername,password : NewPassword})
      const response = await fetch('http://localhost:8080/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body,
      });
      
      //alerts
      if (response.ok) {
        alert('User added successfully');
        handleClose();
      } else {
        alert('Failed to add user');
      }
    
  }catch(e){
    console.log('Exception',e)
  }

      

  // console.log(response);
  // if(response.ok){
  //   alert("User added successfully")
  //   handleClose();
  // }

}

  return (
    <Modal show={showModal} onHide={handleClose}>
    <Modal.Header closeButton>
      <Modal.Title>New User</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <Form onSubmit={handleSubmit}>

        <Form.Group>
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            value={newUsername}
            onChange={(e)=>{validate(e.target.value)}}
            required
          />
        </Form.Group>


        <Form.Group controlId="newPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            value={NewPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
          <br/>
        </Form.Group>
        {error && <Alert variant="danger">{error}</Alert>}
        <Button type="submit" variant="primary" className="w-100">Add User</Button>
      </Form>
    </Modal.Body>
  </Modal>
  )
}




export const UpdatePassword  =({ showModal, handleClose })=> {
  
  const navigate = useNavigate();
  const [password, setPassword] = useState(''); 
  const [newPassword, setNewPassword] = useState('');
  const [error, setError] = useState(null);
  const { token, logout } = useLogin(); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!newPassword) {
      setError('Please confirm your new password.');
      return;
    }

    if (password !== newPassword) {
      setError('New password and confirmation do not match.');
      return;
    }

    try {
      const decodedToken = jwtDecode(token);
      const user = decodedToken.sub;
      const body = JSON.stringify({ username: user, password: newPassword }); 

      const response = await fetch('http://localhost:8080/login', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body,
      });


      if (!response.ok) throw new Error('Password update failed');

      alert('Password updated successfully. Please login again.');
      handleLogout();
      handleClose(); 
    } catch (error) {
      console.error('Error:', error);
      setError('Password update failed. Please check your credentials or connection.');
    } finally {

      setPassword(''); 
      setNewPassword('');
    }
  };

  const handleLogout = () => {
    if (window.confirm("You will be logged out\nDo you want to continue?")) {
      logout();
      navigate('/');
    }
  };

  return (
    <Modal show={showModal} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Update Password</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="password">
            <Form.Label>New Password</Form.Label>
            <Form.Control
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group controlId="newPassword">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
          </Form.Group>
          <br/>
          {error && <Alert variant="danger">{error}</Alert>}
          <Button type="submit" variant="primary" className="w-100">Update Password</Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};






