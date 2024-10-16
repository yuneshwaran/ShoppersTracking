import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import { Form } from 'react-bootstrap';
import axios from 'axios';
import dayjs from 'dayjs';

const TrialToPurchase = () => {

  const [trialLogs, setTrialLogs] = useState([]);
  const [purchaseLogs, setPurchaseLogs] = useState([]);
  const [chartData, setChartData] = useState(null);
  const [selectedBrand, setSelectedBrand] = useState('All');
  const [selectedDuration, setSelectedDuration] = useState('1m'); // Default to 1 month
  const [brands, setBrands] = useState(['All']);
  const token = localStorage.getItem('jwt');  


  useEffect(() => {
    const fetchLogs = async () => {
  
      try {
        const trialResponse = await axios.get('http://localhost:8080/api/track/trial/all', {
          headers: {
            Authorization: `Bearer ${token}`, 
          },
        });
        
        const purchaseResponse = await axios.get('http://localhost:8080/api/track/purchase', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setTrialLogs(trialResponse.data);
        setPurchaseLogs(purchaseResponse.data);

        const brandList = ['All', ...new Set(trialResponse.data.map(log => log.product.brand.name))];
        setBrands(brandList);
        
      } catch (error) {
        console.error('Error fetching logs', error);
      }
    };

    fetchLogs();
  }, [token]);

  // Calculate the start date based on selected duration
  const calculateStartDate = (duration) => {
    switch (duration) {
      case '1m':
        return dayjs().subtract(1, 'month');
      case '3m':
        return dayjs().subtract(3, 'months');
      case '6m':
        return dayjs().subtract(6, 'months');
      default:
        return dayjs().subtract(10, 'years'); // default long history
    }
  };

  // Filter logs and update chart data when brand or duration changes
  useEffect(() => {

    const startDate = calculateStartDate(selectedDuration);
    const productData = {};

    const filteredTrials = selectedBrand === 'All' ? 
        trialLogs.filter(log => dayjs(log.entryTime).isAfter(startDate)) :
        trialLogs.filter(log => log.product.brand.name === selectedBrand && dayjs(log.entryTime).isAfter(startDate));

    const filteredPurchases = selectedBrand === 'All' ? 
        purchaseLogs.filter(log => dayjs(log.purchaseTime).isAfter(startDate)) :
        purchaseLogs.filter(log => log.product.brand.name === selectedBrand && dayjs(log.purchaseTime).isAfter(startDate));

    // Calculate the number of trials for each product
    filteredTrials.forEach(log => {
      const productName = log.product.name;
      if (!productData[productName]) {
        productData[productName] = { trials: 0, purchases: 0 };
      }
      productData[productName].trials += 1;
    });

    // Calculate purchases for each product
    filteredPurchases.forEach(log => {
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
        },
        {
          label: 'Purchases',
          data: purchasesData,
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
          <div className='text-light'>Select Brand: </div>
          <Form.Select
            value={selectedBrand}
            onChange={(e) => setSelectedBrand(e.target.value)}
          >
            {brands.map((brand) => (
              <option key={brand} value={brand}>{brand}</option>
            ))}
          </Form.Select>
        </div>

        <div className='container align-items-center'>
          <div className='text-light'>Select Duration: </div>
          <Form.Select
            value={selectedDuration}
            onChange={(e) => setSelectedDuration(e.target.value)}
          >
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
