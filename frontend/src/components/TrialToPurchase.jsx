import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import axios from 'axios';
import { Form } from 'react-bootstrap';
import './MUI.css';

// Register necessary components for the Bar chart
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const TrialToPurchase = () => {
  const [trialLogs, setTrialLogs] = useState([]);
  const [purchaseLogs, setPurchaseLogs] = useState([]);
  const [chartData, setChartData] = useState(null);
  const [selectedBrand, setSelectedBrand] = useState('All');
  const [selectedProduct, setSelectedProduct] = useState('All');
  const [brands, setBrands] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Fetch trial logs
    axios.get('http://localhost:8080/api/track/trial/all')
      .then(response => {
        setTrialLogs(response.data);
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
    if (selectedBrand !== 'All') {
      const uniqueProducts = Array.from(new Set(trialLogs
        .filter(log => log.product.brand.name === selectedBrand)
        .map(log => log.product.name)));
      setProducts([ ...uniqueProducts]);
    } else {
      setProducts([]);
    }
  }, [selectedBrand, trialLogs]);

  useEffect(() => {
    if (trialLogs.length > 0 && purchaseLogs.length > 0) {
      const productData = {};

      const filteredTrialLogs = selectedBrand === 'All' ? trialLogs : trialLogs.filter(log => log.product.brand.name === selectedBrand);
      const filteredPurchaseLogs = selectedBrand === 'All' ? purchaseLogs : purchaseLogs.filter(log => log.product.brand.name === selectedBrand);

      const finalTrialLogs = selectedProduct === 'All' ? filteredTrialLogs : filteredTrialLogs.filter(log => log.product.name === selectedProduct);
      const finalPurchaseLogs = selectedProduct === 'All' ? filteredPurchaseLogs : filteredPurchaseLogs.filter(log => log.product.name === selectedProduct);

      finalTrialLogs.forEach(log => {
        const productName = log.product.name;
        if (!productData[productName]) {
          productData[productName] = { trials: 0, purchases: 0 };
        }
        productData[productName].trials += 1;
      });

      finalPurchaseLogs.forEach(log => {
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
  }, [trialLogs, purchaseLogs, selectedBrand, selectedProduct]);

  return (
    <div className='container'>
      {/* Title */}
      <div className='mb-3'>
        <h2 className='badge text-light fs-4'>Trials:Purchase</h2>
      </div>

      {/* Selectors Row */}
      <div className='d-flex align-items-center mb-4'>
        {/* Brand Selector */}
        <div className='container align-items-center'>
          <div className='text-light'>Select Brand: </div>
          <Form.Select
            id="brand-select"
            className='w-auto me-3'
            value={selectedBrand}
            onChange={e => {
              setSelectedBrand(e.target.value);
              setSelectedProduct('All');
            }}
          >
            {brands.map(brand => (
              <option key={brand} value={brand}>
                {brand}
              </option>
            ))}
          </Form.Select>
        </div>

        {/* Product Selector */}
        <div className='container align-items-center'>
          <div className='text-light'>Select Product: </div>
          <Form.Select
            id="product-select"
            className='w-auto'
            value={selectedProduct}
            onChange={e => setSelectedProduct(e.target.value)}
          >
            <option value="All">All</option>
            {products.map(product => (
              <option key={product} value={product}>
                {product}
              </option>
            ))}
          </Form.Select>
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
  );
};

export default TrialToPurchase;


// import React, { useState, useEffect } from 'react';
// import { Bar } from 'react-chartjs-2';
// import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
// import axios from 'axios';
// import '../App.css';

// ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

// const TrialToPurchase = () => {
//   const [trialLogs, setTrialLogs] = useState([]);
//   const [purchaseLogs, setPurchaseLogs] = useState([]);
//   const [chartData, setChartData] = useState(null);
//   const [selectedBrand, setSelectedBrand] = useState('All');
//   const [brands, setBrands] = useState([]);

//   useEffect(() => {
//     // Fetch trial logs
//     axios.get('http://localhost:8080/api/track/trial/all')
//       .then(response => {
//         setTrialLogs(response.data);
//         // Extract unique brands from trial logs
//         const uniqueBrands = Array.from(new Set(response.data.map(log => log.product.brand.name)));
//         setBrands(['All', ...uniqueBrands]);
//       })
//       .catch(error => console.error('Error fetching trial logs:', error));

//     // Fetch purchase logs
//     axios.get('http://localhost:8080/api/track/purchase')
//       .then(response => {
//         setPurchaseLogs(response.data);
//       })
//       .catch(error => console.error('Error fetching purchase logs:', error));
//   }, []);

//   useEffect(() => {
//     if (trialLogs.length > 0 && purchaseLogs.length > 0) {
//       // Create a mapping for products
//       const productData = {};

//       // Filter logs based on the selected brand
//       const filteredTrialLogs = selectedBrand === 'All' ? trialLogs : trialLogs.filter(log => log.product.brand.name === selectedBrand);
//       const filteredPurchaseLogs = selectedBrand === 'All' ? purchaseLogs : purchaseLogs.filter(log => log.product.brand.name === selectedBrand);

//       // Count trials for each product
//       filteredTrialLogs.forEach(log => {
//         const productName = log.product.name;
//         if (!productData[productName]) {
//           productData[productName] = { trials: 0, purchases: 0 };
//         }
//         productData[productName].trials += 1;
//       });

//       // Count purchases for each product
//       filteredPurchaseLogs.forEach(log => {
//         const productName = log.product.name;
//         if (!productData[productName]) {
//           productData[productName] = { trials: 0, purchases: 0 };
//         }
//         productData[productName].purchases += 1;
//       });

//       // Extract data for the chart
//       const productNames = Object.keys(productData);
//       const trialsData = productNames.map(name => productData[name].trials);
//       const purchasesData = productNames.map(name => productData[name].purchases);

//       // Set chart data
//       setChartData({
//         labels: productNames,
//         datasets: [
//           {
//             label: 'Trials',
//             data: trialsData,
//             backgroundColor: 'rgba(255, 99, 132, 0.6)', // Red for trials
//             borderColor: 'rgba(255, 99, 132, 1)',
//             borderWidth: 1,
//           },
//           {
//             label: 'Purchases',
//             data: purchasesData,
//             backgroundColor: 'rgba(54, 162, 235, 0.6)', // Blue for purchases
//             borderColor: 'rgba(54, 162, 235, 1)',
//             borderWidth: 1,
//           },
//         ],
//       });
//     }
//   }, [trialLogs, purchaseLogs, selectedBrand]);

//   return (
//     <div className='container'>
//       {/* Title */}
//       <div className='mb-3'>
//         <h2 className='badge text-light fs-4'>Trials:Purchase</h2>
//       </div>

//       {/* Brand Selector */}
//       <div className='d-flex align-items-center mb-4'>
//         <label htmlFor="brand-select" className='text-light me-2'>Select Brand: </label>
//         <select
//           id="brand-select"
//           className='form-select w-auto'
//           value={selectedBrand}
//           onChange={e => setSelectedBrand(e.target.value)}
//         >
//           {brands.map(brand => (
//             <option key={brand} value={brand}>
//               {brand}
//             </option>
//           ))}
//         </select>
//       </div>

//       {/* Bar Chart */}
//       <div className='row'>
//         {chartData ? (
//           <Bar
//             data={chartData}
//             options={{
//               responsive: true,
//               scales: {
//                 x: {
//                   title: {
//                     display: true,
//                     text: 'Products'
//                   }
//                 },
//                 y: {
//                   title: {
//                     display: true,
//                     text: 'Number of Trials/Purchases'
//                   },
//                   beginAtZero: true,
//                 }
//               },
//             }}
//           />
//         ) : (
//           <p>Loading chart...</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default TrialToPurchase;