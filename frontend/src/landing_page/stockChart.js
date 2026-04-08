import React, { useEffect, useState } from "react";
import axios from "axios";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler
);

const StockChart = ({ symbol = "RELIANCE.NS" }) => {
    const [chartData, setChartData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        axios.get(`http://localhost:3002/stock/${symbol}`)
            .then(res => {
                // The backend now returns { quotes: [{ date, close }, ...] }
                const rawQuotes = res.data.quotes;

                if (rawQuotes && rawQuotes.length > 0) {
                    const labels = rawQuotes.map(q => new Date(q.date).toLocaleDateString());
                    const prices = rawQuotes.map(q => q.close);

                    setChartData({
                        labels,
                        datasets: [
                            {
                                label: `${symbol} (NSE)`,
                                data: prices,
                                borderColor: '#387ed1',
                                backgroundColor: 'rgba(56, 126, 209, 0.1)',
                                fill: true,
                                tension: 0.3,
                                pointRadius: 1,
                                borderWidth: 2,
                            },
                        ],
                    });
                } else {
                    console.warn("STOCK DATA MISSING FROM RESPONSE:", res.data);
                }
                setLoading(false);
            })
            .catch(err => {
                console.error("AXIOS CHART ERROR:", err);
                setLoading(false);
            });
    }, [symbol]);

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: false,
            },
        },
        scales: {
            y: {
                beginAtZero: false,
                grid: {
                    color: '#f0f0f0'
                }
            },
            x: {
                grid: {
                    display: false
                }
            }
        }
    };

    if (loading) return <div className="p-5 text-center">🔄 Loading market snapshot...</div>;
    if (!chartData) return <div className="p-5 text-center text-danger">⚠️ Market data currently unavailable.</div>;

    return (
        <div className="container-fluid p-0">
            <Line options={options} data={chartData} />
        </div>
    );
};

export default StockChart;
