import React from 'react';
import { Form, Button } from 'react-bootstrap';

const IncomeForm = ({ income, handleInputChange, handleSubmit, isEditing }) => {
  const categories = [
    "Employment",
    "Self-employment",
    "Investments",
    "Rental",
    "Pension",
    "Government Benefits",
    "Gifts",
    "Other"
  ];

  const inputStyle = {
    backgroundColor: '#FFFFFF',
    border: '1px solid #4A8895',
    color: '#1A2B4A',
    borderRadius: '10px',
    padding: '10px'
  };

  return (
    <Form onSubmit={handleSubmit}>
      {/* Income Title */}
      <Form.Group className="mb-3">
        <Form.Label style={{color: '#1A2B4A', fontWeight: 'bold'}}>Income Title</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter income title"
          name="title"
          value={income.title}
          onChange={handleInputChange}
          required
          style={inputStyle}
        />
      </Form.Group>
      
      {/* Amount */}
      <Form.Group className="mb-3">
        <Form.Label style={{color: '#1A2B4A', fontWeight: 'bold'}}>Amount</Form.Label>
        <Form.Control
          type="number"
          placeholder="Enter amount"
          name="amount"
          value={income.amount}
          onChange={handleInputChange}
          required
          style={inputStyle}
        />
      </Form.Group>
      
      {/* Date */}
      <Form.Group className="mb-3">
        <Form.Label style={{color: '#1A2B4A', fontWeight: 'bold'}}>Date</Form.Label>
        <Form.Control
          type="date"
          name="date"
          value={income.date || ''}
          onChange={handleInputChange}
          required
          style={inputStyle}
        />
      </Form.Group>
      
      {/* Category */}
      <Form.Group className="mb-3">
        <Form.Label style={{color: '#1A2B4A', fontWeight: 'bold'}}>Category</Form.Label>
        <Form.Control
          as="select"
          name="category"
          value={income.category}
          onChange={handleInputChange}
          required
          style={inputStyle}
        >
          <option value="">Select a category</option>
          {categories.map((category, index) => (
            <option key={index} value={category}>{category}</option>
          ))}
        </Form.Control>
      </Form.Group>
      
      {/* Description */}
      <Form.Group className="mb-3">
        <Form.Label style={{color: '#1A2B4A', fontWeight: 'bold'}}>Description</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          placeholder="Enter description"
          name="description"
          value={income.description}
          onChange={handleInputChange}
          style={inputStyle}
        />
      </Form.Group>
      
      {/* Recurring Payment Checkbox */}
      <Form.Group className="mb-3">
        <Form.Check
          type="checkbox"
          label="Recurring Payment"
          name="isRecurring"
          checked={income.isRecurring || false}
          onChange={handleInputChange}
        />
      </Form.Group>
      
      {/* Recurring Payment Options */}
      {income.isRecurring && (
        <>
          {/* Frequency */}
          <Form.Group className="mb-3">
            <Form.Label style={{color: '#1A2B4A', fontWeight: 'bold'}}>Frequency</Form.Label>
            <Form.Control
              as="select"
              name="frequency"
              value={income.frequency || ''}
              onChange={handleInputChange}
              required
              style={inputStyle}
            >
              <option value="" disabled>Select Frequency</option>
              <option value="Daily">Daily</option>
              <option value="Weekly">Weekly</option>
              <option value="Monthly">Monthly</option>
              <option value="Yearly">Yearly</option>
            </Form.Control>
          </Form.Group>
          
          {/* Start Date */}
          <Form.Group className="mb-3">
            <Form.Label style={{color: '#1A2B4A', fontWeight: 'bold'}}>Start Date</Form.Label>
            <Form.Control
              type="date"
              name="startDate"
              value={income.startDate || ''}
              onChange={handleInputChange}
              required
              style={inputStyle}
            />
          </Form.Group>
          
          {/* End Date */}
          <Form.Group className="mb-3">
            <Form.Label style={{color: '#1A2B4A', fontWeight: 'bold'}}>End Date</Form.Label>
            <Form.Control
              type="date"
              name="endDate"
              value={income.endDate || ''}
              onChange={handleInputChange}
              required
              style={inputStyle}
            />
          </Form.Group>
        </>
      )}
      
      {/* Submit Button */}
      <Button 
        variant="primary" 
        type="submit" 
        className="w-100"
        style={{
          backgroundColor: '#FF7F6E', 
          borderColor: '#FF7F6E', 
          color: '#FFFFFF', 
          fontWeight: 'bold',
          borderRadius: '10px',
          padding: '10px'
        }}
      >
        {isEditing ? 'Update Income' : 'Add Income'}
      </Button>
    </Form>
  );
};

export default IncomeForm;