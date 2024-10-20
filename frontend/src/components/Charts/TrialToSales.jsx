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

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const [trialData, purchaseData] = await Promise.all([
          axios.get('http://localhost:8080/api/track/trial/all', { headers: { Authorization: `Bearer ${token}` } }),
          axios.get('http://localhost:8080/api/track/purchase', { headers: { Authorization: `Bearer ${token}` } }),
        ]);
        setLogs({ trials: trialData.data, purchases: purchaseData.data });

        const uniqueBrands = ['All', ...new Set(trialData.data.map(log => log.product.brand.name))];
        setBrands(uniqueBrands);
      } catch (error) {
        console.error('Error fetching logs', error);
      }
    };

    fetchLogs();
  }, [token]);

  const handleMonthChange = (direction) => {
    setCurrentMonth(currentMonth.add(direction, 'month'));
  };

  useEffect(() => {
    const startDate = currentMonth.startOf('month');
    const endDate = currentMonth.endOf('month');
    const productData = {};

    const filterLogs = (logList, logType) =>
      logList.filter(log =>
        dayjs(log[`${logType}Time`]).isBetween(startDate, endDate) &&
        (selectedBrand === 'All' || log.product.brand.name === selectedBrand)
      );

    const updateProductData = (logs, type) => {
      logs.forEach(log => {
        const product = log.product.name;
        if (!productData[product]) productData[product] = { trials: 0, purchases: 0 };
        productData[product][type]++;
      });
    };

    updateProductData(filterLogs(logs.trials, 'entry'), 'trials');
    updateProductData(filterLogs(logs.purchases, 'purchase'), 'purchases');

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

      <h2 className='badge text-light fs-4'>Trials to Sales Ratio</h2>

      <div className='d-flex justify-content-between align-items-center mb-4'>
        <Button variant='primary' onClick={() => handleMonthChange(-1)}>Previous Month</Button>
        <span className='mx-5 text-light fs-5'>{currentMonth.format('MMMM YYYY')}</span>
        <Button variant='primary' onClick={() => handleMonthChange(1)}>Next Month</Button>
      </div>

      <div className='d-flex justify-content-center align-items-center mb-4'>
        <span className='me-3 text-light fs-5'>Select Brand:</span>
        <Form.Select className='w-auto' value={selectedBrand} onChange={e => setSelectedBrand(e.target.value)}>
          {brands.map(brand => (
            <option key={brand} value={brand}>{brand}</option>
          ))}
        </Form.Select>
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
