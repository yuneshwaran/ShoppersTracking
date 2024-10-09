import React, { useState, useEffect } from 'react';
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
  TimeScale,
} from 'chart.js';
import axios from 'axios';
import axiosInstance from '../utils/axiosInstance';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  TimeScale
);

const ShelfSensorLogs = () => {
  const moment = require('moment');
  const [logs, setLogs] = useState([]);
  const [filteredLogs, setFilteredLogs] = useState([]);
  const [timeRange, setTimeRange] = useState('1m');
  const [selectedShelf, setSelectedShelf] = useState('');
  const [shelves, setShelves] = useState([]);

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        // const response = axiosInstance.get('/api/track/shelf/logs')
         const response = await axios.get('http://localhost:8080/api/track/shelf/logs');
        setLogs(response.data);

        const uniqueShelves = Array.from(new Set(response.data.map(log => log.shelf.id)))
          .map(id => response.data.find(log => log.shelf.id === id).shelf);

        setShelves(uniqueShelves);
        if (uniqueShelves.length > 0) {
          setSelectedShelf(uniqueShelves[0].id);
        }
      } catch (error) {
        console.error('Failed to fetch shelf logs:', error);
      }
    };
    fetchLogs();
  }, []);

  useEffect(() => {
    const now = dayjs();
    let filteredData = logs.filter(log => log.shelf.id === selectedShelf);

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
      default:
        filteredData = filteredData;
    }

    setFilteredLogs(filteredData);
  }, [logs, timeRange, selectedShelf]);

    const data = {
      labels: filteredLogs.map(log => dayjs(log.entryTime).format('YYYY-MM-DD')),
      datasets: [
        {
          label: `Shelf: ${shelves.find(shelf => shelf.id === selectedShelf)?.name || ''} - Duration (mins)`,
          data: filteredLogs.map(log => dayjs(log.exitTime).diff(dayjs(log.entryTime), 'minute')),
          borderColor: 'rgba(75, 192, 192, 1)',
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
        },
      ],
  };

  return (
    <div className='container'>

          <div>
            <h2 className='badge text-ligh fs-4'>Shelf Sensor Logs</h2>
          </div>

          <div className='d-flex align-items-center text-align-center mb-3'>
              <div className='container align-items-center'>
                    <div className='text-light'>Shelf name</div>

                    <Form.Select
                      className='me-2'
                      aria-label="Select Shelf"
                      onChange={(e) => setSelectedShelf(Number(e.target.value))}
                      value={selectedShelf}>
                      {shelves.map(shelf => (
                    <option key={shelf.id} value={shelf.id}>{shelf.name}</option>
                      ))}
                    </Form.Select>
              </div>

              <div className='container align-items-center'>
                      
                    <div className='text-light'>Time Frame</div>
                    
                    <Form.Select
                      aria-label="Time range"
                      onChange={(e) => setTimeRange(e.target.value)}>
                        <option value="1m">Last 1 Month</option>
                        <option value="3m">Last 3 Months</option>
                        <option value="6m">Last 6 Months</option>
                        <option value="all">All Time</option>
                    </Form.Select>
                </div>
          </div>      

          <div className='row'>
            <Line data={data} />
          </div>
    </div>
  );

}
export default ShelfSensorLogs;
