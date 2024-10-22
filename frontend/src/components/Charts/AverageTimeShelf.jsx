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
        const logResponse = await axios.get('http://localhost:8080/api/track/shelf/logs', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setLogs(logResponse.data);
      } catch (error) {
        console.error('Error fetching shelf logs:', error);
      }
    };

    const fetchShelves = async () => {
      try {
        const token = localStorage.getItem('jwt');
        const shelfResponse = await axios.get('http://localhost:8080/api/shelf', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setShelves(shelfResponse.data);
        
        if (!selectedShelf && shelfResponse.data.length > 0) {
          setSelectedShelf(shelfResponse.data[0].id);
        }
      } catch (error) {
        console.error('Error fetching shelves:', error);
      }
    };

    fetchLogs();
    fetchShelves();

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
      acc[date] = acc[date] || { totalDuration: 0, count: 0 };
      acc[date].totalDuration += log.duration / 60; 
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
    <div className="container ">
      <h2 className="badge text-light fs-4">{`Average Time per Shelf for: ${selectedMonthYear}`}</h2>
      
      <div className="d-flex justify-content-between mb-3">
        <Button variant="primary" onClick={handlePreviousMonth}>Previous Month</Button>
        <div className="d-flex justify-content-center align-items-center ">
          <span className="text-light me-3">Shelf:</span>
          <Form.Select className="w-auto" onChange={(e) => setSelectedShelf(Number(e.target.value))} value={selectedShelf}>
            {shelves.map(shelf => (
              <option key={shelf.id} value={shelf.id}>{shelf.name}</option>
            ))}
          </Form.Select>
        </div>
        <Button variant="primary" onClick={handleNextMonth} disabled={monthOffset === 0}>Next Month</Button>
      </div>
      
      <div className="row">
        {chartData ? <Line data={chartData} /> : <p>Loading chart...</p>}
      </div>
    </div>
  );
};

export default ShelfSensorLogs;
