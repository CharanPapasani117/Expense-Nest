// DoughnutChart.js
import React, { useEffect } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import CreateAsset from './CreateAsset.tsx';
import AssetsList from './AssetsList.tsx';
import { FaChartLine, FaCreditCard, FaExchangeAlt, FaHome, FaListAlt, FaSignOutAlt } from 'react-icons/fa';

// Register necessary Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

const Sidebar = () => (
  <div className="h-100 d-flex flex-column" style={{width: '200px', position: 'fixed', left: 0, top: 0, bottom: 0, backgroundColor: '#ffffff', borderRight: '1px solid #e0e0e0'}}>
    <h3 className="p-3">EXPENSES</h3>
    <nav className="nav flex-column">
      <a className="nav-link active" href="#"><FaHome /> Dashboard</a>
      <a className="nav-link" href="#"><FaExchangeAlt /> Income</a>
      <a className="nav-link" href="#"><FaListAlt /> Expenses</a>
      <a className="nav-link" href="#"><FaCreditCard /> Assets/Debts</a>
      <a className="nav-link" href="#"><FaChartLine /> Saving Goals</a>
    </nav>
    <div className="mt-auto">
      <a className="nav-link" href="#"><FaSignOutAlt /> Log out</a>
    </div>
  </div>
);

const DoughnutChart = () => {
    const [assets,setAssets] = React.useState([]);

    const formatValue = (value) => {
        return new Intl.NumberFormat( 'en-US', 
        { style: 'currency', currency: 'USD' }).format(value);
    };

    useEffect(() => {
        fetch('http://localhost:8080/getAllAssets').
        then(response => response.json()).
        then(data => setAssets(data))
        .catch(error => console.log(error));
    },[]);

    // console.log(assets);

    let totalAssetValue = 0;

    for (let i=0;i<assets.length;i++){
        totalAssetValue += assets[i].assetValue;
    }

    totalAssetValue = formatValue(totalAssetValue);
    // console.log(totalAssetValue);

  // Chart data
  const data = {
    labels: assets.map(asset => asset.assetName),
    // labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
    datasets: [
      {
        label: '$',
        data: assets.map(asset => asset.assetValue),

        backgroundColor: [
        //   'rgba(255, 99, 132, 0.2)',
        //   'rgba(54, 162, 235, 0.2)',
        //   'rgba(255, 206, 86, 0.2)',
        //   'rgba(75, 192, 192, 0.2)',
        //   'rgba(153, 102, 255 , 0.2)',
        //   'rgba(255, 159, 64, 0.2)',
        'red','blue','yellow','green','purple','orange',
        'pink', 'brown', 'cyan', 'magenta', 'teal', 'lavender',
        ],
        // borderColor: [
        //   'rgba(255, 99, 132, 1)',
        //   'rgba(54, 162, 235, 1)',
        //   'rgba(255, 206, 86, 1)',
        //   'rgba(75, 192, 192, 1)',
        //   'rgba(153, 102, 255, 1)',
        //   'rgba(255, 159, 64, 1)',
        // ],
        borderColor: 'black',
        borderWidth: 2,
        hoverBorderWidth: 4,
      },
    ],
  };

  // Chart configuration (optional)
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: function(tooptipItem) {
        console.log(tooptipItem);
        const asset = assets[tooptipItem.dataIndex];
        return [
            `Asset Type: ${asset.assetType}`,
            `Asset Name: ${asset.assetName}`,
            `Asset Value: $${asset.assetValue}`,
            `Asset Details: ${asset.assetDetails}`,
        ];
      },
    },
  };

  return (
    // <div className="d-flex min-vh-100" style={{backgroundColor: '#ffffff'}}>
    //   <Sidebar />
    <div className='container'>
        <div className='row justify-content-center'>
            <div className='col-12 col-md-6 col-lg-6'>
                <div style={{ position: 'relative', height: '400px', width: '100%' }} className='p3'>
                    <h1 style={{textAlign: 'center',color: 'black'}}>Asset Tracker</h1>
                    <Doughnut data={data} options={options} />
                    <h3>Total Asset Value: {totalAssetValue}</h3>
                </div>
            </div>
            <div className='col-12 col-md-6 col-lg-6'>
                <div className='p-3 mt-5 ml-5'>
                <h1 style={{textAlign: 'center',color: 'black'}}>Create Asset</h1>
                    <CreateAsset />
                </div>
            </div>
            <div>
                <h1 style={{textAlign: 'center',color: 'black'}}>Asset List</h1>
                <AssetsList />
            </div>
        </div>
       
    </div>
    // </div>
  );
};

export default DoughnutChart;
