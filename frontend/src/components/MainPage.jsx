import Nav from 'react-bootstrap/Nav';

function MainPage() {
  return (
    <Nav variant="tabs" defaultActiveKey="/home">
      <Nav.Item>
        <Nav.Link href="/shelf">Shelf Sensor Logs</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link href="/trial">Trial Room Crossings</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link href="/main" >
          Disabled
        </Nav.Link>
      </Nav.Item>
    </Nav>
  );
}

export default MainPage;