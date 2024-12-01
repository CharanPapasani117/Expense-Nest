import React from 'react';
import { ListGroup, Button } from 'react-bootstrap';
import { FaTrash, FaUser, FaInfoCircle, FaBriefcase, FaMoneyBillWave, FaChartLine, FaHome, FaGift, FaFileInvoiceDollar, FaEdit, FaTag } from 'react-icons/fa';

const getCategoryIcon = (category) => {
  switch (category.toLowerCase()) {
    case 'employment': return <FaBriefcase className="me-2" />;
    case 'self-employment': return <FaMoneyBillWave className="me-2" />;
    case 'investments': return <FaChartLine className="me-2" />;
    case 'rental': return <FaHome className="me-2" />;
    case 'pension': return <FaFileInvoiceDollar className="me-2" />;
    case 'government benefits': return <FaFileInvoiceDollar className="me-2" />;
    case 'gifts': return <FaGift className="me-2" />;
    case 'other': return <FaTag className="me-2" />;
    default: return <FaTag className="me-2" />;
  }
};

/**
 * Component to display a list of incomes.
 * Handles both one-time and recurring incomes.
 *
 * @param {Array} incomes - List of income objects.
 * @param {Function} handleDelete - Function to delete an income.
 * @param {Function} handleEdit - Function to edit an income.
 */
const IncomeList = ({ incomes, handleDelete, handleEdit }) => {
  return (
    <ListGroup style={{ height: '65vh', overflowY: 'auto' }}>
      {incomes.map((income) => (
        <ListGroup.Item 
          key={income.id} 
          className="d-flex justify-content-between align-items-start mb-2 py-2" 
          style={{
            backgroundColor: '#FFFFFF', 
            border: 'none', 
            borderRadius: '10px', 
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
          }}
        >
          <div className="ms-2 me-auto w-100">
            {/* Display Title and Amount */}
            <div className="d-flex justify-content-between align-items-center w-100">
              <span className="fw-bold" style={{ color: '#1A2B4A' }}>{income.title}</span>
              <span style={{ color: '#FF7F6E', fontWeight: 'bold' }}>${income.amount.toFixed(2)}</span>
            </div>

            {/* Display Recurring Information */}
            {income.isRecurring ? (
              <div className="text-muted mt-1" style={{ fontSize: '0.8rem' }}>
                <small>
                  Recurring: {income.frequency} | From: {income.startDate} to {income.endDate}
                </small>
              </div>
            ) : (
              <div className="text-muted mt-1" style={{ fontSize: '0.8rem' }}>
                <small>{income.date}</small>
              </div>
            )}

            {/* Description (if available) */}
            {income.description && (
              <div className="mt-1 text-muted" style={{ fontSize: '0.8rem' }}>
                <small>{income.description}</small>
              </div>
            )}

            {/* Action Buttons */}
            <div className="mt-2">
              <Button 
                variant="outline-primary"
                size="sm"
                className="me-2 py-0"
                onClick={() => handleEdit(income)}
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
                onClick={() => handleDelete(income.id)}
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

export default IncomeList;