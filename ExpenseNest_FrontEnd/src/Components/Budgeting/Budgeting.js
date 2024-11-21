import React, { useState, useEffect } from 'react';
import { Modal, Button, Card, Container, Row, Col, Form } from 'react-bootstrap';
import { Home, ShoppingCart, Zap, Stethoscope, User, GraduationCap, CreditCard, Film, 
  MoreHorizontal, Plus, Tag, AlertTriangle, Trash2, Edit, Calendar, Menu } from 'lucide-react';
import './Budgeting.css';
import axios from 'axios';
import Sidebar from '../Sidebar';

const getCategoryIcon = (category) => {
  switch (category.toLowerCase()) {
    case 'housing': return <Home size={20} />;
    case 'groceries': return <ShoppingCart size={20} />;
    case 'utilities': return <Zap size={20} />;
    case 'health': return <Stethoscope size={20} />;
    case 'personal': return <User size={20} />;
    case 'education': return <GraduationCap size={20} />;
    case 'debts': return <CreditCard size={20} />;
    case 'entertainment': return <Film size={20} />;
    case 'miscellaneous': return <MoreHorizontal size={20} />;
    default: return <Tag size={20} />;
  }
};

const monthNames = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

// const Sidebar = ({ isMobile, isOpen, onToggle }) => (
//   <div className="sidebar" style={{
//     width: '120px',
//     height: '100vh',
//     position: 'fixed',
//     left: 0,
//     top: 0,
//     bottom: 0,
//     backgroundColor: '#1A2B4A',
//     backgroundImage: 'linear-gradient(180deg, #1A2B4A 0%, #4A8895 100%)',
//     zIndex: 1000,
//     boxShadow: '2px 0 4px rgba(0,0,0,0.1)',
//     display: 'flex',
//     flexDirection: 'column',
//     alignItems: 'center',
//     paddingTop: '2rem',
//     transform: isMobile ? (isOpen ? 'translateX(0)' : 'translateX(-100%)') : 'translateX(0)',
//     transition: 'transform 0.3s ease-in-out'
//   }}>
//     <nav className="nav flex-column align-items-center" style={{ flex: 1, width: '100%' }}>
//       {['Income', 'Expenses', 'Assets', 'Debts', 'Goals', 'Budget', 'Calculator', 'Advising'].map((item) => (
//         <a
//           key={item}
//           className="nav-link mb-4"
//           href="#"
//           style={{
//             color: 'white',
//             opacity: 0.75,
//             transition: 'opacity 0.2s',
//             padding: '8px',
//             borderRadius: '8px',
//             textAlign: 'center',
//             width: '100%',
//             fontSize: '0.9rem',
//             textDecoration: 'none'
//           }}
//         >
//           {item}
//         </a>
//       ))}
//     </nav>
//     <div style={{
//       marginBottom: '1.5rem',
//       width: '100%',
//       display: 'flex',
//       justifyContent: 'center'
//     }}>
//       <a
//         className="nav-link"
//         href="#"
//         style={{
//           color: 'white',
//           opacity: 0.75,
//           transition: 'opacity 0.2s',
//           padding: '8px',
//           borderRadius: '8px',
//           textAlign: 'center',
//           width: '100%',
//           fontSize: '0.9rem',
//           textDecoration: 'none'
//         }}
//       >
//         Logout
//       </a>
//     </div>
//   </div>
// );

const BudgetFilter = ({ selectedMonth, selectedYear, onMonthChange, onYearChange }) => {
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 5 }, (_, i) => currentYear - 2 + i);

  return (
    <div className="budget-filter">
      <div className="d-flex align-items-center mb-3">
        <Calendar size={20} className="me-2" style={{ color: '#4A8895' }} />
        <Form.Select
          value={selectedMonth}
          onChange={(e) => onMonthChange(e.target.value)}
          className="me-2"
        >
          {monthNames.map((month, index) => (
            <option key={month} value={index}>{month}</option>
          ))}
        </Form.Select>
        <Form.Select
          value={selectedYear}
          onChange={(e) => onYearChange(e.target.value)}
        >
          {years.map(year => (
            <option key={year} value={year}>{year}</option>
          ))}
        </Form.Select>
      </div>
    </div>
  );
};

