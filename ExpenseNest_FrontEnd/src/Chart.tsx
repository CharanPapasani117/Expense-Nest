// DoughnutChart.tsx
import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

// Register chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

// Define interface for props if needed (optional)
interface DoughnutChartProps {
  data: number[];
  labels: string[];
}

// Component
const Chartt: React.FC<DoughnutChartProps> = ({ data, labels }) => {
  // Prepare data object for the chart
  const chartData = {
    labels: labels,
    datasets: [
      {
        label: 'Dataset',
        data: data,
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  // Chart options (optional)
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const, // TypeScript infers the type of legend position
      },
      tooltip: {
        enabled: true,
      },
    },
  };

  return (
    <div style={{ width: '400px', margin: '0 auto' }}>
      <h2>Doughnut Chart Example</h2>
      <Doughnut data={chartData} options={options} />
    </div>
  );
};

export default Chartt;
