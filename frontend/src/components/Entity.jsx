import { NavLink, Routes, Route } from "react-router-dom";
import Nav from 'react-bootstrap/Nav';
import { Shelves, HangerSensor } from "./Entities/Entities";
import Products from './Entities/Products';
import './Styles.css';


const Entity = () => {

    return (
      <div className="container border" style={{ maxWidth: '50%', overflowX: 'hidden' }}>
        <div>
          <Nav variant="tabs" className="flex-grow-1 justify-content-between m-2" defaultActiveKey="/entity/*">
            <Nav.Item>
              <Nav.Link as={NavLink} to="shelf" className={({ isActive }) => (isActive ? 'active' : '')}>
                Shelves
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link as={NavLink} to="product" className={({ isActive }) => (isActive ? 'active' : '')}>
                Products
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link as={NavLink} to="hanger" className={({ isActive }) => (isActive ? 'active' : '')}>
                Hanger Sensors
              </Nav.Link>
            </Nav.Item>

          </Nav>
          
        </div>
  
        <div>
          <Routes>
            <Route
              path="shelf"
              element={
                <div className="col p-2 flex-grow-1 bg-dark rounded" style={{ maxWidth: '100%' }}>
                  <Shelves />
                </div>
              }
            />
            <Route
              path="product"
              element={
                <div className="col p-2 flex-grow-1 bg-dark rounded" style={{ maxWidth: '100%' }}>
                  <Products/>
                </div>
              }
            />
            <Route
              path="hanger"
              element={
                <div className="col p-2 flex-grow-1 bg-dark rounded" style={{ maxWidth: '100%' }}>
                  <HangerSensor />
                </div>
              }
            />
          </Routes>
        </div>
      </div>
    );
  };
  
  export default Entity;


