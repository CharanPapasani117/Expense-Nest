import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart, ArcElement } from 'chart.js';
// import { cut } from '@testing-library/user-event/dist/cjs/clipboard/cut.js';
import Labels from './Labels';

Chart.register(ArcElement);

const data = {
  datasets: [{
    data: [45, 25, 20, 15],
    backgroundColor: [
      '#F04848',
      '#FDBD28',
      '#F7E092',
      '#37AD86',
    ],
    hoverOffset: 1,
    borderRadius: 10,
    spacing: 10,
    borderWidth: 0 // Set borderWidth to 0 to remove the border
  }],
  options: {
    responsive: true,
    maintainAspectRatio: false,
  },
};

const options = {
  cutout: '75%', // Adjust cutout for the doughnut (percentage or value)
};

export default function Graph() {
  const total = data.datasets[0].data.reduce((a, b) => a + b, 0);

  return (
    <div className="flex justify-content max-w-xs mx-auto">
      <div className="item">
        <div className="chart relative">
          <Doughnut data={data} options={options} />
          <h3 className="mb-4 font-bold title text-black">Total:
            <span className="block text-3xl text-red-400">${total}</span>
          </h3>
        </div>
        <div className="flex flex-col py-10 gap-4">
          {/*Labels*/}
          <Labels></Labels>
        </div>
      </div>
    </div>
  );
}
