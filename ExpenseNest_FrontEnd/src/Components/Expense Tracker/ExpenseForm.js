import React from 'react';
import { Form, Button } from 'react-bootstrap';

const ExpenseForm = ({ expense, handleInputChange, handleSubmit, isEditing }) => {
  const categories = [
    "Housing",
    "Groceries",
    "Utilities",
    "Health",
    "Personal",
    "Education",
    "Debts",
    "Entertainment",
    "Miscellaneous"
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
      <Form.Group className="mb-3">
        <Form.Label style={{color: '#1A2B4A', fontWeight: 'bold'}}>Expense Title</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter expense title"
          name="title"
          value={expense.title}
          onChange={handleInputChange}
          required
          style={inputStyle}
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label style={{color: '#1A2B4A', fontWeight: 'bold'}}>Amount</Form.Label>
        <Form.Control
          type="number"
          placeholder="Enter amount"
          name="amount"
          value={expense.amount}
          onChange={handleInputChange}
          required
          style={inputStyle}
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label style={{color: '#1A2B4A', fontWeight: 'bold'}}>Date</Form.Label>
        <Form.Control
          type="date"
          name="date"
          value={expense.date}
          onChange={handleInputChange}
          required
          style={inputStyle}
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label style={{color: '#1A2B4A', fontWeight: 'bold'}}>Category</Form.Label>
        <Form.Control
          as="select"
          name="category"
          value={expense.category}
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
      <Form.Group className="mb-3">
        <Form.Label style={{color: '#1A2B4A', fontWeight: 'bold'}}>Family Member</Form.Label>
        <Form.Control
          as="select"
          name="member"
          value={expense.member}
          onChange={handleInputChange}
          required
          style={inputStyle}
        >
          <option value="">Select Member</option>
          <option value="Pravalika">Pravalika</option>
          <option value="Nani">Nani</option>
          <option value="Yash">Yash</option>
          <option value="Karthik">Karthik</option>
          <option value="Mallika">Mallika</option>
          <option value="Varun">Varun</option>
          <option value="Charan">Charan</option>
          <option value="Family">Family</option>
        </Form.Control>
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label style={{color: '#1A2B4A', fontWeight: 'bold'}}>Description</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          placeholder="Enter description"
          name="description"
          value={expense.description}
          onChange={handleInputChange}
          style={inputStyle}
        />
      </Form.Group>
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
        {isEditing ? 'Update Expense' : 'Add Expense'}
      </Button>
    </Form>
  );
};

export default ExpenseForm;