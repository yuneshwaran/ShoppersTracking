import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import { Button, Form } from 'react-bootstrap';
import axios from 'axios';
import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';
import { Chart, registerables } from 'chart.js';

dayjs.extend(isBetween);

Chart.register(...registerables);

const TrialToPurchase = () => {
  
  const [logs, setLogs] = useState({ trials: [], purchases: [] });
  const [chartData, setChartData] = useState(null);
  const [selectedBrand, setSelectedBrand] = useState('All');
  const [currentMonth, setCurrentMonth] = useState(dayjs());
  const [brands, setBrands] = useState(['All']);
  const token = localStorage.getItem('jwt');

  const fetchTrialLogs = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/track/trial/all', {
        headers: { Authorization: `Bearer ${token}` }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching trial logs', error);
      return [];
    }
  };

  const fetchPurchaseLogs = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/track/purchase', {
        headers: { Authorization: `Bearer ${token}` }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching purchase logs', error);
      return [];
    }
  };

  const fetchLogs = async () => {
    const [trialData, purchaseData] = await Promise.all([fetchTrialLogs(), fetchPurchaseLogs()]);
    setLogs({ trials: trialData, purchases: purchaseData });

    const uniqueBrands = ['All', ...new Set(trialData.map(log => log.product.brand.name))];
    setBrands(uniqueBrands);
  };

  useEffect(() => {
    fetchLogs();
  }, [token]);

  const handleMonthChange = (offset) => {
    setCurrentMonth(currentMonth.add(offset, 'month'));
  };

  useEffect(() => {
    const startDate = currentMonth.startOf('month');
    const endDate = currentMonth.endOf('month');
    const productData = {};

    const filterLogs = (logs, logType) =>
      logs.filter(log =>
        dayjs(log[logType]).isBetween(startDate, endDate) &&
        (selectedBrand === 'All' || log.product.brand.name === selectedBrand)
      );

    const updateProductData = (logs, type) => {
      logs.forEach(log => {
        const product = log.product.name;
        if (!productData[product]) productData[product] = { trials: 0, purchases: 0 };
        productData[product][type]++;
      });
    };

    updateProductData(filterLogs(logs.trials, 'entryTime'), 'trials');
    updateProductData(filterLogs(logs.purchases, 'purchaseDate'), 'purchases');

    const productNames = Object.keys(productData);
    setChartData({
      labels: productNames,
      datasets: [
        { label: 'Trials', data: productNames.map(name => productData[name].trials), backgroundColor: 'rgba(255, 99, 132, 0.6)' },
        { label: 'Purchases', data: productNames.map(name => productData[name].purchases), backgroundColor: 'rgba(54, 162, 235, 0.6)' },
      ],
    });
  }, [logs, selectedBrand, currentMonth]);

  return (
    <div className='container'>
      <h2 className='badge text-light fs-4'>Trials to Sales Ratio of {currentMonth.format('MMMM YYYY')}</h2>

      <div className='d-flex justify-content-between mb-4'>
        <Button variant='primary' onClick={() => handleMonthChange(-1)}>Previous Month</Button>
        <div className='d-flex justify-content-center'>
          <span className='me-3 text-light fs-5'>Select Brand:</span>
          <Form.Select className='w-auto' value={selectedBrand} onChange={e => setSelectedBrand(e.target.value)}>
            {brands.map(brand => (
              <option key={brand} value={brand}>{brand}</option>
            ))}
          </Form.Select>
        </div>
        <Button variant='primary' onClick={() => handleMonthChange(1)}>Next Month</Button>
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
