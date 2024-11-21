import React from 'react';
import { NavLink } from 'react-router-dom';
import { BsFillGridFill, BsCashStack, BsPiggyBank, BsFileText, BsLightbulb, BsCalculator, BsCalendar, BsBoxArrowRight, BsPerson } from 'react-icons/bs'; // Import the desired icon

const Sidebar = ({ isMobile, isOpen, onToggle }) => {
  const menuItems = [
    { name: 'Dashboard', path: '/dashboard', icon: <BsFillGridFill /> },
    { name: 'Expense', path: '/expense', icon: <BsCashStack/>},
    { name: 'Income', path: '/income', icon: <BsCashStack /> },
    { name: 'Budgeting', path: '/budgeting', icon: <BsCashStack /> },
    { name: 'Assets', path: '/asset', icon: <BsPiggyBank /> },
    { name: 'Debts', path: '/debtTracker', icon: <BsFileText /> },
    { name: 'Advising', path: '/schedulingAppt', icon: <BsCalendar /> },
    { name: 'Calculator', path: '/financialCal', icon: <BsCalculator /> },
    { name: 'Suggestions', path: '/suggestions', icon: <BsLightbulb /> },
    { name: 'Prediction', path: '/prediction', icon: <BsCalculator /> },
  ];

  return (
    <div 
      className="sidebar" 
      style={{
        width: '130px', // Increased width for better spacing
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
        alignItems: 'flex-start', // Align items to the left
        paddingTop: '2rem',
        transform: isMobile ? (isOpen ? 'translateX(0)' : 'translateX(-100%)') : 'translateX(0)',
        transition: 'transform 0.3s ease-in-out',
      }}
    >
      <div style={{ padding: '1rem', color: 'white', fontSize: '1rem', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '8px' }}>
        {/* <BsHouseDoor />  */}
        ExpenseNest
      </div>
      <nav className="nav flex-column align-items-start" style={{ flex: 1, width: '100%' }}>
      {menuItems.map((item) => (
  <NavLink 
    key={item.name}
    to={item.path}
    className="nav-link mb-2 d-flex align-items-center" // Changed mb-4 to mb-2 for smaller margin
    style={{ 
      color: 'white',
      opacity: 0.75,
      transition: 'opacity 0.2s, background-color 0.2s, color 0.2s',
      padding: '10px',
      borderRadius: '8px',
      textAlign: 'left',
      width: '90%',
      fontSize: '0.9rem',
      textDecoration: 'none',
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
    }}
    activeStyle={{
      opacity: 1,
      backgroundColor: 'white',
      color: 'black',
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.backgroundColor = 'white';
      e.currentTarget.style.color = 'black';
    }}
    onMouseLeave={(e) => {
      if (!e.currentTarget.classList.contains('active')) {
        e.currentTarget.style.backgroundColor = '';
        e.currentTarget.style.color = 'white';
      }
    }}
  >
    {item.icon}
    <span>{item.name}</span>
  </NavLink>
))}

      </nav>
      <div 
        style={{ 
          marginBottom: '1.5rem',
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <NavLink 
          to="/profile"
          className="nav-link d-flex align-items-center" 
          style={{ 
            color: 'white',
            opacity: 0.75,
            transition: 'opacity 0.2s, background-color 0.2s, color 0.2s',
            padding: '10px',
            borderRadius: '8px',
            textAlign: 'left', // Align text to the left
            width: '90%',
            fontSize: '0.9rem',
            textDecoration: 'none',
            display: 'flex',
            alignItems: 'center',
            gap: '8px', // Space between icon and text
          }}
          activeStyle={{
            opacity: 1,
            backgroundColor: 'white',
            color: 'black',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = 'white';
            e.currentTarget.style.color = 'black';
          }}
          onMouseLeave={(e) => {
            if (!e.currentTarget.classList.contains('active')) {
              e.currentTarget.style.backgroundColor = '';
              e.currentTarget.style.color = 'white';
            }
          }}
        >
          <BsPerson/>
          <span>Profile</span>
        </NavLink>
      </div>
    </div>
  );
};

export default Sidebar;
