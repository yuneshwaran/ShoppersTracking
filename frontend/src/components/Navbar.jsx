import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import axiosInstance from '../utils/axiosInstance';
import {removeToken} from '../utils/jwt'

function NavBar() {

  const handleLogout = async () => {
    try {
      await axiosInstance.post('/logout'); // Call the logout endpoint
      removeToken(); // Remove the token from local storage
      // Optionally, redirect the user to the login page or update the UI
      window.location.href = '/login'; // Redirect to login page
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };


  return (
    <Navbar expand="lg" className="bg-body-tertiary blue">
      <Container>
        <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/home">Home</Nav.Link>
            <Nav.Link href="#link">Link</Nav.Link>
            <NavDropdown title="Dropdown" id="basic-nav-dropdown">
              <NavDropdown.Item href="/inventory">Inventory</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="/add-user">
                Add Users
              </NavDropdown.Item>
            </NavDropdown>
            <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;