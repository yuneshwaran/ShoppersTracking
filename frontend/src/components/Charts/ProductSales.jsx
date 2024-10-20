import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import axios from 'axios';
import dayjs from 'dayjs';
import { Chart, registerables } from 'chart.js';
import { Button } from 'react-bootstrap';

Chart.register(...registerables);

const ProductSales = () => {
    const [purchaseLogs, setPurchaseLogs] = useState([]);
    const [brands, setBrands] = useState([]);
    const [chartData, setChartData] = useState(null);
    const [monthOffset, setMonthOffset] = useState(0);
    const token = localStorage.getItem('jwt');

    useEffect(() => {
        const fetchData = async () => {
            const [purchaseResponse, brandResponse] = await Promise.all([
                axios.get('http://localhost:8080/api/track/purchase', { headers: { Authorization: `Bearer ${token}` } }),
                axios.get('http://localhost:8080/api/brand', { headers: { Authorization: `Bearer ${token}` } }),
            ]);
            setPurchaseLogs(purchaseResponse.data);
            setBrands(brandResponse.data);
        };

        fetchData();
    }, [token]);

    const calculateSalesDataForMonth = (month, year) => {
        const salesPerBrand = Object.fromEntries(brands.map(brand => [brand.name, 0]));

        purchaseLogs.forEach(purchase => {
            const purchaseDate = dayjs(purchase.purchaseDate);
            if (purchaseDate.month() === month && purchaseDate.year() === year) {
                salesPerBrand[purchase.product.brand.name] += purchase.quantity;
            }
        });

        return salesPerBrand;
    };

    useEffect(() => {
        const currentMonth = dayjs().month();
        const monthToDisplay = (currentMonth - monthOffset + 12) % 12;
        const adjustedYear = dayjs().year() + Math.floor((currentMonth - monthOffset) / 12);

        const salesData = calculateSalesDataForMonth(monthToDisplay, adjustedYear);
        const salesCounts = brands.map(brand => salesData[brand.name] || 0);

        setChartData({
            labels: brands.map(brand => brand.name),
            datasets: [{
                label: `Sales for ${dayjs().subtract(monthOffset, 'month').format('MMMM YYYY')}`,
                data: salesCounts,
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
            }],
        });
    }, [purchaseLogs, brands, monthOffset]);

    const handlePreviousMonth = () => setMonthOffset(prev => prev + 1);
    const handleNextMonth = () => setMonthOffset(prev => (prev > 0 ? prev - 1 : 0));

    return (
        <div className="container" style={{ maxWidth: '100%' }}>
            <h2 className="badge text-light fs-4">
                Sales Per Brand for {dayjs().subtract(monthOffset, 'month').format('MMMM YYYY')}
            </h2>
            <div className="d-flex justify-content-between mb-4">
                <Button variant="primary" onClick={handlePreviousMonth}>Previous Month</Button>
                <Button variant="primary" onClick={handleNextMonth} disabled={monthOffset === 0}>Next Month</Button>
            </div>
            {chartData ? (
                <Bar
                    data={chartData}
                    options={{
                        responsive: true,
                        plugins: {
                            legend: { position: 'top' },
                            tooltip: { enabled: true },
                        },
                        scales: {
                            x: { title: { display: true, text: 'Brand' } },
                            y: { title: { display: true, text: 'Sales Count' }, beginAtZero: true, ticks: { min: 0 } },
                        },
                    }}
                />
            ) : (
                <p>Loading chart...</p>
            )}
        </div>
    );
};

export default ProductSales;
