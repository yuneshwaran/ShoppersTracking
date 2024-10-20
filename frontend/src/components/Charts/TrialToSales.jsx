import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import { Form } from 'react-bootstrap';
import axios from 'axios';
import dayjs from 'dayjs';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

const TrialToPurchase = () => {
  
  const [trialLogs, setTrialLogs] = useState([]);
  const [purchaseLogs, setPurchaseLogs] = useState([]);
  const [chartData, setChartData] = useState(null);
  const [selectedBrand, setSelectedBrand] = useState('All');
  const [selectedDuration, setSelectedDuration] = useState('6m');
  const [brands, setBrands] = useState(['All']);
  const token = localStorage.getItem('jwt');

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const [trialResponse, purchaseResponse] = await Promise.all([
          axios.get('http://localhost:8080/api/track/trial/all', {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get('http://localhost:8080/api/track/purchase', {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);

        setTrialLogs(trialResponse.data);
        setPurchaseLogs(purchaseResponse.data);

        const brandList = ['All', ...new Set(trialResponse.data.map(log => log.product.brand.name))];
        setBrands(brandList);
      } catch (error) {
        console.error('Error fetching logs', error);
      }
    };

    fetchLogs();
    const intervalId = setInterval(fetchLogs, 10000);
    return () => clearInterval(intervalId);
  }, [token]);

  const calculateStartDate = (duration) => {
    const months = { '1m': 1, '3m': 3, '6m': 6 };
    return dayjs().subtract(months[duration] || 10, 'years');
  };

  useEffect(() => {
    const startDate = calculateStartDate(selectedDuration);
    const productData = {};

    const filteredTrials = trialLogs.filter(log =>
      dayjs(log.entryTime).isAfter(startDate) &&
      (selectedBrand === 'All' || log.product.brand.name === selectedBrand)
    );

    const filteredPurchases = purchaseLogs.filter(log =>
      dayjs(log.purchaseTime).isAfter(startDate) &&
      (selectedBrand === 'All' || log.product.brand.name === selectedBrand)
    );

    filteredTrials.forEach(log => {
      const productName = log.product.name;
      productData[productName] = { trials: (productData[productName]?.trials || 0) + 1, purchases: productData[productName]?.purchases || 0 };
    });

    filteredPurchases.forEach(log => {
      const productName = log.product.name;
      productData[productName] = { trials: productData[productName]?.trials || 0, purchases: (productData[productName]?.purchases || 0) + 1 };
    });

    const productNames = Object.keys(productData);
    setChartData({
      labels: productNames,
      datasets: [
        {
          label: 'Trials',
          data: productNames.map(name => productData[name].trials),
          backgroundColor: 'rgba(255, 99, 132, 0.6)',
        },
        {
          label: 'Purchases',
          data: productNames.map(name => productData[name].purchases),
          backgroundColor: 'rgba(54, 162, 235, 0.6)',
        },
      ],
    });
  }, [trialLogs, purchaseLogs, selectedBrand, selectedDuration]);

  return (
    <div className='container'>
      <h2 className='badge text-light fs-4'>Trials to Sales Ratio</h2>

      <div className='d-flex align-items-center mb-4'>
        <div className='container align-items-center'>
          <div className='text-light'>Select Brand:</div>
          <Form.Select value={selectedBrand} onChange={e => setSelectedBrand(e.target.value)}>
            {brands.map(brand => (
              <option key={brand} value={brand}>{brand}</option>
            ))}
          </Form.Select>
        </div>

        <div className='container align-items-center'>
          <div className='text-light'>Select Duration:</div>
          <Form.Select value={selectedDuration} onChange={e => setSelectedDuration(e.target.value)}>
            <option value="1m">Last 1 Month</option>
            <option value="3m">Last 3 Months</option>
            <option value="6m">Last 6 Months</option>
          </Form.Select>
        </div>
      </div>

      {chartData ? (
        <Bar
          data={chartData}
          options={{
            responsive: true,
            scales: {
              x: { title: { display: true, text: 'Products' } },
              y: { title: { display: true, text: 'Number of Trials/Purchases' }, beginAtZero: true },
            },
          }}
        />
      ) : (
        <p>Loading chart...</p>
      )}
    </div>
  );
};

export default TrialToPurchase;
