import React, { useState, useEffect } from 'react';
import axiosInstance from '../utils/axiosInstance';
import { Line } from 'react-chartjs-2';
import { Form } from 'react-bootstrap';
import dayjs from 'dayjs';
import '../App.css';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  TimeScale, // Added TimeScale for time on x-axis
} from 'chart.js';

// Register the scales and elements
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  TimeScale // Register TimeScale for time-based x-axis
);

const ShelfSensorLogs = () => {

  const moment = require('moment');
  const [logs, setLogs] = useState([]);
  const [filteredLogs, setFilteredLogs] = useState([]);
  const [timeRange, setTimeRange] = useState('1m');
  const [selectedShelf, setSelectedShelf] = useState(''); // State for selected shelf
  const [shelves, setShelves] = useState([]); // State to hold unique shelves

  // Fetch all logs on component mount
  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const response = await axiosInstance.get('/api/track/shelf/logs');
        setLogs(response.data);
        
        // Extract unique shelves from the logs
        const uniqueShelves = Array.from(new Set(response.data.map(log => log.shelf.id))) // Extract unique shelf IDs
          .map(id => response.data.find(log => log.shelf.id === id).shelf); // Map the unique IDs back to the shelf objects

        setShelves(uniqueShelves);
        if (uniqueShelves.length > 0) {
          setSelectedShelf(uniqueShelves[0].id); // Default to the first unique shelf
        }
      } catch (error) {
        console.error('Failed to fetch shelf logs:', error);
      }
    };
    fetchLogs();
  }, []);

  // Filter logs by time range and selected shelf
  useEffect(() => {
    const now = dayjs();
    let filteredData = logs.filter(log => log.shelf.id === selectedShelf); // Filter by selected shelf

    switch (timeRange) {
      case '1m':
        filteredData = filteredData.filter(log => dayjs(log.entryTime).isAfter(now.subtract(1, 'month')));
        break;
      case '3m':
        filteredData = filteredData.filter(log => dayjs(log.entryTime).isAfter(now.subtract(3, 'months')));
        break;
      case '6m':
        filteredData = filteredData.filter(log => dayjs(log.entryTime).isAfter(now.subtract(6, 'months')));
        break;
      case 'ytd':
        filteredData = filteredData.filter(log => dayjs(log.entryTime).isAfter(now.startOf('year')));
        break;
      default:
        filteredData = filteredData;
    }

    setFilteredLogs(filteredData);
  }, [logs, timeRange, selectedShelf]);

  // Data for Chart.js
  const data = {
    labels: filteredLogs.map(log => dayjs(log.entryTime).format('YYYY-MM-DD')), // Time on x-axis
    datasets: [
      {
        label: `Shelf: ${shelves.find(shelf => shelf.id === selectedShelf)?.name || ''} - Duration (mins)`,
        data: filteredLogs.map(log => dayjs(log.exitTime).diff(dayjs(log.entryTime), 'minute')), // Duration in minutes
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
      },
    ],
  };

  return (
    <div>
      <h2>Shelf Sensor Logs</h2>
      
      {/* Shelf Selection Dropdown */}
      <Form.Select aria-label="Select Shelf" onChange={(e) => setSelectedShelf(Number(e.target.value))} value={selectedShelf}>
        {shelves.map(shelf => (
          <option key={shelf.id} value={shelf.id}>{shelf.name}</option>
        ))}
      </Form.Select>

      {/* Time Range Selection Dropdown */}
      <Form.Select aria-label="Time range" onChange={(e) => setTimeRange(e.target.value)} style={{ marginTop: '1rem' }}>
        <option value="1m">Last 1 Month</option>
        <option value="3m">Last 3 Months</option>
        <option value="6m">Last 6 Months</option>
        <option value="ytd">Year to Date</option>
        <option value="all">All Time</option>
      </Form.Select>

      {/* Line Chart */}
      <Line data={data} />
    </div>
  );
};

export default ShelfSensorLogs;
