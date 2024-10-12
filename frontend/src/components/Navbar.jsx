import React from 'react';
import { useLogin } from '../utils/LoginContext';
import { useNavigate } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import { Navbar, Nav, Button ,NavDropdown } from 'react-bootstrap';

const NavBar = () => {
  const { logout, isLoggedIn } = useLogin();
  const navigate = useNavigate();

  const handleLogout = () => {

    const confirm = window.confirm("  You will be logged out\nDo you want to continue?");
    if(confirm){
      logout();
    navigate('/');
    } 
  };

  return (
    <Navbar expand="sm" bg="light" className="shadow mx-2" style={{color: 'black'}}>
      <Navbar.Brand href="/" className="fs-4 badge bg-dark text-light">Shoppers Tracker</Navbar.Brand>
      <Navbar.Toggle aria-controls="navbar-nav" />
      <Navbar.Collapse id="navbar-nav">
        <Nav className="me-auto ">

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
                <Nav.Link as={NavLink} to="/logs" className={({ isActive }) => isActive ? 'active' : ''}>
                  Logs
                </Nav.Link>
              </Nav.Item>
              <NavDropdown title="Dropdown" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item>
            </NavDropdown>
            </>
          )}
        </Nav>
        {isLoggedIn() ? (
          <Button onClick={handleLogout} variant="danger">
            Logout
          </Button>
        ) : (
          <Button onClick={() => navigate('/login')} variant="primary">
            Login
          </Button>
        )}
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavBar;
