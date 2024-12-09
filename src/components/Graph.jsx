import React from 'react';
import { Pie, Line, Bar } from 'react-chartjs-2';
import './Graph.css';

function Graph({ transactions }) {
  // Aggregate data for categories (Pie Chart)
  const categories = transactions.reduce((acc, transaction) => {
    if (transaction.type === 'expense') {
      acc[transaction.category] = (acc[transaction.category] || 0) + transaction.amount;
    }
    return acc;
  }, {});

  // Aggregate daily data (Line Chart)
  const dailyData = transactions.reduce((acc, transaction) => {
    if (transaction.type === 'expense') {
      const date = new Date(transaction.id).toLocaleDateString(); // Convert timestamp to date
      acc[date] = (acc[date] || 0) + transaction.amount;
    }
    return acc;
  }, {});

  // Aggregate monthly data for Bar Chart
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  const monthlyData = transactions.reduce((acc, transaction) => {
    if (transaction.type === 'expense') {
      const month = new Date(transaction.id).getMonth();
      acc[months[month]] = (acc[months[month]] || 0) + transaction.amount;
    }
    return acc;
  }, {});

  // Data for charts
  const pieData = {
    labels: Object.keys(categories),
    datasets: [
      {
        data: Object.values(categories),
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4CAF50', '#FF9800'],
      },
    ],
  };

  const lineData = {
    labels: Object.keys(dailyData),
    datasets: [
      {
        label: 'Daily Expenses',
        data: Object.values(dailyData),
        fill: false,
        borderColor: '#42A5F5',
        tension: 0.1,
      },
    ],
  };

  const barData = {
    labels: Object.keys(monthlyData),
    datasets: [
      {
        label: 'Monthly Expenses',
        data: Object.values(monthlyData),
        backgroundColor: '#FF9800',
      },
    ],
  };

  const chartOptions = {
    maintainAspectRatio: false,
    responsive: true,
  };

  return (
    <div className="graph-container">
      <h3>Expense Analysis</h3>
      <div className="charts-grid">
        {/* Pie Chart */}
        <div className="chart">
          <h4>Category-Wise Expenses</h4>
          <Pie data={pieData} options={chartOptions} />
        </div>

        {/* Line Chart */}
        <div className="chart">
          <h4>Daily Expenses</h4>
          <Line data={lineData} options={chartOptions} />
        </div>

        {/* Bar Chart */}
        <div className="chart">
          <h4>Monthly Expenses</h4>
          <Bar data={barData} options={chartOptions} />
        </div>
      </div>
    </div>
  );
}

export default Graph;
