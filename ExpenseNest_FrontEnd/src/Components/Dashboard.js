import React from 'react';
import { BrowserRouter as Router, Route, Link, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Button, Container, Row, Col } from 'react-bootstrap';
import image from './Assets/ss.png';
import image2 from './Assets/pic-features-1@2x.webp';
import './Dashboard.css';
import { FaDollarSign } from 'react-icons/fa'; 
import { Pie } from 'react-chartjs-2';
import 'chart.js/auto';

const ExpenseNestLanding = () => {
  const navigate = useNavigate();

  const customButtonStyle = {
    backgroundColor: '#FF7F6B',
    borderColor: '#FF7F6B',
    color: '#FFFFFF',
    fontWeight: 'bold',
    borderRadius: '8px'
  };

  const handleNavigate = () => {
    navigate('/login');
  };

  const pieData = {
    labels: ['Financial Satisfaction', 'Reduced Anxiety', 'Improved Saving', 'Financial Awareness'],
    datasets: [
      {
        data: [40, 30, 20, 10],
        backgroundColor: ['#4CAF50', '#FF9800', '#2196F3', '#E91E63'],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div style={{ backgroundColor: '#E6F3FF' }} className="min-vh-100">
      {/* Navigation */}
      <Navbar bg="transparent" expand="lg" className="py-3">
        <Container className="d-flex justify-content-between align-items-center">
          <Navbar.Brand as={Link} to="/login" className="d-flex align-items-center">
            <span className="main-button">
              <h2>Expense Nest</h2>
              <FaDollarSign className="icon" />
            </span>
          </Navbar.Brand>
         
        </Container>
      </Navbar>

      {/* Hero Section */}
      <Container className="py-5">
        <Row className="align-items-center">
          <Col md={6}>
            <h1 className="display-4 fw-bold mb-3" style={{ color: '#0A2F5E' }}>Know where your money goes</h1>
            <h2 className="display-8 fw-bold mb-2" style={{ color: '#2C7A7B' }}>TO STOP FINANCIAL ANXIETY</h2>
            <p className="lead mb-4" style={{ color: '#2D3748' }}>
              Expense Nest is your trusted companion in achieving financial clarity. With user-friendly tools and insightful analytics, you can easily track your spending habits, set and meet financial goals, and plan for a secure future. Take control of your finances and say goodbye to the stress of unexpected expenses.
            </p>
            <Button onClick={handleNavigate} style={customButtonStyle} size="lg" className="me-3">Get started</Button>
          </Col>
          <Col md={6} className="d-flex justify-content-center">
            <img src={image} alt="Family illustration" style={{ maxWidth: '100%', height: 'auto' }} />
          </Col>
        </Row>
      </Container>

      {/* Extended Explanation Section */}
      <Container className="py-5">
        <h3 style={{ color: '#0A2F5E', marginBottom: '1rem', textAlign: 'center' }}>Why Choose Expense Nest?</h3>
        <p style={{ color: '#2D3748', fontSize: '1.1rem', lineHeight: '1.75' }}>
          <strong style={{ color: '#0A2F5E' }}>1. Simplified Expense Tracking:</strong> Expense Nest simplifies your financial life by allowing you to <strong>record every expense</strong>, whether it's your morning coffee, grocery run, or monthly bills. Each transaction is categorized and logged, giving you a complete overview of your spending habits. This transparency helps you identify unnecessary expenditures and adjust your budget accordingly.
          <br /><br />
          <strong style={{ color: '#0A2F5E' }}>2. Visual Insights:</strong> With powerful <strong>analytics</strong> and interactive charts, you can visualize your spending trends over days, weeks, or months. Expense Nest’s dashboard highlights where most of your money is going, empowering you to make <strong>informed financial decisions</strong>. By having clear insights into your cash flow, you can set realistic spending limits and avoid budget shortfalls.
          <br /><br />
          <strong style={{ color: '#0A2F5E' }}>3. Goal Setting and Tracking:</strong> One of the standout features of Expense Nest is the ability to <strong>set and track financial goals</strong>. Whether you’re saving for a vacation, building an emergency fund, or planning a big purchase, our application helps you stay on track. <em>Visual progress indicators</em> and goal reminders motivate you to keep moving towards your targets without falling off course.
          <br /><br />
          <strong style={{ color: '#0A2F5E' }}>4. The Importance of Saving:</strong> Saving money regularly not only provides a cushion for unexpected expenses but also creates a sense of financial freedom. Studies show that individuals who track their expenses and save regularly are more likely to achieve their financial goals and maintain a <strong>higher quality of life</strong>.
          <br /><br />
          <strong style={{ color: '#0A2F5E' }}>5. Life-Changing Benefits:</strong> Tracking your spending and setting budgets can lead to <strong>reduced financial anxiety</strong>, a stronger sense of control, and improved mental health. Financial stability is directly linked to better decision-making and overall happiness.
        </p>
      </Container>

      {/* User Happiness Pie Chart */}
      <Container className="py-5">
        <h3 style={{ color: '#0A2F5E', textAlign: 'center', marginBottom: '1.5rem' }}>The Power of Tracking and Saving</h3>
        <Row className="justify-content-center">
          <Col md={6}>
            <Pie data={pieData} />
          </Col>
        </Row>
        <p className="text-center mt-4" style={{ color: '#2D3748', fontSize: '1rem' }}>
          Tracking your spending and saving regularly leads to greater financial satisfaction and reduced stress, paving the way for a happier, more fulfilling life.
        </p>
      </Container>

      {/* Dashboard Section */}
      <div className="py-5">
        <Container>
          <Row className="align-items-center">
            <Col md={7}>
              <img 
                src={image2} 
                alt="ExpenseNest Dashboard" 
                style={{
                  maxWidth: '100%',
                  height: 'auto',
                  boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
                }}
              />
            </Col>
            <Col md={5} className="mt-4 mt-md-0">
              <h2 className="display-5 fw-bold mb-4" style={{ color: '#0A2F5E' }}>Spend smarter and live better</h2>
              <p className="lead mb-4" style={{ color: '#2D3748' }}>
                Our comprehensive dashboard helps you track your daily expenses, visualize your spending trends, and plan budgets effortlessly. With Expense Nest, you can stay ahead of your finances and make informed decisions that lead to a financially stress-free lifestyle.
              </p>
              <Button onClick={handleNavigate} style={customButtonStyle} size="lg" className="me-3">Sign up</Button>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default ExpenseNestLanding;