import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import { Form, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import dayjs from 'dayjs';

const AverageTimeByProduct = () => {
  const [trialLogs, setTrialLogs] = useState([]);
  const [shelfLogs, setShelfLogs] = useState([]);
  const [brands, setBrands] = useState([]);
  const [selectedDuration, setSelectedDuration] = useState('1m'); // Default to 1 month
  const [selectedBrand, setSelectedBrand] = useState('');
  const [chartData, setChartData] = useState(null);
  
  const token = localStorage.getItem('jwt');

  const calculateStartDate = (duration) => {
    switch (duration) {
      case '1m':
        return dayjs().subtract(1, 'month');
      case '3m':
        return dayjs().subtract(3, 'months');
      case '6m':
        return dayjs().subtract(6, 'months');
      default:
        return dayjs().subtract(10, 'years'); // Default for long history
    }
  };

  // Fetch logs when component mounts
  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const trialResponse = await axios.get('http://localhost:8080/api/track/trial/all', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setTrialLogs(trialResponse.data);

        const shelfResponse = await axios.get('http://localhost:8080/api/track/shelf/logs', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setShelfLogs(shelfResponse.data);

        // Set unique brands based on trial logs
        const uniqueBrands = [...new Set(trialResponse.data.map(log => log.product.brand.name))];
        setBrands(uniqueBrands);
      } catch (error) {
        console.error('Failed to fetch logs:', error);
      }
    };

    fetchLogs();
  }, [token]);

  // Update chart data whenever the logs, duration, or brand changes
  useEffect(() => {
    const startDate = calculateStartDate(selectedDuration);

    // Filter trial logs by selected duration and brand
    const filteredTrialLogs = trialLogs.filter(log => 
      dayjs(log.entryTime).isAfter(startDate) && (selectedBrand ? log.product.brand.name === selectedBrand : true)
    );

    // Prepare to calculate average time spent for each product
    const productTimes = {};

    filteredTrialLogs.forEach(log => {
      const productName = log.product.name;
      const shelfLog = shelfLogs.find(shelfLog => 
        shelfLog.shelf.id === log.product.shelf.id && 
        dayjs(shelfLog.exitTime).isAfter(log.entryTime) // Ensure shelf log exits after trial entry
      );

      if (shelfLog) {
        const trialTime = shelfLog.exitTime
          ? dayjs(shelfLog.exitTime).diff(dayjs(log.entryTime), 'minute')
          : dayjs().diff(dayjs(log.entryTime), 'minute'); // Fallback if no exit time

        if (!productTimes[productName]) {
          productTimes[productName] = { totalTime: 0, count: 0 };
        }

        productTimes[productName].totalTime += trialTime;
        productTimes[productName].count += 1;
      }
    });

    // Prepare chart data
    const productNames = Object.keys(productTimes);
    const avgTimes = productNames.map(name => 
      (productTimes[name].totalTime / (productTimes[name].count * 60)).toFixed(2) // Convert to hours
    );

    if (productNames.length > 0 && avgTimes.length > 0) {
      setChartData({
        labels: productNames,
        datasets: [
          {
            label: 'Average Time (hours)',
            data: avgTimes,
            backgroundColor: 'rgba(75, 192, 192, 0.6)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
          },
        ],
      });
    } else {
      setChartData(null);
    }
  }, [trialLogs, shelfLogs, selectedDuration, selectedBrand]);

  return (
    <div className="container">
      <h2 className="text-light">Average Time Spent on Products</h2>

      <Row className="mb-4">
        <Col>
          <div className="text-light">Select Duration:</div>
          <Form.Select value={selectedDuration} onChange={(e) => setSelectedDuration(e.target.value)}>
            <option value="1m">Last 1 Month</option>
            <option value="3m">Last 3 Months</option>
            <option value="6m">Last 6 Months</option>
          </Form.Select>
        </Col>

        <Col>
          <div className="text-light">Select Brand:</div>
          <Form.Select value={selectedBrand} onChange={(e) => setSelectedBrand(e.target.value)}>
            <option value="">Select Brand</option>
            {brands.map((brand, index) => (
              <option key={index} value={brand}>{brand}</option>
            ))}
          </Form.Select>
        </Col>
      </Row>

      {chartData ? (
        <Bar
          data={chartData}
          options={{
            responsive: true,
            scales: {
              y: { beginAtZero: true },
            },
          }}
        />
      ) : (
        <p className="text-light">No data available for selected filters</p>
      )}
    </div>
  );
};

export default AverageTimeByProduct;
