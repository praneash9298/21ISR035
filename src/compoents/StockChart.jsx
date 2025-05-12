import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, PointElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';

ChartJS.register(LineElement, PointElement, CategoryScale, LinearScale, Tooltip, Legend);

const StockChart = ({ data }) => {
  const labels = data.map(item => new Date(item.lastUpdatedAt).toLocaleTimeString());
  const prices = data.map(item => item.price);
  const avgPrice = prices.reduce((a, b) => a + b, 0) / prices.length;

  return (
    <Line
      data={{
        labels,
        datasets: [
          {
            label: 'Price',
            data: prices,
            borderColor: 'blue',
            backgroundColor: 'rgba(0,0,255,0.1)',
            tension: 0.2,
          },
          {
            label: 'Average',
            data: new Array(prices.length).fill(avgPrice),
            borderColor: 'red',
            borderDash: [5, 5],
            pointRadius: 0,
          },
        ],
      }}
    />
  );
};

export default StockChart;