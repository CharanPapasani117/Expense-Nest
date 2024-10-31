import React, { useState, useMemo } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { Form, Row, Col } from 'react-bootstrap';

const ExpenseChart = ({ expenses = [] }) => {
  const currentDate = new Date();
  const [selectedDate, setSelectedDate] = useState({
    month: currentDate.getMonth(),
    year: currentDate.getFullYear(),
  });

  const handleDateChange = (e) => {
    const { name, value } = e.target;
    setSelectedDate(prev => ({ ...prev, [name]: parseInt(value) }));
  };

  const filteredExpenses = useMemo(() => {
    if (!Array.isArray(expenses)) return [];
    
    return expenses.filter(expense => {
      const expenseDate = new Date(expense.date);
      return (
        expenseDate.getMonth() === selectedDate.month &&
        expenseDate.getFullYear() === selectedDate.year
      );
    });
  }, [expenses, selectedDate]);

  // Calculate total expenses for the filtered month
  const totalFilteredExpense = useMemo(() => {
    return filteredExpenses.reduce((total, expense) => total + parseFloat(expense.amount || 0), 0);
  }, [filteredExpenses]);

  const predefinedCategories = [
    "Housing", "Groceries", "Utilities", "Health", "Personal",
    "Education", "Debts", "Entertainment", "Miscellaneous"
  ];

  const categoryTotals = predefinedCategories.reduce((acc, category) => {
    acc[category] = 0;
    return acc;
  }, {});

  const memberTotals = {};

  filteredExpenses.forEach(expense => {
    const category = predefinedCategories.includes(expense.category) ? expense.category : "Miscellaneous";
    categoryTotals[category] += parseFloat(expense.amount) || 0;

    if (expense.member) {
      memberTotals[expense.member] = (memberTotals[expense.member] || 0) + (parseFloat(expense.amount) || 0);
    }
  });

  const categoryData = predefinedCategories
    .filter(category => categoryTotals[category] > 0)
    .map(category => ({
      name: category,
      value: categoryTotals[category]
    }));

  const memberData = Object.entries(memberTotals)
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value);

  const COLORS = ['#4169E1', '#9370DB', '#20B2AA', '#FF7F50', '#3CB371', '#FFD700', '#FA8072', '#87CEEB'];

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const years = Array.from({ length: 10 }, (_, i) => currentDate.getFullYear() - i);

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip" style={{ backgroundColor: '#FFFFFF', padding: '10px', border: '1px solid #4A8895', borderRadius: '5px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
          <p className="label" style={{ color: '#1A2B4A', fontWeight: 'bold', margin: 0 }}>{`${payload[0].name} : $${payload[0].value.toFixed(2)}`}</p>
        </div>
      );
    }
    return null;
  };

  const selectStyle = {
    backgroundColor: '#FFFFFF',
    border: '1px solid #4A8895',
    color: '#1A2B4A',
    borderRadius: '10px',
    padding: '5px 10px'
  };

  return (
    <div>
      {/* Total Expense Display */}
      <div className="text-center mb-4">
        <h4 style={{ color: '#1A2B4A', fontWeight: 'bold', marginBottom: '0.5rem' }}>
          Total Expenses for {monthNames[selectedDate.month]} {selectedDate.year}
        </h4>
        <h2 style={{ 
          color: '#ff6a56', 
          fontWeight: 'bold',
          fontSize: '2.5rem',
          margin: '1rem 0',
          padding: '0.5rem',
          borderRadius: '10px',
          backgroundColor: 'rgba(74, 136, 149, 0.1)'
        }}>
          ${totalFilteredExpense.toFixed(2)}
        </h2>
      </div>

      {/* Date Filters */}
      <Row className="mb-4">
        <Col xs={6} sm={4} md={3}>
          <Form.Select
            name="month"
            value={selectedDate.month}
            onChange={handleDateChange}
            className="mb-2 mb-sm-0"
            style={selectStyle}
          >
            {monthNames.map((month, index) => (
              <option key={index} value={index}>{month}</option>
            ))}
          </Form.Select>
        </Col>
        <Col xs={6} sm={4} md={3}>
          <Form.Select
            name="year"
            value={selectedDate.year}
            onChange={handleDateChange}
            style={selectStyle}
          >
            {years.map((year) => (
              <option key={year} value={year}>{year}</option>
            ))}
          </Form.Select>
        </Col>
      </Row>

      {categoryData.length > 0 ? (
        <Row>
          <Col md={6}>
            <h5 className="text-center mb-4" style={{color: '#1A2B4A', fontWeight: 'bold'}}>Expenses by Category</h5>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </Col>
          <Col md={6}>
            <h5 className="text-center mb-4" style={{color: '#1A2B4A', fontWeight: 'bold'}}>Expenses by Family Member</h5>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={memberData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {memberData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </Col>
        </Row>
      ) : (
        <div className="text-center mt-3" style={{color: '#1A2B4A'}}>
          <p>No expense data for {monthNames[selectedDate.month]} {selectedDate.year}.</p>
        </div>
      )}
    </div>
  );
};

export default ExpenseChart;