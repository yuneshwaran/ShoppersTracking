import React from 'react';
import { useLogin } from '../utils/LoginContext';
import { useNavigate,NavLink } from 'react-router-dom';
import { useState } from 'react';
import { Navbar, Nav, Button, NavDropdown } from 'react-bootstrap';
import { AddUser, UpdatePassword} from '../utils/Modals';

import entity from '../assets/icons/entity.png'
import inventory from '../assets/icons/inventory.png'
import chart from '../assets/icons/chart.png';
import logs from '../assets/icons/logs.png'

const NavBar = () => {
  const { logout, isLoggedIn ,admin} = useLogin();
  const isAdmin = localStorage.getItem('admin');
  const navigate = useNavigate();


  const [showModal, setShowModal] = useState(false);  
  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  const [showAddUser, setShowAddUser] = useState(false);  
  const handleAddUserShow = () => setShowAddUser(true);
  const handleAddUserClose = () => setShowAddUser(false);

  const handleLogout = () => {
    console.log(admin);
    const confirm = window.confirm("You will be logged out\nDo you want to continue?");
    if (confirm) {
      logout();
      alert("Logout Successful!!!")
      navigate('/');
    }
  };

  return (
    <Navbar expand="sm" bg="light" className="shadow mx-2" style={{ color: 'black' }}>
      <Navbar.Brand href="/" className="fs-4 badge bg-dark text-light">Shoppers Tracker</Navbar.Brand>
      
      <Navbar.Toggle aria-controls="navbar-nav" />
      <Navbar.Collapse id="navbar-nav">
        <Nav className="me-auto">

          {isLoggedIn() && (
            <>
              <Nav.Item className='border '>
                <Nav.Link as={NavLink} to="/insights/shelf" className={({ isActive }) => isActive ? 'active' : ''}>
                  <img style={{ maxWidth: '25px',marginRight:'2px'}} src={chart}/>
                  Insights
                </Nav.Link>
              </Nav.Item>
              <Nav.Item className='border'>
                <Nav.Link as={NavLink} to="/inventory" className={({ isActive }) => isActive ? 'active' : ''}>
                  <img style={{ maxWidth: '25px',marginRight:'2px'}} src={inventory}/>
                  Inventory
                </Nav.Link>
              </Nav.Item>
              <Nav.Item className='border'>
                <Nav.Link as={NavLink} to="/logs/shelf" className={({ isActive }) => isActive ? 'active' : ''}>
                <img style={{ maxWidth: '25px',marginRight:'2px'}} src={logs}/>
                  Live Updates
                </Nav.Link>
              </Nav.Item>
              <Nav.Item className='border'>
                <Nav.Link as={NavLink} to="/entity/shelf" className={({ isActive }) => (isActive ? 'active' : '')} >
                <img style={{ maxWidth: '25px',marginRight:'2px'}} src={entity}/>
                  Entities
                </Nav.Link>
              </Nav.Item>
                <NavDropdown title="User Actions" id="basic-nav-dropdown" >
                  <NavDropdown.Item className={isAdmin?'':'disabled'} href="/add/product">Add Product</NavDropdown.Item>
                  <NavDropdown.Item className={isAdmin?'':'disabled'} href="/add/product">Add Brand</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item className={isAdmin?'':'disabled'} onClick={handleAddUserShow}>Add User</NavDropdown.Item>
                  <NavDropdown.Item  onClick={handleShow}>Update Password</NavDropdown.Item>
                </NavDropdown>
                
              <AddUser showModal={showAddUser} handleClose={handleAddUserClose} />

              <UpdatePassword showModal={showModal} handleClose={handleClose} />
            </>
          )}
        </Nav>

        {isLoggedIn() ? (
          <Button onClick={handleLogout} variant="danger" >
            Logout
          </Button>
        ) : (
          <Button onClick={() => navigate('/login')} variant="primary" >
            Login
          </Button>
        )}

      </Navbar.Collapse>
    </Navbar>
  );
};
export default NavBar;