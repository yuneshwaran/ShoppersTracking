import { NavLink, Routes, Route } from "react-router-dom";
import Nav from 'react-bootstrap/Nav';
import ShelfSensorLogs from "./Charts/ShelfSensorLogs";
import TrialToPurchase from "./Charts/TrialToSales";
import AverageTimeByProduct from "./Charts/AverageTimeByProduct";
import SalesPieChart from "./Charts/SalesbyTrials";

export const Insights = () => {
  return (
    <div className="container border" style={{ maxWidth: "50%", overflowX: "hidden" }}>
      <div>
        <Nav variant="tabs" className="nav-fill m-2 justify-content-center">
          <Nav.Item>
            <Nav.Link as={NavLink} to="shelf" className={({ isActive }) => (isActive ? "active" : "")}>
              Shelf Sensor Logs
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link as={NavLink} to="avg-time" className={({ isActive }) => (isActive ? "active" : "")}>
              Average Time/Product
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link as={NavLink} to="ratio" className={({ isActive }) => (isActive ? "active" : "")}>
              Trial : Sales
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link as={NavLink} to="salestrials" className={({ isActive }) => (isActive ? "active" : "")}>
              Sales/Trials
            </Nav.Link>
          </Nav.Item>
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
            path="ratio"
            element={
              <div className="col p-2 flex-grow-1 bg-dark rounded" style={{ maxWidth: "100%" }}>
                <TrialToPurchase />
              </div>
            }
          />
          <Route
            path="avg-time"
            element={
              <div className="col p-2 flex-grow-1 bg-dark rounded" style={{ maxWidth: "100%" }}>
                <AverageTimeByProduct />
              </div>
            }
          />
          <Route
            path="salestrials"
            element={
              <div className="col p-2 flex-grow-1 bg-dark rounded"  style={{ maxWidth: "100%" }} >
                <SalesPieChart  />
              </div>
            }
          />
        </Routes>
      </div>
    </div>
  );
};
