import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import { Form } from 'react-bootstrap';
import axios from 'axios';
import './Charts.css';

const TrialToPurchase = () => {

  const [trialLogs, setTrialLogs] = useState([]);
  const [purchaseLogs, setPurchaseLogs] = useState([]);
  const [chartData, setChartData] = useState(null);
  const [selectedBrand, setSelectedBrand] = useState('All');
  const [selectedProduct, setSelectedProduct] = useState('All');
  const [brands, setBrands] = useState(['All']);
  const [products, setProducts] = useState([]);
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

  useEffect(() => {
    if (selectedBrand !== 'All') {
      const filteredProducts = trialLogs
        .filter(log => log.product.brand.name === selectedBrand)
        .map(log => log.product.name);

      setProducts([ ...new Set(filteredProducts)]);
    } else {
      setProducts([]);
    }
  }, [selectedBrand, trialLogs]);


  useEffect(() => {
    const productData = {};

    const filteredTrials = selectedBrand === 'All' ? 
        trialLogs : 
        trialLogs.filter(log => log.product.brand.name === selectedBrand);

    const filteredPurchases = selectedBrand === 'All' ? 
        purchaseLogs : 
        purchaseLogs.filter(log => log.product.brand.name === selectedBrand);

    const finalTrials = selectedProduct === 'All' ? filteredTrials : filteredTrials.filter(log => log.product.name === selectedProduct);
    const finalPurchases = selectedProduct === 'All' ? filteredPurchases : filteredPurchases.filter(log => log.product.name === selectedProduct);

    finalTrials.forEach(log => {
      const productName = log.product.name;
      if (!productData[productName]) {
        productData[productName] = { trials: 0, purchases: 0 };
      }
      productData[productName].trials += 1;
    });

    finalPurchases.forEach(log => {
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
  }, [trialLogs, purchaseLogs, selectedBrand, selectedProduct]);

  return (
    <div className='container'>
      <h2 className='badge text-light fs-4'>Trials to Sales Ratio</h2>

      <div className='d-flex align-items-center mb-4'>
        <div className='container align-items-center'>
          <div className='text-light'>Select Brand: </div>
          <Form.Select
            value={selectedBrand}
            onChange={(e) => { 
              setSelectedBrand(e.target.value);
              setSelectedProduct('All');
            }}
          >
            {brands.map((brand) => (
              <option key={brand} value={brand}>{brand}</option>
            ))}
          </Form.Select>
        </div>

        <div className='container align-items-center'>
          <div className='text-light'>Select Product: </div>
          <Form.Select
            value={selectedProduct}
            onChange={(e) => setSelectedProduct(e.target.value)}
            disabled={products.length === 0}
          >
            <option value="All">All</option>
            {products.map(product => (
              <option key={product} value={product}>{product}</option>
            ))}
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
