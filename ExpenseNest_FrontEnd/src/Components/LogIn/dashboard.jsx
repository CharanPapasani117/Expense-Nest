import React from 'react'
import './Dashboard.css';
import './App.css';

import { FaHome, FaExchangeAlt, FaListAlt, FaCreditCard, FaChartLine, FaCog } from 'react-icons/fa';
export default function DashBoard() {
  return (
    <div className="sidebar bg-dark text-light h-100 d-flex flex-column" style={{width: '200px', position: 'fixed', left: 0, top: 0, bottom: 0}}>
    <h3 className="p-3 text-light">EXPENSES</h3>
    <nav className="nav flex-column">
      <a className="nav-link text-light active" href="#"><FaHome /> Dashboard</a>
      <a className="nav-link text-light" href="#"><FaExchangeAlt /> Income</a>
      <a className="nav-link text-light" href="#"><FaListAlt /> Expenses</a>
      <a className="nav-link text-light" href="#"><FaCreditCard /> Assests/Debts</a>
      <a className="nav-link text-light" href="#"><FaChartLine /> Saving Goals</a>
      <a className="nav-link text-light" href="/financialCal"><FaChartLine /> Financial Calculator</a>
    </nav>
    <div className="mt-auto">
      <a className="nav-link text-light" href="#"><FaCog /> Settings</a>
    </div>
  </div>
  )
}