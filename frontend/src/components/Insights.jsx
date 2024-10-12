import { NavLink, Routes, Route } from "react-router-dom";
import Nav from 'react-bootstrap/Nav';
import ShelfSensorLogs from "./Charts/ShelfSensorLogs";
import TrialRoomLog from './Charts/TrialRoomLog';
import TrialToPurchase from "./Charts/TrialToSales";

export const Insights = () => {
  return (
    <div className="container border" style={{ maxWidth: "50%", overflowX: "hidden" }}>
      <div>
        
      <Nav variant="tabs" className="nav-fill m-2" defaultActiveKey="/chart/*">
        <Nav.Item>
          <Nav.Link as={NavLink} to="shelf" className={({ isActive }) => (isActive ? "active" : "")}>
            Shelf Sensor Logs
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link as={NavLink} to="ratio" className={({ isActive }) => (isActive ? "active" : "")}>
            Trial : Sales
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link as={NavLink} to="trial" className={({ isActive }) => (isActive ? "active" : "")}>
            Trial Room Crossings
          </Nav.Link>
        </Nav.Item>

        {/* <Nav.Item>
          <Nav.Link as={NavLink} to="purchase" className={({ isActive }) => (isActive ? "active" : "")}>
            Purchase Logs
          </Nav.Link>
        </Nav.Item> */}
      </Nav>
    </div>

      <div>
        <Routes>
          <Route
            path="shelf"
            element={
              <div className="col p-2 flex-grow-1 bg-dark rounded" style={{ maxWidth: "100%" }}>
                <ShelfSensorLogs />
              </div>
            }
          />
          <Route
            path="trial"
            element={
              <div className="col p-2 flex-grow-1 bg-dark rounded" style={{ maxWidth: "100%" }}>
                <TrialRoomLog />
              </div>
            }
          />
          <Route
            path="ratio"
            element={
              <div className="col p-2 flex-grow-1 bg-dark rounded" style={{ maxWidth: "100%" }}>
                <TrialToPurchase />
              </div>
            }
          />
        </Routes>
      </div>
    </div>
  );
};
