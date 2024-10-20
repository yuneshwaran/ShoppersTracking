import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { Form, Button } from 'react-bootstrap';
import dayjs from 'dayjs';
import axios from 'axios';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

const ShelfSensorLogs = () => {
  const [logs, setLogs] = useState([]);
  const [selectedShelf, setSelectedShelf] = useState('');
  const [shelves, setShelves] = useState([]);
  const [monthOffset, setMonthOffset] = useState(0);

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const token = localStorage.getItem('jwt');
        const response = await axios.get('http://localhost:8080/api/track/shelf/logs', {
          headers: { Authorization: `Bearer ${token}` },
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

  const filteredLogs = logs.filter(log => {
    const now = dayjs().subtract(monthOffset, 'month');
    const entryDate = dayjs(log.entryTime);
    return entryDate.isSame(now, 'month') && log.shelf.id === selectedShelf;
  });

  const aggregatedData = filteredLogs.reduce((acc, log) => {
    const date = dayjs(log.entryTime).format('YYYY-MM-DD');
    const duration = dayjs(log.exitTime).diff(dayjs(log.entryTime), 'minute');
    acc[date] = acc[date] || { totalDuration: 0, count: 0 };
    acc[date].totalDuration += duration;
    acc[date].count += 1;
    return acc;
  }, {});

  const averageData = Object.keys(aggregatedData).map(date => ({
    date,
    average: (aggregatedData[date].totalDuration / aggregatedData[date].count).toFixed(2),
  }));

  const chartData = {
    labels: averageData.map(data => data.date),
    datasets: [
      {
        label: 'Average Duration (minutes)',
        data: averageData.map(data => data.average),
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
      },
    ],
  };

  const handlePreviousMonth = () => setMonthOffset(prev => prev + 1);
  const handleNextMonth = () => setMonthOffset(prev => (prev > 0 ? prev - 1 : 0));
  const selectedMonthYear = dayjs().subtract(monthOffset, 'month').format('MMMM YYYY');

  return (
    <div className="container">
      <h2 className="badge text-light fs-4">{`Average Time per Shelf of : ${selectedMonthYear}`}</h2>
      <div className="d-flex justify-content-between mb-3">
        <Button variant="primary" onClick={handlePreviousMonth}>Previous Month</Button>
        <Button variant="primary" onClick={handleNextMonth} disabled={monthOffset === 0}>Next Month</Button>
      </div>
      <div className="d-flex align-items-center mb-3">
        <div className="text-light me-2">Shelf:</div>
        <Form.Select className="me-2" onChange={(e) => setSelectedShelf(Number(e.target.value))} value={selectedShelf}>
          {shelves.map(shelf => (
            <option key={shelf.id} value={shelf.id}>{shelf.name}</option>
          ))}
        </Form.Select>
      </div>
      <div className="row">
        <Line data={chartData} />
      </div>
    </div>
  );
};

export default ShelfSensorLogs;
