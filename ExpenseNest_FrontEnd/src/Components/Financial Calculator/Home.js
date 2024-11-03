import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Home.css';
import Sidebar from '../Sidebar';
function Home() {
    const [isSidebarOpen, setSidebarOpen] = useState(true);
    const isMobile = window.innerWidth <= 768; // Example breakpoint for mobile

    const toggleSidebar = () => {
        setSidebarOpen(!isSidebarOpen);
    };

    return (
        <div style={{ display: 'flex' }}>
            <Sidebar isMobile={isMobile} isOpen={isSidebarOpen} />
            <div className="home-container">
                <h1>FINANCIAL CALCULATOR</h1>
                <div className="button-group">
                <Link to="/loan-calculator">
                    <button className="option-btn">Loan Calculator</button>
                </Link>
                <Link to="/financial-goals-calculator">
                    <button className="option-btn">Financial Goals Calculator</button>
                </Link>
            </div>
        </div>
        </div>
    );
}

export default Home;
