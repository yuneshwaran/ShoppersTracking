import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import axios from 'axios';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { TextField } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'; 
import dayjs from 'dayjs';
import './MUI.css';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const TrialToPurchase = () => {
  const [trialLogs, setTrialLogs] = useState([]);
  const [purchaseLogs, setPurchaseLogs] = useState([]);
  const [chartData, setChartData] = useState(null);
  const [selectedBrand, setSelectedBrand] = useState('All');
  const [brands, setBrands] = useState([]);
  const [startDate, setStartDate] = useState(dayjs().subtract(30, 'days'));
  const [endDate, setEndDate] = useState(dayjs());

  useEffect(() => {
    axios.get('http://localhost:8080/api/track/trial/all')
      .then(response => {
        setTrialLogs(response.data);
        const uniqueBrands = Array.from(new Set(response.data.map(log => log.product.brand.name)));
        setBrands(['All', ...uniqueBrands]);
      })
      .catch(error => console.error('Error fetching trial logs:', error));

    axios.get('http://localhost:8080/api/track/purchase')
      .then(response => {
        setPurchaseLogs(response.data);
      })
      .catch(error => console.error('Error fetching purchase logs:', error));
  }, []);

  useEffect(() => {
    if (trialLogs.length > 0 && purchaseLogs.length > 0) {
      const productData = {};

      const filteredTrialLogs = trialLogs.filter(log => filterLogs(log, selectedBrand));
      const filteredPurchaseLogs = purchaseLogs.filter(log => filterLogs(log, selectedBrand));

      filteredTrialLogs.forEach(log => {
        const productName = log.product.name;
        if (!productData[productName]) {
          productData[productName] = { trials: 0, purchases: 0 };
        }
        productData[productName].trials += 1;
      });

      filteredPurchaseLogs.forEach(log => {
        const productName = log.product.name;
        if (!productData[productName]) {
          productData[productName] = { trials: 0, purchases: 0 };
        }
        productData[productName].purchases += 1;
      });

      const productNames = Object.keys(productData);
      const trialsData = productNames.map(name => productData[name].trials);
      const purchasesData = productNames.map(name => productData[name].purchases);

      setChartData({
        labels: productNames,
        datasets: [
          {
            label: 'Trials',
            data: trialsData,
            backgroundColor: 'rgba(255, 99, 132, 0.6)',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1,
          },
          {
            label: 'Purchases',
            data: purchasesData,
            backgroundColor: 'rgba(54, 162, 235, 0.6)',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1,
          },
        ],
      });
    }
  }, [trialLogs, purchaseLogs, selectedBrand, startDate, endDate]);

  const filterLogs = (log, selectedBrand) => {
    const logDate = dayjs(log.purchaseDate || log.entryTime);
    const brandMatch = selectedBrand === 'All' || log.product.brand.name === selectedBrand;
    const isInDateRange = logDate.isBetween(startDate, endDate, 'day', '[]');

    return brandMatch && isInDateRange;
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div className='container'>
        <div className='mb-3'>
          <h2 className='badge text-light fs-4'>Trials:Purchase</h2>
        </div>

        <div className='row mb-4'>
          <div className='col-md-4'>
            <label htmlFor="brand-select" className='text-light'>Select Brand: </label>
            <select
              id="brand-select"
              className='form-select'
              value={selectedBrand}
              onChange={e => setSelectedBrand(e.target.value)}
            >
              {brands.map(brand => (
                <option key={brand} value={brand}>
                  {brand}
                </option>
              ))}
            </select>
          </div>

          <div className='col-md-4'>
            <DatePicker
              label="Start Date"
              value={startDate}
              onChange={(newValue) => setStartDate(newValue)}
              renderInput={(params) => <TextField {...params} sx={{ backgroundColor: 'white' }} />}
            />
          </div>
          <div className='col-md-4'>
            <DatePicker
              label="End Date"
              value={endDate}
              onChange={(newValue) => setEndDate(newValue)}
              renderInput={(params) => <TextField {...params} sx={{ backgroundColor: 'white' }} />} 
            />
          </div>
        </div>

        {/* Bar Chart */}
        <div className='row'>
          {chartData ? (
            <Bar
              data={chartData}
              options={{
                responsive: true,
                scales: {
                  x: {
                    title: {
                      display: true,
                      text: 'Products'
                    }
                  },
                  y: {
                    title: {
                      display: true,
                      text: 'Number of Trials/Purchases'
                    },
                    beginAtZero: true,
                  }
                },
              }}
            />
          ) : (
            <p>Loading chart...</p>
          )}
        </div>
      </div>
    </LocalizationProvider>
  );
};

export default TrialToPurchase;
