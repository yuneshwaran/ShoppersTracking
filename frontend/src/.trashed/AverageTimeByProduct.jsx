import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
import { Form, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import dayjs from 'dayjs';

Chart.register(...registerables);

const AverageTimeByBrand = () => {
  const [trialLogs, setTrialLogs] = useState([]);
  const [shelfLogs, setShelfLogs] = useState([]);
  const [brands, setBrands] = useState([]);
  const [selectedDuration, setSelectedDuration] = useState('6m'); 
  const [selectedBrand, setSelectedBrand] = useState('');
  const [chartData, setChartData] = useState(null);
  
  const token = localStorage.getItem('jwt');

  const calculateStartDate = (duration) => {
    switch (duration) {
      case '1m':
        return dayjs().subtract(1, 'month').startOf('day');
      case '3m':
        return dayjs().subtract(3, 'months').startOf('day');
      case '6m':
        return dayjs().subtract(6, 'months').startOf('day');
      default:
        return dayjs().subtract(10, 'years').startOf('day');
    }
  };

  useEffect(() => {
    const fetchLogs = async () => {
      console.log('All logs fetched');
      try {
        const trialResponse = await axios.get('http://localhost:8080/api/track/trial/all', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setTrialLogs(trialResponse.data);

        const shelfResponse = await axios.get('http://localhost:8080/api/track/shelf/logs', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setShelfLogs(shelfResponse.data);

        const uniqueBrands = [...new Set(trialResponse.data.map(log => log.product.brand.name))];
        setBrands(uniqueBrands);
      } catch (error) {
        console.error('Failed to fetch logs:', error);
      }
    };
    fetchLogs();

    const intervalId = setInterval(fetchLogs, 10000); 
    return () => clearInterval(intervalId);
  }, [token]);

  useEffect(() => {
    const startDate = calculateStartDate(selectedDuration);

    const filteredTrialLogs = trialLogs.filter(log => 
      dayjs(log.entryTime).isAfter(startDate) && 
      (selectedBrand ? log.product.brand.name === selectedBrand : true)
    );

    const dailyBrandTimes = {}; // To track total time per brand per day

    filteredTrialLogs.forEach(log => {
      const productBrand = log.product.brand.name;
      const shelfLog = shelfLogs.find(shelfLog => 
        shelfLog.shelf.id === log.product.shelf.id && 
        dayjs(shelfLog.exitTime).isAfter(log.entryTime) 
      );

      if (shelfLog) {
        const trialTime = shelfLog.exitTime
          ? dayjs(shelfLog.exitTime).diff(dayjs(log.entryTime), 'minute')
          : dayjs().diff(dayjs(log.entryTime), 'minute');

        const date = dayjs(log.entryTime).format('YYYY-MM-DD');

        if (!dailyBrandTimes[date]) {
          dailyBrandTimes[date] = {}; // Create entry for this date
        }

        if (!dailyBrandTimes[date][productBrand]) {
          dailyBrandTimes[date][productBrand] = { totalTime: 0, entryCount: 0 };
        }

        dailyBrandTimes[date][productBrand].totalTime += trialTime;
        dailyBrandTimes[date][productBrand].entryCount += 1;

        // Log the total time for debugging
        console.log(`Brand: ${productBrand}, Date: ${date}, Trial Time: ${trialTime} minutes`);
      }
    });

    // Calculate daily average per brand
    const dailyAverages = Object.keys(dailyBrandTimes).map(date => {
      const brandData = dailyBrandTimes[date];
      const averagesForDate = {};
      
      Object.keys(brandData).forEach(brand => {
        const { totalTime, entryCount } = brandData[brand];
        averagesForDate[brand] = totalTime / entryCount; // Average time in minutes for this brand
      });

      return { date, averagesForDate };
    });

    // Prepare chart data by mapping daily averages for the selected brand
    const labels = dailyAverages.map(avg => avg.date);
    const avgTimes = dailyAverages.map(avg => {
      const brandAvg = avg.averagesForDate[selectedBrand] || 0; 
      return (brandAvg / 60).toFixed(2); // Convert minutes to hours
    });

    console.log(`Daily Average for ${selectedBrand}:`, avgTimes);

    setChartData({
      labels,
      datasets: [
        {
          label: `Average Time (hours) for ${selectedBrand}`,
          data: avgTimes,
          backgroundColor: 'rgba(75, 192, 192, 0.6)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1,
        },
      ],
    });
  }, [trialLogs, shelfLogs, selectedDuration, selectedBrand]);

  return (
    <div className="container">
      <h2 className="text-light">Average Time Spent on Products by Brand</h2>

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
            <option value="">All Brands</option>
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

export default AverageTimeByBrand;
