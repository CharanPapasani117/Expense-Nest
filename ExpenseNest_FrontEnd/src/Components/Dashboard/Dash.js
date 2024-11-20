import React, { useState, useEffect, useContext, useMemo } from 'react';
import { Card, Container, Row, Col, Button, Form } from 'react-bootstrap';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { FaBars, FaWallet, FaChartPie, FaArrowUp, FaArrowDown, FaCalendar } from 'react-icons/fa';
import { FinanceContext } from './Financecontext';
import Sidebar from '../Sidebar';
import axios from 'axios';

// Sidebar Component
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
//       {['Dashboard', 'Income', 'Expenses', 'Goals', 'Budget', 'Reports'].map((item) => (
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
//   </div>
// );

// date filter
const DateFilter = ({ selectedMonth, selectedYear, onMonthChange, onYearChange }) => {
  const currentYear = new Date().getFullYear();
  const years = ['All', ...Array.from({ length: 5 }, (_, i) => currentYear - i)];
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  return (
    <div className="d-flex gap-3 align-items-center">
      <div className="d-flex align-items-center">
        <FaCalendar className="text-muted me-2" />
        <Form.Select
          value={selectedMonth}
          onChange={(e) => onMonthChange(e.target.value)}
          style={{ minWidth: '140px' }}
          className="me-2"
        >
          <option value="all">All Months</option>
          {months.map((month, index) => (
            <option key={month} value={index}>{month}</option>
          ))}
        </Form.Select>
        <Form.Select
          value={selectedYear}
          onChange={(e) => onYearChange(e.target.value)}
          style={{ minWidth: '100px' }}
        >
          {years.map(year => (
            <option key={year} value={year.toString()}>{year}</option>
          ))}
        </Form.Select>
      </div>
    </div>
  );
};


const SummaryCard = ({ title, amount, icon: Icon, trend, color }) => (
  <Card className="shadow-sm h-100">
    <Card.Body>
      <div className="d-flex justify-content-between align-items-center mb-2">
        <div className="d-flex align-items-center">
          <div 
            className="rounded-circle p-2 me-2" 
            style={{ backgroundColor: `${color}20` }}
          >
            <Icon size={20} color={color} />
          </div>
          <h6 className="text-muted mb-0">{title}</h6>
        </div>
        {trend && trend !== 'N/A' && (
          <span style={{ color: trend >= 0 ? '#28a745' : '#dc3545' }}>
            {trend >= 0 ? <FaArrowUp /> : <FaArrowDown />}
            {Math.abs(trend)}%
          </span>
        )}
      </div>
      <h3 style={{ color: color }}>${amount.toLocaleString()}</h3>
    </Card.Body>
  </Card>
);

