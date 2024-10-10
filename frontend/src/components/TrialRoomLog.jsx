import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Form } from 'react-bootstrap';
import axios from 'axios';
import dayjs from 'dayjs';
import '../App.css';


ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const TrialRoomLog = () => {
  const [trialLogs, setTrialLogs] = useState([]);
  const [filteredLogs, setFilteredLogs] = useState([]);
  const [timeRange, setTimeRange] = useState('1week');
  const [selectedProduct, setSelectedProduct] = useState();

  const fetchLogs = () => {
    axios.get('http://localhost:8080/api/track/trial/all')
      .then(response => {
        setTrialLogs(response.data);
      })
      .catch(error => console.error('Error fetching trial logs:', error));
  };

  useEffect(() => {

    fetchLogs();

   //Real-time update :)
    const intervalId = setInterval(fetchLogs, 60000); 

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {

    let filteredData = filterLogsByTimeRange(trialLogs, timeRange);
    
    if (selectedProduct !== 'All') {
      filteredData = filteredData.filter(log => log.product.name === selectedProduct);
    }
    setFilteredLogs(filteredData);
  }, [timeRange, selectedProduct, trialLogs]);

  const filterLogsByTimeRange = (logs, range) => {
    const now = dayjs();
    let startDate;

    if (range === '1week') {
      startDate = now.subtract(7, 'days');
    } else if (range === '1month') {
      startDate = now.subtract(1, 'month');
    } else {
      return logs;
    }

    return logs.filter(log => dayjs(log.entryTime).isAfter(startDate));
  };

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
    return [...new Set(products)];
  };

  return (
    <div className='container'>
      <div>
        <h2 className='badge text-light fs-4'>TrialRoom Logs</h2>
      </div>
  
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
