import { NavLink, Routes, Route } from "react-router-dom";
import Nav from 'react-bootstrap/Nav';
import ShelfSensorLogs from "./Charts/AverageTimeShelf";
import TrialToPurchase from "./Charts/TrialToSales";
import AverageTimeByProduct from "../.trashed/AverageTimeByProduct";
import SalesPieChart from "../.trashed/SalesbyTrials";
import SalesYearReport from "./Charts/SalesYearReport";
import ProductSales from "./Charts/ProductSales";

export const Insights = () => {
  return (
    <div className="container border" style={{ maxWidth: "50%", overflowX: "hidden" }}>
      <div>
        <Nav variant="tabs" className="nav-fill m-2 justify-content-center">

          <Nav.Item>
            <Nav.Link as={NavLink} to="yearly-sales" className={({ isActive }) => (isActive ? "active" : "")}>
              Yearly Sales
            </Nav.Link>
          </Nav.Item>

          <Nav.Item>
            <Nav.Link as={NavLink} to="prod-sales" className={({ isActive }) => (isActive ? "active" : "")}>
              Product Sales
            </Nav.Link>
          </Nav.Item>

          <Nav.Item>
            <Nav.Link as={NavLink} to="avg-time" className={({ isActive }) => (isActive ? "active" : "")}>
              Average Time
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link as={NavLink} to="trial-sales" className={({ isActive }) => (isActive ? "active" : "")}>
              Trial : Sales
            </Nav.Link>
          </Nav.Item>
          
          
          
        </Nav>
      </div>

      <div>
        <Routes>
          <Route
            path="avg-time"
            element={
              <div className="col p-2 flex-grow-1 bg-dark rounded" style={{ maxWidth: "100%" }}>
                <ShelfSensorLogs />
              </div>
            }
          />
          <Route
            path="trial-sales"
            element={
              <div className="col p-2 flex-grow-1 bg-dark rounded" style={{ maxWidth: "100%" }}>
                <TrialToPurchase />
              </div>
            }
          />
          <Route
            path="yearly-sales"
            element={
              <div className="col p-2 flex-grow-1 bg-dark rounded"  style={{ maxWidth: "100%" }} >
                <SalesYearReport  />
              </div>
            }
          />
          <Route
            path="prod-sales"
            element={
              <div className="col p-2 flex-grow-1 bg-dark rounded"  style={{ maxWidth: "100%" }} >
                <ProductSales  />
              </div>
            }
          />
        </Routes>
      </div>
    </div>
  );
};
