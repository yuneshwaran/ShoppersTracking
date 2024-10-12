import React from 'react';
import { useLogin } from '../utils/LoginContext';
import { useNavigate,NavLink } from 'react-router-dom';
import { useState } from 'react';
import { Navbar, Nav, Button, NavDropdown } from 'react-bootstrap';
import Password from '../utils/UpdatePass';

const NavBar = () => {
  const { logout, isLoggedIn, admin } = useLogin();
  const navigate = useNavigate();


  const [showModal, setShowModal] = useState(false);  
 
  const handleShow = () => setShowModal(true);
 
  const handleClose = () => setShowModal(false);

  const handleLogout = () => {
    const confirm = window.confirm("You will be logged out\nDo you want to continue?");
    if (confirm) {
      logout();
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
              <Nav.Item>
                <Nav.Link as={NavLink} to="/insights/shelf" className={({ isActive }) => isActive ? 'active' : ''}>
                  Insights
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link as={NavLink} to="/inventory" className={({ isActive }) => isActive ? 'active' : ''}>
                  Inventory
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link as={NavLink} to="/logs/shelf" className={({ isActive }) => isActive ? 'active' : ''}>
                  Logs
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link className={({ isActive }) => isActive ? 'active' : ''} onClick={handleShow}>
                  Update Password
                </Nav.Link>
              </Nav.Item>

              {admin && (
                <NavDropdown title="Admin Actions" id="basic-nav-dropdown">
                  <NavDropdown.Item href="/add/product">Add Product</NavDropdown.Item>
                  <NavDropdown.Item href="/add/product">Add Brand</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="/add/user">Add User</NavDropdown.Item>
                  <NavDropdown.Item onClick={handleShow}>Update Password</NavDropdown.Item>
                </NavDropdown>
                
              )}
              <Password showModal={showModal} handleClose={handleClose} />
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
        <Password showModal={showModal} handleClose={handleClose} />
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavBar;
