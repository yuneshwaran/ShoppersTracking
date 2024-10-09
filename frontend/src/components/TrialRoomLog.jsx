import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Form } from 'react-bootstrap';
import axios from 'axios';
import dayjs from 'dayjs';
import '../App.css';

// Register necessary components for the Bar chart
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const TrialRoomLog = () => {
  const [trialLogs, setTrialLogs] = useState([]);
  const [filteredLogs, setFilteredLogs] = useState([]);
  const [timeRange, setTimeRange] = useState('1week'); 
  const [selectedProduct, setSelectedProduct] = useState('All');

  useEffect(() => {
    // Fetch trial room data from the backend
    axios.get('http://localhost:8080/api/track/trial/all')
      .then(response => {
        setTrialLogs(response.data);
      })
      .catch(error => console.error('Error fetching trial logs:', error));
  }, []);

  useEffect(() => {
    // Filter logs based on time range
    let filteredData = filterLogsByTimeRange(trialLogs, timeRange);
    
    // If a specific product is selected, filter by product as well
    if (selectedProduct !== 'All') {
      filteredData = filteredData.filter(log => log.product.name === selectedProduct);
    }
    setFilteredLogs(filteredData);
  }, [timeRange, selectedProduct, trialLogs]);

  // Function to filter logs based on the time range
  const filterLogsByTimeRange = (logs, range) => {
    const now = dayjs();
    let startDate;

    // Handle time ranges
    if (range === '1week') {
      startDate = now.subtract(7, 'days');
    } else if (range === '1month') {
      startDate = now.subtract(1, 'month');
    } else {
      // Return all logs if 'all' is selected
      return logs;
    }

    return logs.filter(log => dayjs(log.entryTime).isAfter(startDate));
  };

  // Group the data by day (or any other unit)
  const groupLogsByDay = () => {
    const groupedLogs = {};

    filteredLogs.forEach(log => {
      const day = dayjs(log.entryTime).format('YYYY-MM-DD');
      if (!groupedLogs[day]) {
        groupedLogs[day] = 0;
      }
      groupedLogs[day] += 1;
    });

    return groupedLogs;
  };

  // Prepare chart data
  const chartData = () => {
    const groupedLogs = groupLogsByDay();
    const labels = Object.keys(groupedLogs);
    const values = Object.values(groupedLogs);

    return {
      labels,
      datasets: [
        {
          label: 'Number of Entries',
          data: values,
          backgroundColor: 'rgba(54, 162, 235, 0.6)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 1,
        }
      ]
    };
  };

  const getUniqueProducts = () => {
    const products = trialLogs.map(log => log.product.name);
    return ['All', ...new Set(products)];
  };

  return (
    <div className='container'>
      {/* Title */}
      <div>
        <h2 className='badge text-light fs-4'>TrialRoom Logs</h2>
      </div>
  
      {/* Selectors Row */}
      <div className='d-flex align-items-center mb-3'>
        
        {/* Time Range Selector */}
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
  
        {/* Product Selector */}
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
  
      {/* Chart */}
      <div className='row'>
        <Bar
          data={chartData()}
          options={{
            responsive: true,
            scales: {
              x: {
                title: {
                  display: true,
                  text: 'Days'
                }
              },
              y: {
                title: {
                  display: true,
                  text: 'Number of Entries'
                },
                beginAtZero: true,
              }
            },
          }}
        />
      </div>
    </div>
  );
};

export default TrialRoomLog;  
