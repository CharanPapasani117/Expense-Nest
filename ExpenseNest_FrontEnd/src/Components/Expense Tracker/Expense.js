import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ExpenseForm from './ExpenseForm';
import ExpenseList from './ExpenseList';
import ExpenseChart from './Expensechart';
import { Modal, Button, Card, Container, Row, Col } from 'react-bootstrap';
import { FaBars, FaPlusCircle } from 'react-icons/fa';
import Sidebar from '../Sidebar';
const API_URL = 'http://localhost:8080/api/expenses';

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
//     <Button
//       variant="link"
//       onClick={onToggle}
//       style={{ color: 'white', position: 'absolute', top: '1rem', left: '1rem' }}
//     >
//       <FaBars />
//     </Button>
//     <nav className="nav flex-column align-items-center mt-5" style={{ flex: 1, width: '100%' }}>
//       {['Income', 'Expenses', 'Assets', 'Debts', 'Goals', 'Budget', 'Calculator', 'Advising'].map((item, index) => (
//         <a 
//           key={index}
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

const ExpenseDashboard = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [expenses, setExpenses] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingExpense, setEditingExpense] = useState(null);
  const [newExpense, setNewExpense] = useState({
    title: '',
    amount: '',
    date: '',
    category: '',
    member: '',
    description: '',
  });

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    // Fetch expenses from backend
    axios.get(API_URL)
      .then(response => setExpenses(response.data))
      .catch(error => console.error("Error fetching expenses:", error));
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (editingExpense) {
      setEditingExpense({ ...editingExpense, [name]: value });
    } else {
      setNewExpense({ ...newExpense, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingExpense) {
      // Update existing expense
      axios.put(`${API_URL}/${editingExpense.id}`, editingExpense)
        .then(response => {
          setExpenses(expenses.map(exp => exp.id === response.data.id ? response.data : exp));
          setEditingExpense(null);
        })
        .catch(error => console.error("Error updating expense:", error));
    } else if (newExpense.title && newExpense.amount && newExpense.date && newExpense.category && newExpense.member) {
      // Add new expense
      axios.post(API_URL, newExpense)
        .then(response => setExpenses([...expenses, response.data]))
        .catch(error => console.error("Error adding expense:", error));
    }
    setNewExpense({ title: '', amount: '', date: '', category: '', member: '', description: '' });
    setShowModal(false);
  };

  const handleDelete = (id) => {
    axios.delete(`${API_URL}/${id}`)
      .then(() => setExpenses(expenses.filter(expense => expense.id !== id)))
      .catch(error => console.error("Error deleting expense:", error));
  };

  const handleEdit = (expense) => {
    setEditingExpense(expense);
    setNewExpense(expense);
    setShowModal(true);
  };

  const handleAddNewExpense = () => {
    setEditingExpense(null);
    setNewExpense({ title: '', amount: '', date: '', category: '', member: '', description: '' });
    setShowModal(true);
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#F0F8FF' }}>
      {/* <Sidebar 
        isMobile={isMobile} 
        isOpen={sidebarOpen} 
        onToggle={() => setSidebarOpen(!sidebarOpen)} 
      /> */}
      <Sidebar />
      <div style={{ 
        flex: 1,
        marginLeft: isMobile ? 0 : '120px',
        padding: isMobile ? '1rem' : '1.5rem',
        height: '100vh',
        overflow: 'auto'
      }}>
        <Container fluid style={{ maxWidth: '1600px' }}>
          <Row className="mb-3 align-items-center">
            <Col xs="auto" className="d-md-none">
              <Button
                variant="link"
                onClick={() => setSidebarOpen(!sidebarOpen)}
                style={{ color: '#ff6a56', padding: 0, marginRight: '1rem' }}
              >
                <FaBars size={24} />
              </Button>
            </Col>
            <Col>
              <h2 style={{ color: '#1A2B4A', fontSize: isMobile ? '1.2rem' : '1.4rem', fontWeight: 'bold', margin: 0 }}>
                Expenses
              </h2>
            </Col>
            <Col xs="auto">
              <Button 
                variant="primary" 
                onClick={handleAddNewExpense} 
                size={isMobile ? "sm" : "md"}
                style={{
                  backgroundColor: '#FF7F6E', 
                  borderColor: '#FF7F6E', 
                  borderRadius: '20px',
                  padding: isMobile ? '0.3rem 0.8rem' : '0.4rem 1rem',
                  fontSize: isMobile ? '0.8rem' : '0.85rem'
                }}
              >
                <FaPlusCircle className="me-1" /> Add Expense
              </Button>
            </Col>
          </Row>

          <Row className="g-3">
            <Col xs={12} md={7} lg={8}>
              <Card className="h-100" style={{
                borderRadius: '12px', 
                border: 'none',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                minHeight: isMobile ? '400px' : 'calc(100vh - 120px)'
              }}>
                <Card.Body>
                  <ExpenseChart expenses={expenses} />
                </Card.Body>
              </Card>
            </Col>
            <Col xs={12} md={5} lg={4}>
              <Card className="h-100" style={{
                borderRadius: '12px', 
                border: 'none',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                minHeight: isMobile ? '300px' : 'calc(100vh - 120px)'
              }}>
                <Card.Body className="p-2">
                  <h6 className="mb-3 px-2" style={{ color: '#1A2B4A', fontWeight: 'bold', fontSize: isMobile ? '0.9rem' : '1rem' }}>
                    Expense List
                  </h6>
                  <ExpenseList expenses={expenses} handleDelete={handleDelete} handleEdit={handleEdit} />
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>

      <Modal show={showModal} onHide={() => setShowModal(false)} centered size={isMobile ? "sm" : "md"}>
        <Modal.Header closeButton style={{ backgroundColor: '#F0F8FF', border: 'none' }}>
          <Modal.Title style={{ color: '#1A2B4A', fontWeight: 'bold', fontSize: isMobile ? '1rem' : '1.1rem' }}>
            {editingExpense ? 'Edit Expense' : 'Add New Expense'}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ backgroundColor: '#F0F8FF' }}>
          <ExpenseForm
            expense={editingExpense || newExpense}
            handleInputChange={handleInputChange}
            handleSubmit={handleSubmit}
            isEditing={!!editingExpense}
          />
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default ExpenseDashboard;
