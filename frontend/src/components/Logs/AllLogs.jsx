import { useState ,useEffect } from "react";
import dayjs from "dayjs";
import axios from "axios";

export const ShelfSensorLogs = () => {
    const [shelfLogs, setShelfLogs] = useState([]);
  
    useEffect(() => {
      const fetchShelfLogs = async () => {
        try {
          const token = localStorage.getItem('jwt');
          const response = await axios.get('http://localhost:8080/api/track/shelf/logs', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          setShelfLogs(response.data);
          
        } catch (error) {
          console.error('Error fetching shelf logs:', error);
        }
      };
      
      fetchShelfLogs();
    }, []);
  
    return (
      <div className="log-list-container">
        <h3 className="text-light mb-3">Shelf Logs</h3>
        <div className="table-responsive">
          <table className="table table-dark table-striped">
            <thead>
              <tr>
                <th>Date</th>
                <th>Shelf Name</th>
                <th>Entry Time</th>
                <th>Exit Time</th>
                <th>Duration (mins)</th>
              </tr>
            </thead>
            <tbody>
              {shelfLogs.map((log) => (
                <tr key={log.id}>
                  <td>{dayjs(log.entryTime).format('DD-MM-YYYY')}</td>
                  <td>{log.shelf.name}</td>
                  <td>{dayjs(log.entryTime).format('HH:mm')}</td>
                  <td>{log.exitTime ? dayjs(log.exitTime).format('HH:mm') : 'N/A'}</td>
                  <td>{dayjs(log.exitTime).diff(dayjs(log.entryTime), 'minute')}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };
  
  export const TrialRoomLog = () => {
  
    const [trialRoomLogs, setTrialRoomLogs] = useState([]);
  
    useEffect(() => {
      const fetchTrialRoomLogs = async () => {
        try {
          const token = localStorage.getItem('jwt');
          const response = await axios.get('http://localhost:8080/api/track/trial/all', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setTrialRoomLogs(response.data);
        } catch (error) {
          console.error('Error fetching trial room logs:', error);
        }
      };
      fetchTrialRoomLogs();
    }, []);
  
    return (
      <div className="log-list-container">
        <h3 className="text-light mb-3">Trial Room Logs</h3>
        <div className="table-responsive">
          <table className="table table-dark table-striped">
            <thead>
              <tr>
                <th>Date</th>
                <th>TrialRoom id</th>
                <th>Product Name</th>
                <th>Entry Time</th>
              </tr>
            </thead>
            <tbody>
              {trialRoomLogs.map((log) => (
                <tr key={log.id}>
                  <td>{dayjs(log.entryTime).format('DD-MM-YYYY')}</td>
                  <td>{log.trialRoom.id}</td> 
                  <td>{log.product.name}</td>
                  <td>{dayjs(log.entryTime).format('HH:mm')}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };
  
  export const PurchaseLogs = () => {
    const [purchaseLogs, setPurchaseLogs] = useState([]);
  
    useEffect(() => {
      const fetchPurchaseLogs = async () => {
        try {
          const token = localStorage.getItem('jwt');
          const response = await axios.get('http://localhost:8080/api/track/purchase', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setPurchaseLogs(response.data);
        } catch (error) {
          console.error('Error fetching purchase logs:', error);
        }
      };
      fetchPurchaseLogs();
    }, []);
  
    return (
      <div className="log-list-container">
        <h3 className="text-light mb-3">Purchase Logs</h3>
        <div className="table-responsive">
          <table className="table table-dark table-striped">
            <thead>
              <tr>
                <th>Date</th>
                <th>Product Name</th>
                <th>Quantity</th>
                <th>Total Price</th>
              </tr>
            </thead>
            <tbody>
              {purchaseLogs.map((log) => (
                <tr key={log.id}>
                  <td>{dayjs(log.purchaseDate).format('DD-MM-YYYY')}</td>
                  <td>{log.product.name}</td>
                  <td>{log.quantity}</td>
                  <td>{log.totalPrice}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };
  