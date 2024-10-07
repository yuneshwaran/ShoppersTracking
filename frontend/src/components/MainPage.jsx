import { NavLink, Route, Routes } from 'react-router-dom';
import Nav from 'react-bootstrap/Nav';
import ShelfSensorLogs from './ShelfSensorLogs';
import TrialRoomLog from './TrialRoomLog';
import TrialToPurchase from './TrialToPurchase';

function MainPage() {
  return (
    <div>
      {/* Nav with NavLinks to navigate between sections */}
      <Nav variant="tabs" defaultActiveKey="/home/shelf">
        <Nav.Item>
          <Nav.Link as={NavLink} to="shelf" activeClassName="active">Shelf Sensor Logs</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link as={NavLink} to="trial" activeClassName="active">Trial Room Crossings</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link as={NavLink} to="ratio" activeClassName="active">Trial to Purchase</Nav.Link>
        </Nav.Item>
      </Nav>

      {/* Routes for the different components */}
      <Routes>
        <Route path="shelf" element={<ShelfSensorLogs />} />
        <Route path="trial" element={<TrialRoomLog />} />
        <Route path="ratio" element={<TrialToPurchase />} />
      </Routes>
    </div>
  );
}

export default MainPage;
