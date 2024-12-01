import React, { useState, useEffect } from 'react';
import axios from 'axios';
import IncomeForm from './IncomeForm';
import IncomeList from './IncomeList';
import IncomeChart from './IncomeChart';
import { Modal, Button, Card, Container, Row, Col } from 'react-bootstrap';
import { FaBars, FaPlusCircle } from 'react-icons/fa';
import Sidebar from '../Sidebar';

const API_URL = 'http://localhost:8080/api/incomes';

const IncomeDashboard = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [incomes, setIncomes] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingIncome, setEditingIncome] = useState(null);
  const [newIncome, setNewIncome] = useState({
    title: '',
    amount: '',
    date: '',
    category: '',
    description: '',
    isRecurring: false,
    frequency: '',
    startDate: '',
    endDate: '',
  });

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const fetchIncomes = () => {
      axios.get(API_URL)
        .then(response => setIncomes(response.data))
        .catch(error => console.error("Error fetching incomes:", error));
    };
  
    fetchIncomes(); // Initial fetch
  
    // Periodic fetch every hour
    const intervalId = setInterval(fetchIncomes, 60 * 60 * 1000); // 1 hour interval
  
    return () => clearInterval(intervalId); // Cleanup interval on unmount
  }, []);


  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    const fieldValue = type === "checkbox" ? checked : value;
    if (editingIncome) {
      setEditingIncome({ ...editingIncome, [name]: fieldValue });
    } else {
      setNewIncome({ ...newIncome, [name]: fieldValue });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingIncome) {
      axios.put(`${API_URL}/${editingIncome.id}`, editingIncome)
        .then(response => {
          setIncomes(incomes.map(exp => exp.id === response.data.id ? response.data : exp));
          setEditingIncome(null);
        })
        .catch(error => console.error("Error updating income:", error));
    } else if (newIncome.title && newIncome.amount && newIncome.date && newIncome.category && newIncome.description) {
      axios.post(API_URL, newIncome)
        .then(response => setIncomes([...incomes, response.data]))
        .catch(error => console.error("Error adding income:", error));
    }
    setNewIncome({ title: '', amount: '', date: '', category: '', description: '', isRecurring: false });
    setShowModal(false);
  };

  const handleDelete = (id) => {
    axios.delete(`${API_URL}/${id}`)
      .then(() => setIncomes(incomes.filter(income => income.id !== id)))
      .catch(error => console.error("Error deleting income:", error));
  };

  const handleEdit = (income) => {
    setEditingIncome(income);
    setNewIncome(income);
    setShowModal(true);
  };

  const handleAddNewIncome = () => {
    setEditingIncome(null);
    setNewIncome({ title: '', amount: '', date: '', category: '', description: '', isRecurring: false });
    setShowModal(true);
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#F0F8FF' }}>
      <Sidebar></Sidebar>
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
                Incomes
              </h2>
            </Col>
            <Col xs="auto">
              <Button 
                variant="primary" 
                onClick={handleAddNewIncome} 
                size={isMobile ? "sm" : "md"}
                style={{
                  backgroundColor: '#FF7F6E', 
                  borderColor: '#FF7F6E', 
                  borderRadius: '20px',
                  padding: isMobile ? '0.3rem 0.8rem' : '0.4rem 1rem',
                  fontSize: isMobile ? '0.8rem' : '0.85rem'
                }}
              >
                <FaPlusCircle className="me-1" /> Add Income
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
                  <IncomeChart incomes={incomes} />
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
                    Income List
                  </h6>
                  <IncomeList incomes={incomes} handleDelete={handleDelete} handleEdit={handleEdit} />
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
      <Modal show={showModal} onHide={() => setShowModal(false)} centered size={isMobile ? "sm" : "md"}>
        <Modal.Header closeButton style={{ backgroundColor: '#F0F8FF', border: 'none' }}>
          <Modal.Title style={{ color: '#1A2B4A', fontWeight: 'bold', fontSize: isMobile ? '1rem' : '1.1rem' }}>
            {editingIncome ? 'Edit Income' : 'Add New Income'}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ backgroundColor: '#F0F8FF' }}>
          <IncomeForm
            income={editingIncome || newIncome}
            handleInputChange={handleInputChange}
            handleSubmit={handleSubmit}
            isEditing={!!editingIncome}
          />
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default IncomeDashboard;
