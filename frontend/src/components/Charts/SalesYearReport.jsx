import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { Button } from 'react-bootstrap';
import axios from 'axios';
import dayjs from 'dayjs';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

const SalesYearReport = () => {
  const [purchaseLogs, setPurchaseLogs] = useState([]);
  const [chartData, setChartData] = useState(null);
  const [currentYear, setCurrentYear] = useState(dayjs().year());
  const token = localStorage.getItem('jwt');

  useEffect(() => {
    const fetchPurchaseLogs = async () => {
      const response = await axios.get('http://localhost:8080/api/track/purchase', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setPurchaseLogs(response.data);
    };

    fetchPurchaseLogs();
  }, [token]);

  const filterLogsByYear = (logs, year) => logs.filter(log => dayjs(log.purchaseDate).year() === year);

  const calculateSalesData = () => {
    const filteredPurchases = filterLogsByYear(purchaseLogs, currentYear);
    const monthlySales = Array(12).fill(0);

    filteredPurchases.forEach(purchase => {
      const purchaseMonth = dayjs(purchase.purchaseDate).month();
      monthlySales[purchaseMonth] += purchase.totalPrice;
    });

    return monthlySales;
  };

  useEffect(() => {
    const salesData = calculateSalesData();

    setChartData({
      labels: [
        'January', 'February', 'March', 'April', 'May', 'June', 
        'July', 'August', 'September', 'October', 'November', 'December'
      ],
      datasets: [{
        label: 'Total Sales Per Month (₹)',
        data: salesData,
        borderColor: 'rgba(20, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        fill: true,
      }],
    });
  }, [purchaseLogs, currentYear]);

  const handlePrevYear = () => setCurrentYear(prevYear => prevYear - 1);
  const handleNextYear = () => setCurrentYear(prevYear => prevYear + 1);

  return (
    <div className="container" style={{ maxWidth: '100%' }}>
      <h2 className="badge text-light fs-4">Total Sales Per Month for {currentYear}</h2>
      <div className="d-flex justify-content-between mb-4">
        <Button variant="primary" onClick={handlePrevYear}>Previous Year</Button>
        <Button variant="primary" onClick={handleNextYear}>Next Year</Button>
      </div>
      {chartData ? (
        <Line
          data={chartData}
          options={{
            responsive: true,
            plugins: {
              legend: { position: 'top' },
              tooltip: { enabled: true },
            },
            scales: {
              x: {
                title: { display: true, text: 'Month' },
              },
              y: {
                title: { display: true, text: 'Total Sales (₹)' },
                beginAtZero: true,
              },
            },
          }}
        />
      ) : (
        <p>Loading chart...</p>
      )}
    </div>
  );
};

export default SalesYearReport;
