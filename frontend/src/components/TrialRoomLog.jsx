import React, { useState, useEffect, useCallback } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Form } from 'react-bootstrap';
import axios from 'axios';
import dayjs from 'dayjs';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const TrialRoomLog = () => {
  
  const [trialLogs, setTrialLogs] = useState([]);
  const [timeRange, setTimeRange] = useState('1week');
  const [selectedProduct, setSelectedProduct] = useState('All');
  const token = localStorage.getItem('jwt');

  const fetchLogs = useCallback(() => {
    axios.get('http://localhost:8080/api/track/trial/all', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(response => setTrialLogs(response.data))
      .catch(error => console.error('Error fetching trial logs:', error));
  }, [token]);

  useEffect(() => {
    fetchLogs();
    const intervalId = setInterval(fetchLogs, 60000);
    return () => clearInterval(intervalId);
  }, [fetchLogs]);

  const getFilteredLogs = () => {
    const now = dayjs();
    let startDate = timeRange === '1week' ? now.subtract(7, 'days') : now.subtract(1, 'month');

    return trialLogs
      .filter(log => timeRange === 'all' || dayjs(log.entryTime).isAfter(startDate))
      .filter(log => selectedProduct === 'All' || log.product.name === selectedProduct);
  };

  const groupLogsByDay = () => {
    const grouped = getFilteredLogs().reduce((acc, log) => {
      const day = dayjs(log.entryTime).format('YYYY-MM-DD');
      acc[day] = (acc[day] || 0) + 1;
      return acc;
    }, {});

    return {
      labels: Object.keys(grouped),
      datasets: [
        {
          label: 'Number of Entries',
          data: Object.values(grouped),
          backgroundColor: 'rgba(54, 162, 235, 0.6)',
          borderColor: 'rgba(54, 162, 235, 1)',
        }
      ]
    };
  };

  const getUniqueProducts = () => {
    const products = trialLogs.map(log => log.product.name);
    return ['All', ...new Set(products)];
  };

  return (
    <div className="container">
      <h2 className="badge text-light fs-4">Trial Room Logs</h2>

      <div className='d-flex align-items-center mb-3'>
        <div className='container align-items-center'>
          <div className='text-light'>Time Frame</div>
          <Form.Select
            className='me-2'
            aria-label="Select Time Range"
            onChange={(e) => setTimeRange(e.target.value)}
            value={timeRange}
          >
            <option value="1week">Last 1 Week</option>
            <option value="1month">Last 1 Month</option>
            <option value="all">All Time</option>
          </Form.Select>
        </div>

        <div className='container align-items-center'>
          <div className='text-light'>Product</div>
          <Form.Select
            className='me-2'
            aria-label="Select Product"
            onChange={(e) => setSelectedProduct(e.target.value)}
            value={selectedProduct}
          >
            {getUniqueProducts().map(product => (
              <option key={product} value={product}>{product}</option>
            ))}
          </Form.Select>
        </div>
      </div>

      <Bar
        data={groupLogsByDay()}
        options={{
          responsive: true,
          scales: {
            x: { title: { display: true, text: 'Days' } },
            y: { title: { display: true, text: 'Number of Entries' }, beginAtZero: true }
          }
        }}
      />
    </div>
  );
};

export default TrialRoomLog;
