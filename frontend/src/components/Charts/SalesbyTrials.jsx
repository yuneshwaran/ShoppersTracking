import React, { useState, useEffect } from 'react';
import { Pie } from 'react-chartjs-2';
import { Button } from 'react-bootstrap';
import axios from 'axios';
import dayjs from 'dayjs';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

const SalesPieChart = () => {
  const [trialLogs, setTrialLogs] = useState([]);
  const [purchaseLogs, setPurchaseLogs] = useState([]);
  const [chartData, setChartData] = useState(null);
  const [currentMonth, setCurrentMonth] = useState(dayjs());
  const token = localStorage.getItem('jwt');
  const today = dayjs(); 

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const trialResponse = await axios.get('http://localhost:8080/api/track/trial/all', {
          headers: { Authorization: `Bearer ${token}` },
        });
        const purchaseResponse = await axios.get('http://localhost:8080/api/track/purchase', {
          headers: { Authorization: `Bearer ${token}` },
        });

        setTrialLogs(trialResponse.data);
        setPurchaseLogs(purchaseResponse.data);
      } catch (error) {
        console.error('Error fetching logs', error);
      }
    };

    fetchLogs();
  }, [token]);

  const filterLogsByMonth = (logs, dateField) => {
    const startOfMonth = currentMonth.startOf('month');
    const endOfMonth = currentMonth.endOf('month');

    return logs.filter(log => {
      const logDate = dayjs(log[dateField]);
      return logDate.isAfter(startOfMonth) && logDate.isBefore(endOfMonth);
    });
  };


  const calculateSalesData = () => {
    const filteredTrials = filterLogsByMonth(trialLogs, 'entryTime');
    const filteredPurchases = filterLogsByMonth(purchaseLogs, 'purchaseDate');

    let totalSales = filteredPurchases.length;
    let salesAfterTrials = 0;
    let salesWithoutTrials = 0;

    filteredPurchases.forEach(purchase => {
      const matchingTrial = filteredTrials.find(trial => trial.product.id === purchase.product.id);
      if (matchingTrial) {
        salesAfterTrials += 1;
      } else {
        salesWithoutTrials += 1;
      }
    });

    return { totalSales, salesAfterTrials, salesWithoutTrials };
  };

  useEffect(() => {
    const { totalSales, salesAfterTrials, salesWithoutTrials } = calculateSalesData();

    setChartData({
      labels: ['Total Sales', 'Sales After Trials', 'Sales Without Trials'],
      datasets: [
        {
          data: [totalSales, salesAfterTrials, salesWithoutTrials],
          backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
        },
      ],
    });
  }, [trialLogs, purchaseLogs, currentMonth]);


  const handlePrevMonth = () => {
    setCurrentMonth(currentMonth.subtract(1, 'month'));
  };

  const handleNextMonth = () => {

    if (currentMonth.isBefore(today, 'month')) {
      setCurrentMonth(currentMonth.add(1, 'month'));
    }
  };

  return (
    <div className="container" style={{ maxHeight: "50%", width: "50%" }}>
      <h2 className="badge text-light fs-4">Sales Analysis for {currentMonth.format('MMMM YYYY')}</h2>

      <div className="d-flex justify-content-between mb-4">
        <Button variant="primary" onClick={handlePrevMonth}>Previous Month</Button>
        <Button variant="primary" onClick={handleNextMonth} disabled={currentMonth.isSame(today, 'month')}>Next Month</Button>
      </div>

      {chartData ? (
        <Pie
          data={chartData}
          options={{
            responsive: true,
            plugins: {
              legend: { position: 'top' },
              tooltip: { enabled: true },
            },
          }}
        />
      ) : (
        <p>Loading chart...</p>
      )}
    </div>
  );
};

export default SalesPieChart;
