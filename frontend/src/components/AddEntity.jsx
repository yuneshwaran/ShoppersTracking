import { NavLink, Routes, Route } from "react-router-dom";
import Nav from 'react-bootstrap/Nav';
import ShelfSensorLogs from "./Charts/ShelfSensorLogs";
import TrialRoomLog from './Charts/TrialRoomLog';
import TrialToPurchase from "./Charts/TrialToSales";
import PurchaseLogs from "./PurchaseLogs";

export const AddEntity = () => {
  return (
    <div className="container border" style={{ maxWidth: "50%", overflowX: "hidden" }}>
      Yet to Add
    </div>
  );
};
