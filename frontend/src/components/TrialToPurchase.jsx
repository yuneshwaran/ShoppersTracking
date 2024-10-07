import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import axios from 'axios';
import '../App.css';

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const TrialToPurchase = () => {
  const [trialLogs, setTrialLogs] = useState([]);
  const [purchaseLogs, setPurchaseLogs] = useState([]);
  const [chartData, setChartData] = useState(null);
  const [selectedBrand, setSelectedBrand] = useState('All');
  const [brands, setBrands] = useState([]);

  useEffect(() => {
    // Fetch trial logs
    axios.get('http://localhost:8080/api/track/trial/all')
      .then(response => {
        setTrialLogs(response.data);
        // Extract unique brands from trial logs
        const uniqueBrands = Array.from(new Set(response.data.map(log => log.product.brand.name)));
        setBrands(['All', ...uniqueBrands]);
      })
      .catch(error => console.error('Error fetching trial logs:', error));

    // Fetch purchase logs
    axios.get('http://localhost:8080/api/track/purchase')
      .then(response => {
        setPurchaseLogs(response.data);
      })
      .catch(error => console.error('Error fetching purchase logs:', error));
  }, []);

  useEffect(() => {
    if (trialLogs.length > 0 && purchaseLogs.length > 0) {
      // Create a mapping for products
      const productData = {};

      // Filter logs based on the selected brand
      const filteredTrialLogs = selectedBrand === 'All' ? trialLogs : trialLogs.filter(log => log.product.brand.name === selectedBrand);
      const filteredPurchaseLogs = selectedBrand === 'All' ? purchaseLogs : purchaseLogs.filter(log => log.product.brand.name === selectedBrand);

      // Count trials for each product
      filteredTrialLogs.forEach(log => {
        const productName = log.product.name;
        if (!productData[productName]) {
          productData[productName] = { trials: 0, purchases: 0 };
        }
        productData[productName].trials += 1;
      });

      // Count purchases for each product
      filteredPurchaseLogs.forEach(log => {
        const productName = log.product.name;
        if (!productData[productName]) {
          productData[productName] = { trials: 0, purchases: 0 };
        }
        productData[productName].purchases += 1;
      });

      // Extract data for the chart
      const productNames = Object.keys(productData);
      const trialsData = productNames.map(name => productData[name].trials);
      const purchasesData = productNames.map(name => productData[name].purchases);

      // Set chart data
      setChartData({
        labels: productNames,
        datasets: [
          {
            label: 'Trials',
            data: trialsData,
            backgroundColor: 'rgba(255, 99, 132, 0.6)', // Red for trials
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1,
          },
          {
            label: 'Purchases',
            data: purchasesData,
            backgroundColor: 'rgba(54, 162, 235, 0.6)', // Blue for purchases
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1,
          },
        ],
      });
    }
  }, [trialLogs, purchaseLogs, selectedBrand]);

  return (
    <div style={{ width: '100%', height: '500px' }}>
      {/* Brand Selection Dropdown */}
      <div>
        <label htmlFor="brand-select">Select Brand: </label>
        <select
          id="brand-select"
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

      {/* Bar Chart */}
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
            plugins: {
              title: {
                display: true,
                text: `Trials to Purchase Ratio by Product ${selectedBrand !== 'All' ? `for ${selectedBrand}` : ''}`
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

export default TrialToPurchase;
