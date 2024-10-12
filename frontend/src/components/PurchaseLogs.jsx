import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Styles.css'; 
import dayjs from 'dayjs';

const PurchaseLogList = () => {
  const [purchaseLogs, setPurchaseLogs] = useState([]);

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
  

  useEffect(() => {
    fetchPurchaseLogs();

    // Real-Time updates :)
    const intervalId = setInterval(fetchPurchaseLogs, 60000); 
    return () => clearInterval(intervalId);
    
  }, []);

  return (
    <div className='container'>

    <div className="purchase-log-list-container">
      <h3 className="text-light mb-3">Purchase Log</h3>

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
    </div>
  );
};

export default PurchaseLogList;
