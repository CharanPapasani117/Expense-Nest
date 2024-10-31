import React from 'react';
import { ListGroup, Button } from 'react-bootstrap';
import { FaTrash, FaUser, FaInfoCircle, FaHome, FaShoppingCart, FaBolt, FaMedkit, FaUserAlt, FaGraduationCap, FaCreditCard, FaFilm, FaEllipsisH, FaEdit, FaTag } from 'react-icons/fa';

const getCategoryIcon = (category) => {
  switch (category.toLowerCase()) {
    case 'housing': return <FaHome className="me-2" />;
    case 'groceries': return <FaShoppingCart className="me-2" />;
    case 'utilities': return <FaBolt className="me-2" />;
    case 'health': return <FaMedkit className="me-2" />;
    case 'personal': return <FaUserAlt className="me-2" />;
    case 'education': return <FaGraduationCap className="me-2" />;
    case 'debts': return <FaCreditCard className="me-2" />;
    case 'entertainment': return <FaFilm className="me-2" />;
    case 'miscellaneous': return <FaEllipsisH className="me-2" />;
    default: return <FaTag className="me-2" />;
  }
};

const ExpenseList = ({ expenses, handleDelete, handleEdit }) => {
  return (
    <ListGroup style={{ height: '65vh', overflowY: 'auto' }}>
      {expenses.map((expense) => (
        <ListGroup.Item 
          key={expense.id} 
          className="d-flex justify-content-between align-items-start mb-2 py-2" 
          style={{
            backgroundColor: '#FFFFFF', 
            border: 'none', 
            borderRadius: '10px', 
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
          }}
        >
          <div className="ms-2 me-auto w-100">
            <div className="d-flex justify-content-between align-items-center w-100">
              <div className="fw-bold d-flex align-items-center" style={{color: '#1A2B4A', fontSize: '0.9rem'}}>
                {getCategoryIcon(expense.category)}
                <span>{expense.title}</span>
              </div>
              <div className="ms-3" style={{color: '#FF7F6E', fontWeight: 'bold', fontSize: '0.9rem'}}>
                ${expense.amount.toFixed(2)}
              </div>
            </div>
            <div className="text-muted mt-1" style={{fontSize: '0.8rem'}}>
              <small>
                {expense.date} • {expense.category} • 
                <FaUser className="ms-2 me-1" />{expense.member}
              </small>
            </div>
            {expense.description && (
              <div className="mt-1 text-muted" style={{fontSize: '0.8rem'}}>
                <FaInfoCircle className="me-1" />
                <small>{expense.description}</small>
              </div>
            )}
            <div className="mt-2">
              <Button 
                variant="outline-primary"
                size="sm"
                className="me-2 py-0"
                onClick={() => handleEdit(expense)}
                style={{
                  borderColor: '#4A8895', 
                  color: '#4A8895', 
                  borderRadius: '20px', 
                  fontSize: '0.8rem'
                }}
              >
                <FaEdit className="me-1" /> Edit
              </Button>
              <Button 
                variant="outline-danger"
                size="sm"
                onClick={() => handleDelete(expense.id)}
                style={{
                  borderColor: '#FF7F6E', 
                  color: '#FF7F6E', 
                  borderRadius: '20px', 
                  fontSize: '0.8rem'
                }}
                className="py-0"
              >
                <FaTrash className="me-1" /> Delete
              </Button>
            </div>
          </div>
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
};

export default ExpenseList;