const FinancialDashboard = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState('all');
  const [selectedYear, setSelectedYear] = useState('all');
  // const { globalIncomes, globalExpenses } = useContext(FinanceContext);

  const [globalIncomes, setGlobalIncomes] =useState([]);
  const [globalExpenses, setGlobalExpenses] = useState([]);
  const {testData, setTestData} = useState([]);

  axios.get('http://localhost:8080/api/expenses')
  .then((response) => {
    // console.log(response.data);
    setGlobalExpenses(response.data);
  })
  .catch((error) => {
    console.error("Error fetching expenses:", error);
  });

  axios.get('http://localhost:8080/api/incomes')
  .then((response) => {
    // console.log(response.data);
    setGlobalIncomes(response.data);
  })
  .catch((error) => {
    console.error("Error fetching incomes :", error);
  });





  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Filter data 
  const filteredData = useMemo(() => {
    let filteredIncomes = [...globalIncomes];
    let filteredExpenses = [...globalExpenses];

    if (selectedYear !== 'all') {
      const year = parseInt(selectedYear);
      filteredIncomes = filteredIncomes.filter(item => 
        new Date(item.date).getFullYear() === year
      );
      filteredExpenses = filteredExpenses.filter(item => 
        new Date(item.date).getFullYear() === year
      );
    }

    if (selectedMonth !== 'all') {
      const month = parseInt(selectedMonth);
      filteredIncomes = filteredIncomes.filter(item => 
        new Date(item.date).getMonth() === month
      );
      filteredExpenses = filteredExpenses.filter(item => 
        new Date(item.date).getMonth() === month
      );
    }

    return { filteredIncomes, filteredExpenses };
  }, [globalIncomes, globalExpenses, selectedMonth, selectedYear]);

  // Calculat total
  const totalIncome = filteredData.filteredIncomes.reduce((sum, item) => sum + item.amount, 0);
  const totalExpenses = filteredData.filteredExpenses.reduce((sum, item) => sum + item.amount, 0);
  const netWorth = totalIncome - totalExpenses;
  const savingsRate = totalIncome > 0 ? ((totalIncome - totalExpenses) / totalIncome * 100).toFixed(1) : 0;

  
  const calculateTrend = (currentData, allData, type) => {
    if (selectedMonth === 'all' || selectedYear === 'all') return 'N/A';
    
    const currentTotal = currentData.reduce((sum, item) => sum + item.amount, 0);
    const currentDate = new Date(parseInt(selectedYear), parseInt(selectedMonth));
    const previousDate = new Date(currentDate.setMonth(currentDate.getMonth() - 1));
    
    const previousData = allData.filter(item => {
      const itemDate = new Date(item.date);
      return itemDate.getMonth() === previousDate.getMonth() && 
             itemDate.getFullYear() === previousDate.getFullYear();
    });
    
    const previousTotal = previousData.reduce((sum, item) => sum + item.amount, 0);
    
    if (previousTotal === 0) return 0;
    return ((currentTotal - previousTotal) / previousTotal * 100).toFixed(1);
  };

  const incomeTrend = calculateTrend(filteredData.filteredIncomes, globalIncomes, 'income');
  const expenseTrend = calculateTrend(filteredData.filteredExpenses, globalExpenses, 'expenses');

  // chart
  const getMonthlyData = () => {
    const monthlyData = {};
    
    [...filteredData.filteredIncomes, ...filteredData.filteredExpenses].forEach(item => {
      if (item && item.date) {
        const date = new Date(item.date);
        const monthKey = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}`;
        
        if (!monthlyData[monthKey]) {
          monthlyData[monthKey] = { month: monthKey, income: 0, expenses: 0 };
        }
        
        if (filteredData.filteredIncomes.find(inc => inc.id === item.id)) {
          monthlyData[monthKey].income += item.amount || 0;
        } else {
          monthlyData[monthKey].expenses += item.amount || 0;
        }
      }
    });

    return Object.values(monthlyData).sort((a, b) => a.month.localeCompare(b.month));
  };

  // expense chart
  const getExpenseBreakdown = () => {
    const categories = {};
    filteredData.filteredExpenses.forEach(expense => {
      if (!categories[expense.category]) {
        categories[expense.category] = 0;
      }
      categories[expense.category] += expense.amount;
    });

    return Object.entries(categories).map(([name, value]) => ({
      name,
      value
    }));
  };

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#F0F8FF' }}>
      {/* <Sidebar 
        isMobile={isMobile} 
        isOpen={sidebarOpen} 
        onToggle={() => setSidebarOpen(!sidebarOpen)} 
      /> */}
      <Sidebar></Sidebar>
      
      <div style={{ 
        flex: 1,
        marginLeft: isMobile ? 0 : '120px',
        padding: isMobile ? '1rem' : '1.5rem',
        height: '100vh',
        overflow: 'auto'
      }}>
        <Container fluid style={{ maxWidth: '1600px' }}>
          {/* Header with Filter */}
          <Row className="mb-4 align-items-center">
            <Col xs="auto" className="d-md-none">
              <Button
                variant="link"
                onClick={() => setSidebarOpen(!sidebarOpen)}
                style={{ color: '#1A2B4A', padding: 0 }}
              >
                <FaBars size={24} />
              </Button>
            </Col>
            <Col>
              <h2 style={{ 
                color: '#1A2B4A', 
                fontSize: isMobile ? '1.2rem' : '1.4rem', 
                fontWeight: 'bold',
                margin: 0 
              }}>Financial Overview</h2>
            </Col>
            <Col xs="auto">
              <DateFilter
                selectedMonth={selectedMonth}
                selectedYear={selectedYear}
                onMonthChange={setSelectedMonth}
                onYearChange={setSelectedYear}
              />
            </Col>
          </Row>

          {/* Summary Cards */}
          <Row className="mb-4 g-3">
            <Col md={3}>
              <SummaryCard 
                title="Total Income"
                amount={totalIncome}
                icon={FaWallet}
                trend={incomeTrend}
                color="#4A8895"
              />
            </Col>
            <Col md={3}>
              <SummaryCard 
                title="Total Expenses"
                amount={totalExpenses}
                icon={FaChartPie}
                trend={expenseTrend}
                color="#FF7F6E"
              />
            </Col>
            <Col md={3}>
              <Card className="shadow-sm h-100">
                <Card.Body>
                  <h6 className="text-muted mb-2">Net Worth</h6>
                  <h3 className={netWorth >= 0 ? 'text-success' : 'text-danger'}>
                    ${netWorth.toLocaleString()}
                  </h3>
                </Card.Body>
              </Card>
            </Col>
            <Col md={3}>
              <Card className="shadow-sm h-100">
                <Card.Body>
                  <h6 className="text-muted mb-2">Savings Rate</h6>
                  <h3 className="text-primary">{savingsRate}%</h3>
                </Card.Body>
              </Card>
            </Col>
          </Row>

          {/* Charts */}
          <Row className="g-3">
            <Col xs={12} lg={8}>
              <Card className="h-100" style={{
                borderRadius: '12px',
                border: 'none',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                minHeight: '400px'
              }}>
                <Card.Body>
                  <h5 className="mb-4">Income vs Expenses Trend</h5>
                  <div style={{ height: '350px' }}>
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={getMonthlyData()}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#f5f5f5" />
                        <XAxis 
                          dataKey="month" 
                          tick={{ fontSize: 12 }}
                          tickFormatter={(value) => {
                            const [year, month] = value.split('-');
                            return `${month}/${year.slice(2)}`;
                          }}
                        />
                        <YAxis 
                          tick={{ fontSize: 12 }}
                          tickFormatter={(value) => `$${value.toLocaleString()}`}
                        />
                        <Tooltip 
                          formatter={(value) => [`$${value.toLocaleString()}`, '']}
                          labelFormatter={(label) => {
                            const [year, month] = label.split('-');
                            return `${month}/${year}`;
                          }}
                        />
                        <Legend />
                        <Line 
                          type="monotone" 
                          dataKey="income" 
                          stroke="#4A8895" 
                          strokeWidth={2}
                          dot={{ r: 4 }}
                          name="Income"
                        />
                        <Line 
                          type="monotone" 
                          dataKey="expenses" 
                          stroke="#FF7F6E" 
                          strokeWidth={2}
                          dot={{ r: 4 }}
                          name="Expenses"
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </Card.Body>
              </Card>
            </Col>
            <Col xs={12} lg={4}>
            <Card className="h-100" style={{
                borderRadius: '12px',
                border: 'none',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                minHeight: '400px'
              }}>
                <Card.Body>
                  <h5 className="mb-4">Expense Breakdown</h5>
                  <div style={{ height: '350px' }}>
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={getExpenseBreakdown()}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={80}
                          fill="#8884d8"
                          paddingAngle={5}
                          dataKey="value"
                          label={({
                            cx,
                            cy,
                            midAngle,
                            innerRadius,
                            outerRadius,
                            value,
                            index
                          }) => {
                            const RADIAN = Math.PI / 180;
                            const radius = 25 + innerRadius + (outerRadius - innerRadius);
                            const x = cx + radius * Math.cos(-midAngle * RADIAN);
                            const y = cy + radius * Math.sin(-midAngle * RADIAN);
                            return (
                              <text
                                x={x}
                                y={y}
                                fill="#666"
                                textAnchor={x > cx ? 'start' : 'end'}
                                dominantBaseline="central"
                                fontSize={12}
                              >
                                {getExpenseBreakdown()[index].name}
                                {` ${((value / totalExpenses) * 100).toFixed(0)}%`}
                              </text>
                            );
                          }}
                        >
                          {getExpenseBreakdown().map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip 
                          formatter={(value) => [`$${value.toLocaleString()}`, '']}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default FinancialDashboard;