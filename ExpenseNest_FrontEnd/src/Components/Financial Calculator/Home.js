import React from 'react';
import { Link } from 'react-router-dom';
import './CalCss.css'; // Adjust the path if necessary
import { FaChartLine, FaCreditCard, FaExchangeAlt, FaHome, FaListAlt, FaSignOutAlt } from 'react-icons/fa';

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

function Home() {
    return (
        <div className="d-flex min-vh-100" style={{backgroundColor: '#ffffff'}}>
        <Sidebar />
        <div className="home-container">
            <h1>Financial Calculator</h1>
            <Link to="/loan-calculator">
                <button className="option-btn">Loan Calculator</button>
            </Link>
            <Link to="/financial-goals-calculator">
                <button className="option-btn">Financial Goals Calculator</button>
            </Link>
        </div>
        </div>
    );
}

export default Home;