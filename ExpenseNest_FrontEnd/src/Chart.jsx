import React, { useEffect } from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import Sidebar from "./Components/Sidebar";
import CreateAsset from "./CreateAsset.tsx";
import AssetsList from "./AssetsList.tsx";

ChartJS.register(ArcElement, Tooltip, Legend);

const DoughnutChart = () => {
  const [assets, setAssets] = React.useState([]);

  // Format value as currency
  const formatValue = (value) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(value);
  };

  useEffect(() => {
    fetch("http://localhost:8080/getAllAssets")
      .then((response) => response.json())
      .then((data) => setAssets(data))
      .catch((error) => console.log(error));
  }, []);

  // Group assets by assetType and calculate total value per type
  const groupedAssets = assets.reduce((acc, asset) => {
    acc[asset.assetType] = (acc[asset.assetType] || 0) + asset.assetValue;
    return acc;
  }, {});

  // Prepare data for the Doughnut chart
  const data = {
    labels: Object.keys(groupedAssets), // Asset types
    datasets: [
      {
        label: "Asset Value",
        data: Object.values(groupedAssets), // Total values for each type
        backgroundColor: [
          'rgba(56, 183, 192, 0.8)',  // Teal
        'rgba(255, 191, 0, 0.8)',   // Amber
        'rgba(75, 0, 130, 0.8)',    // Indigo
        'rgba(220, 20, 60, 0.8)',   // Crimson
        'rgba(80, 200, 120, 0.8)',  // Emerald
        'rgba(65, 105, 225, 0.8)',
        ],
        borderColor: "black",
        borderWidth: 2,
        hoverBorderWidth: 4,
      },
    ],
  };

  // Total asset value
  const totalAssetValue = formatValue(
    Object.values(groupedAssets).reduce((sum, value) => sum + value, 0)
  );

  // Chart configuration (optional)
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
      },
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            const assetType = tooltipItem.label;
            const value = tooltipItem.raw;
            return `${assetType}: ${formatValue(value)}`;
          },
        },
      },
    },
  };

  return (
    <div className="container">
      <Sidebar />
      <div className="row justify-content-center">
        <div className="col-12 col-md-6 col-lg-6">
          <div style={{ position: "relative", height: "400px", width: "100%" }} className="p-3">
            <h1 style={{ textAlign: "center", color: "black" }}>Asset Tracker</h1>
            <Doughnut data={data} options={options} />
            <h3 className="text-center mt-3">Total Asset Value: {totalAssetValue}</h3>
          </div>
        </div>
        <div className="col-12 col-md-6 col-lg-6">
          <div className="p-3 mt-5">
            <h1 style={{ textAlign: "center", color: "black" }}>Create Asset</h1>
            <CreateAsset />
          </div>
        </div>
        <div className="col-12 mt-4">
          <h1 style={{ textAlign: "center", color: "black" }}>Asset List</h1>
          <AssetsList />
        </div>
      </div>
    </div>
  );
};

export default DoughnutChart;
