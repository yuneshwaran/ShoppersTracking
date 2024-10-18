import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { Form } from 'react-bootstrap';
import dayjs from 'dayjs';
import axios from 'axios';
import {Chart, registerables} from 'chart.js';

Chart.register(...registerables);

const ShelfSensorLogs = () => {
  const [logs, setLogs] = useState([]);
  const [timeRange, setTimeRange] = useState('1');
  const [selectedShelf, setSelectedShelf] = useState('');
  const [shelves, setShelves] = useState([]);

  useEffect(() => {
    const fetchLogs = async () => {
      console.log('shelf log fetched')
      try {
        const token = localStorage.getItem('jwt');
        const response = await axios.get('http://localhost:8080/api/track/shelf/logs', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setLogs(response.data);

        const uniqueShelves = [...new Set(response.data.map(log => log.shelf.id))]
          .map(id => response.data.find(log => log.shelf.id === id).shelf);

        setShelves(uniqueShelves);
        if (!selectedShelf && uniqueShelves.length > 0) {
          setSelectedShelf(uniqueShelves[0].id);
        }
      } catch (error) {
        console.error('Error fetching shelf logs:', error);
      }
    };
    fetchLogs();

    const intervalId = setInterval(fetchLogs, 10000); 
    return () => clearInterval(intervalId);

  }, [selectedShelf]);

  const filteredLogs = logs
    .filter(log => log.shelf.id === selectedShelf)
    .filter(log => {
      const now = dayjs();
      const entryDate = dayjs(log.entryTime);
      return entryDate.isAfter(now.subtract(timeRange, 'month'));
    })
    .sort((a, b) => new Date(a.entryTime) - new Date(b.entryTime)); 

  const aggregatedData = filteredLogs.reduce((acc, log) => {
    const date = dayjs(log.entryTime).format('YYYY-MM-DD');
    const duration = dayjs(log.exitTime).diff(dayjs(log.entryTime), 'minute');
    
    if (!acc[date]) {
      acc[date] = duration;
    } else {
      acc[date] += duration;
    }
    return acc;
  }, {});

  const chartData = {
    labels: Object.keys(aggregatedData),
    datasets: [
      {
        label: 'Total Duration (minutes)',
        data: Object.values(aggregatedData),
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
      },
    ],
  };

  return (
    <div className="container">
      <h2 className="badge text-light fs-4">Shelf Sensor Logs</h2>

      <div className="d-flex align-items-center mb-3">
        <div className="container">
          <div className="text-light">Shelf</div>
          <Form.Select
            className="me-2"
            onChange={(e) => setSelectedShelf(Number(e.target.value))}
            value={selectedShelf}
          >
            {shelves.map(shelf => (
              <option key={shelf.id} value={shelf.id}>{shelf.name}</option>
            ))}
          </Form.Select>
        </div>

        <div className="container">
          <div className="text-light">Time Range</div>
          <Form.Select
            onChange={(e) => setTimeRange(e.target.value)}
            value={timeRange}
          >
            <option value='1'>Last 1 Month</option>
            <option value="3">Last 3 Months</option>
            <option value="6">Last 6 Months</option>
          </Form.Select>
        </div>
      </div>

      <div className="row">
        <Line data={chartData} />
      </div>
    </div>
  );
};

export default ShelfSensorLogs;