import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart, ArcElement } from 'chart.js';
import Labels from './Labels';

Chart.register(ArcElement);

export default function Graph({ debts = [] }) {
  // Group debts by type and sum the amounts for each type
  const loanTypeData = debts.reduce((acc, debt) => {
    if (acc[debt.type]) {
      acc[debt.type] += debt.amount;
    } else {
      acc[debt.type] = debt.amount;
    }
    return acc;
  }, {});

  // Extract labels and data from the grouped object
  const chartLabels = Object.keys(loanTypeData);
  const chartData = Object.values(loanTypeData);
  const backgroundColors = ['#F04848', '#FDBD28', '#F7E092', '#37AD86', '#73B2E8', '#A29BFE']; // Add more colors if needed

  const data = {
    labels: chartLabels,
    datasets: [{
      data: chartData,
      backgroundColor: backgroundColors.slice(0, chartData.length),
      hoverOffset: 4,
      borderRadius: 10,
      spacing: 10,
      borderWidth: 0
    }],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: '75%', // Adjust this for the inner cutout size
  };

  const total = chartData.reduce((a, b) => a + b, 0);

  return (
    <div style={{ width: '400px', height: '400px', margin: '0 auto' }}>
      <div className="item">
        <div className="chart relative">
          <Doughnut data={data} options={options} width={400} height={400} />
          <h3 className="mb-4 font-bold title text-black">Total:
            <span className="block text-3xl text-red-400">${total.toFixed(2)}</span>
          </h3>
        </div>
        <div className="flex flex-col py-10 gap-4">
          {/* Labels */}
          <Labels debts={debts} />
        </div>
      </div>
    </div>
  );
}
