import React from 'react';
import { NavLink } from 'react-router-dom';

const Sidebar = ({ isMobile, isOpen, onToggle }) => (
  <div className="sidebar" style={{
    width: '120px',
    height: '100vh', 
    position: 'fixed', 
    left: 0, 
    top: 0, 
    bottom: 0, 
    backgroundColor: '#1A2B4A',
    backgroundImage: 'linear-gradient(180deg, #1A2B4A 0%, #4A8895 100%)',
    zIndex: 1000,
    boxShadow: '2px 0 4px rgba(0,0,0,0.1)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    paddingTop: '2rem',
    transform: isMobile ? (isOpen ? 'translateX(0)' : 'translateX(-100%)') : 'translateX(0)',
    transition: 'transform 0.3s ease-in-out'
  }}>
    <nav className="nav flex-column align-items-center" style={{ flex: 1, width: '100%' }}>
      {[
        { name: 'Income', path: '/income' },
        { name: 'Expenses', path: '/expense' },
        { name: 'Assets', path: '/asset' },
        { name: 'Debts', path: '/debtTracker' },
        { name: 'Goals', path: '/goals' },
        { name: 'Budget', path: '/budget' },
        { name: 'Calculator', path: '/financialCal' },
        { name: 'Advising', path: '/schedulingAppt' },
      ].map((item) => (
        <NavLink 
          key={item.name}
          to={item.path}
          className="nav-link mb-4" 
          style={{ 
            color: 'white',
            opacity: 0.75,
            transition: 'opacity 0.2s',
            padding: '8px',
            borderRadius: '8px',
            textAlign: 'center',
            width: '100%',
            fontSize: '0.9rem',
            textDecoration: 'none'
          }}
          activeStyle={{
            opacity: 1,
            backgroundColor: '#4A8895'
          }}
        >
          {item.name}
        </NavLink>
      ))}
    </nav>
    <div style={{ 
      marginBottom: '1.5rem',
      width: '100%',
      display: 'flex',
      justifyContent: 'center'
    }}>
      <NavLink 
        to="/logout"
        className="nav-link" 
        style={{ 
          color: 'white',
          opacity: 0.75,
          transition: 'opacity 0.2s',
          padding: '8px',
          borderRadius: '8px',
          textAlign: 'center',
          width: '100%',
          fontSize: '0.9rem',
          textDecoration: 'none'
        }}
        activeStyle={{
          opacity: 1,
          backgroundColor: '#4A8895'
        }}
      >
        Logout
      </NavLink>
    </div>
  </div>
);

export default Sidebar;