const BudgetCard = ({ budget, expenses, onEdit, onDelete }) => {
  const spent = expenses
    .filter(expense => expense.category.toLowerCase() === budget.category.toLowerCase())
    .reduce((sum, expense) => sum + expense.amount, 0);

  const total = budget.amount;
  const leftToSpend = total - spent;
  const isOverspent = leftToSpend < 0;
  
  const percentageSpent = Math.min((spent / total) * 100, 100);
  const isNearLimit = percentageSpent >= 80 && percentageSpent < 100;
  
  const radius = 15.9155;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentageSpent / 100) * circumference;

  return (
    <div className="space-y-4">
      {isNearLimit && (
        <div className="flex items-center gap-3 p-4 mb-4 rounded-lg bg-amber-50 border border-amber-200">
          <AlertTriangle className="h-5 w-5 text-amber-500 flex-shrink-0" />
          <div>
            <h4 className="font-semibold text-amber-700 text-sm">Budget Alert</h4>
            <p className="text-amber-600 text-sm mt-1">
              You've used {percentageSpent.toFixed(1)}% of your {budget.category} budget. Only ${leftToSpend} remaining.
            </p>
          </div>
        </div>
      )}
      
      <div className="budget-card">
        <div className="budget-card-content">
          <div className="icon-container">
            <div className={`icon-circle ${
              isOverspent ? 'overspent' : 
              isNearLimit ? 'near-limit' : 
              leftToSpend === 0 ? 'completed' : 'active'
            }`}>
              {getCategoryIcon(budget.category)}
            </div>
            <svg className="progress-ring" viewBox="0 0 36 36">
              <circle
                cx="18"
                cy="18"
                r={radius}
                fill="none"
                stroke="#e6e6e6"
                strokeWidth="2"
              />
              <circle
                cx="18"
                cy="18"
                r={radius}
                fill="none"
                stroke={
                  isOverspent ? '#ff4d4d' : 
                  isNearLimit ? '#ffa500' : 
                  '#4A8895'
                }
                strokeWidth="2"
                strokeLinecap="round"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                style={{
                  transform: 'rotate(-90deg)',
                  transformOrigin: '50% 50%',
                  transition: 'stroke-dashoffset 0.3s ease, stroke 0.3s ease'
                }}
              />
            </svg>
          </div>
          <div className="budget-info">
            <h3>{budget.category}</h3>
            <p className={
              isOverspent ? 'text-red-500' : 
              isNearLimit ? 'text-amber-500' : 
              'text-gray-600'
            }>
              {isOverspent ? 
                `$${Math.abs(leftToSpend)} overspent` : 
                `$${leftToSpend} left`}
            </p>
          </div>
        </div>
        <div className="budget-actions">
          <div className="budget-amount">
            <p className="amount">${spent}</p>
            <p className="total">of ${total}</p>
          </div>
          <div className="action-buttons">
            <button onClick={() => onEdit(budget)} className="action-button edit">
              <Edit size={16} />
            </button>
            <button onClick={() => onDelete(budget)} className="action-button delete">
              <Trash2 size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const BudgetDashboard = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [isSidebarOpen, setIsSidebarOpen] = useState(!isMobile);
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedBudget, setSelectedBudget] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

  const [budgets, setBudgets] = useState([]);

  // const [expenses, setExpenses] = useState([
  //   { id: 2, title: 'Mac Book', amount: 2000, date: '2024-01-10', category: 'Personal', member: 'Prava', description: 'For college' },
  //   { id: 3, title: 'University Fee', amount: 5000, date: '2024-01-10', category: 'Education', member: 'Nani', description: 'First year Fee' },
  //   { id: 4, title: 'University Fee', amount: 5000, date: '2024-10-10', category: 'Education', member: 'Nani', description: 'Second semester Fee' },
  //   { id: 5, title: 'Mac Book1', amount: 2000, date: '2024-11-10', category: 'Personal', member: 'Prava', description: 'For college' },
  // ]);  

  const [expenses, setExpenses] = useState([]);

  const fetchExpenses = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/expenses'); // Adjust API URL as needed
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      setExpenses(data);
    } catch (error) {
      console.error('Error fetching expenses:', error);
    }
  };

  const fetchBudget = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/budgets'); // Adjust API URL as needed
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      setBudgets(data);
      if (localStorage.getItem("Isalert") === "false") {
        handleAlertMember();
        localStorage.setItem("Isalert", "true");
      }
      // console.log(budgets);
    } catch (error) {
      console.error('Error fetching budgets:', error);
    }
  };
  
  useEffect(() => {
    
    fetchExpenses();
    fetchBudget();
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      setIsSidebarOpen(!mobile);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const filteredBudgets = budgets.filter(budget => {
    const budgetDate = new Date(budget.startDate);
    return budgetDate.getMonth() === parseInt(selectedMonth) && 
           budgetDate.getFullYear() === parseInt(selectedYear);
  });

  const filteredExpenses = expenses.filter(expense => {
    const expenseDate = new Date(expense.date);
    return expenseDate.getMonth() === parseInt(selectedMonth) && 
           expenseDate.getFullYear() === parseInt(selectedYear);
  });

  const totalBudgeted = filteredBudgets.reduce((sum, budget) => sum + budget.amount, 0);
  const totalSpent = filteredExpenses.reduce((sum, expense) => sum + expense.amount, 0);
  const remaining = totalBudgeted - totalSpent;

  const handleAlertMember = () => {
    
    axios.post('http://localhost:8080/api/budgets/alert', { email: localStorage.getItem('email') }, {
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .catch(error => {
       console.log(error);
    })
    .finally(() => {
      console.log("Email Sent") // Stop loading
    });
  };

  const handleMonthChange = (month) => setSelectedMonth(parseInt(month));
  const handleYearChange = (year) => setSelectedYear(parseInt(year));
  const handleAddBudget = () => {
    setSelectedBudget(null);
    setShowModal(true);
  };
  const handleEditBudget = (budget) => {
    setSelectedBudget(budget);
    setShowModal(true);
  };
  const handleDeleteBudget = (budget) => {
    setSelectedBudget(budget);
    setShowDeleteModal(true);
  };

  const handleBudgetSubmit = async(e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const budgetData = {
      category: formData.get('category'),
      amount: parseFloat(formData.get('amount')),
      startDate: formData.get('startDate'),
    };

    if (selectedBudget) {
      await axios.put(`http://localhost:8080/api/budgets/${selectedBudget.id}`, budgetData);
      setAlertMessage('Budget updated successfully!');
      await fetchBudget();
    } else {
      await axios.post("http://localhost:8080/api/budgets", budgetData);
      setAlertMessage('Budget created successfully!');
      await fetchBudget();
    }

    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 3000);
    setShowModal(false);
    setSelectedBudget(null);
  };

  const handleConfirmDelete = async() => {
    await axios.delete(`http://localhost:8080/api/budgets/${selectedBudget.id}`);
    setShowDeleteModal(false);
    setSelectedBudget(null);
    setAlertMessage('Budget deleted successfully!');
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 3000);
    await fetchBudget();
  };

  return (
    // <div style={{backgroundColor: 'F0F8FF'}} className="budget-container">
    //   <Sidebar 
    //     isMobile={isMobile} 
    //     isOpen={isSidebarOpen} 
    //     onToggle={() => setIsSidebarOpen(!isSidebarOpen)} 
    //   />
    <div style={{ display: 'flex', minHeight: '100vh',minWidth:'1550px', maxWidth: '1800px', backgroundColor: '#F0F8FF' }}>
      <Sidebar/> 
      <div className="main-content">
        <header className="dashboard-header">
          {isMobile && (
            <button 
              className="menu-button" 
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            >
              <Menu size={24} />
            </button>
          )}
          <h1>Spending & Budgets</h1>
          <button className="add-button" onClick={handleAddBudget}>
            <Plus size={24} />
          </button>
        </header>

        {/* Overview Cards */}
        <div className="overview-cards">
          <div className="overview-card budget">
            <div className="card-title">
              <CreditCard size={20} />
              Total Budget
            </div>
            <div className="amount">
              ${totalBudgeted.toLocaleString()}
            </div>
            <div className="trend">
              Set for {monthNames[selectedMonth]} {selectedYear}
            </div>
          </div>

          <div className="overview-card expense">
            <div className="card-title">
              <ShoppingCart size={20} />
              Total Expenses
            </div>
            <div className="amount">
              ${totalSpent.toLocaleString()}
            </div>
            <div className="trend">
              {totalBudgeted > 0 ? 
                `${((totalSpent / totalBudgeted) * 100).toFixed(1)}% of budget used` : 
                'No budget set'}
            </div>
          </div>

          <div className="overview-card remaining">
            <div className="card-title">
              <AlertTriangle size={20} />
              Remaining Budget
            </div>
            <div className={`amount ${remaining >= 0 ? 'positive' : 'negative'}`}>
              ${Math.abs(remaining).toLocaleString()}
            </div>
            <div className="trend">
              {remaining >= 0 ? 'Under budget' : 'Over budget'}
            </div>
          </div>
        </div>

        <BudgetFilter
          selectedMonth={selectedMonth}
          selectedYear={selectedYear}
          onMonthChange={handleMonthChange}
          onYearChange={handleYearChange}
        />

        <section className="budget-overview">
          <div className="section-header">
            <h2>Monthly Overview</h2>
            <div className="total-budget">
              <span className="spent">${totalSpent.toLocaleString()}</span>
              <span className="budgeted">of ${totalBudgeted.toLocaleString()} budgeted</span>
            </div>
          </div>

          <div className="budget-grid">
            {filteredBudgets.map(budget => (
              <BudgetCard
                key={budget.id}
                budget={budget}
                expenses={filteredExpenses}
                onEdit={handleEditBudget}
                onDelete={handleDeleteBudget}
              />
            ))}
          </div>
        </section>

        {/* Budget Modal */}
        <Modal 
          show={showModal} 
          onHide={() => {
            setShowModal(false);
            setSelectedBudget(null);
          }}
          centered
          size={isMobile ? "sm" : "md"}
        >
          <Modal.Header closeButton>
            <Modal.Title>
              {selectedBudget ? 'Edit Budget' : 'Create New Budget'}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={handleBudgetSubmit}>
              <Form.Group className="mb-3">
                <Form.Label>Category</Form.Label>
                <Form.Select
                  name="category"
                  defaultValue={selectedBudget?.category || ''}
                  required
                >
                  <option value="">Select a category</option>
                  <option value="Housing">Housing</option>
                  <option value="Groceries">Groceries</option>
                  <option value="Utilities">Utilities</option>
                  <option value="Health">Health</option>
                  <option value="Personal">Personal</option>
                  <option value="Education">Education</option>
                  <option value="Debts">Debts</option>
                  <option value="Entertainment">Entertainment</option>
                  <option value="Miscellaneous">Miscellaneous</option>
                </Form.Select>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Amount</Form.Label>
                <Form.Control
                  type="number"
                  name="amount"
                  defaultValue={selectedBudget?.amount || ''}
                  required
                  placeholder="Enter budget amount"
                  min="0"
                  step="0.01"
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Start Date</Form.Label>
                <Form.Control
                  type="date"
                  name="startDate"
                  defaultValue={selectedBudget?.startDate || ''}
                  required
                />
              </Form.Group>

              <Button 
                variant="primary" 
                type="submit" 
                className="w-100"
                style={{
                  backgroundColor: '#FF7F6E',
                  borderColor: '#FF7F6E'
                }}
              >
                {selectedBudget ? 'Update Budget' : 'Create Budget'}
              </Button>
            </Form>
          </Modal.Body>
        </Modal>

        
        <Modal
          show={showDeleteModal}
          onHide={() => setShowDeleteModal(false)}
          centered
          size="sm"
        >
          <Modal.Header closeButton>
            <Modal.Title>Confirm Delete</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>Are you sure you want to delete this budget?</p>
            <div className="d-flex justify-content-end gap-2 mt-3">
              <Button 
                variant="secondary" 
                onClick={() => setShowDeleteModal(false)}
              >
                Cancel
              </Button>
              <Button 
                variant="danger" 
                onClick={handleConfirmDelete}
              >
                Delete
              </Button>
            </div>
          </Modal.Body>
        </Modal>

        
        {showAlert && (
          <div className="alert-container">
            <div className="alert alert-success">
              {alertMessage}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BudgetDashboard;