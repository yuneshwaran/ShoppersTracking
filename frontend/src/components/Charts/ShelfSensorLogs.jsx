import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { Form } from 'react-bootstrap';
import dayjs from 'dayjs';
import axios from 'axios';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const ShelfSensorLogs = () => {
  const [logs, setLogs] = useState([]);
  const [timeRange, setTimeRange] = useState('1m');
  const [selectedShelf, setSelectedShelf] = useState('');
  const [shelves, setShelves] = useState([]);

  useEffect(() => {
    const fetchLogs = async () => {
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
  }, [selectedShelf]);

  const filteredLogs = logs
    .filter(log => log.shelf.id === selectedShelf)
    .filter(log => {
      const now = dayjs();
      const entryDate = dayjs(log.entryTime);
      const timePeriod = { '1m': 1, '3m': 3, '6m': 6 }[timeRange];
      return entryDate.isAfter(now.subtract(timePeriod, 'month'));
    })
    .sort((a, b) => new Date(a.entryTime) - new Date(b.entryTime)); // Sort from past to latest

  const data = {
    labels: filteredLogs.map(log => dayjs(log.entryTime).format('YYYY-MM-DD')),
    datasets: [
      {
        label: 'Duration (minutes)',
        data: filteredLogs.map(log => dayjs(log.exitTime).diff(dayjs(log.entryTime), 'minute')),
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
            <option value="1m">Last 1 Month</option>
            <option value="3m">Last 3 Months</option>
            <option value="6m">Last 6 Months</option>
          </Form.Select>
        </div>
      </div>

      <div className="row">
        <Line data={data} />
      </div>
    </div>
  );
};

export default ShelfSensorLogs;
