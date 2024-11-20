import './App.css';
import AssetPage from './AssetPage';
import AssetsList from './AssetsList.tsx';
import CreateAsset from './CreateAsset.tsx';
import React, { useState } from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Chartt from './Chart.tsx';
import DoughnutChart from './Chart.jsx';
import UpdateAsset from './updateAsset.tsx';
import loginform  from './Components/LogIn/loginform.jsx';
import Prediction  from './Components/Prediction/Prediction.js';
import Home from './Components/Financial Calculator/Home.js';
import LoanCalculator from './Components/Financial Calculator/LoanCalculator.js';
import FinancialGoalsCalculator from './Components/Financial Calculator/FinancialGoalsCalculator.js';
import ExpenseDashboard from './Components/Expense Tracker/Expense.js';
import DebtTracker from './Components/Debt Tracker/DebtTracker.js';
import Advisingf from './Components/SchedulingAppointment/Advisingf.js';
import DashBoard from './Components/Dashboard.js';

import PrivateRoute from './PrivateRoute.js';
import IncomeDashboard from './Components/Income/Income.js';
import Main from './Components/Suggestions/main';
//import IntegratedDashboard from './Components/Budgeting/Expense.js';
import FinancialDashboard from './Components/Dashboard/Dash';
function App() {

  return (
    <div>
    {/* { (
      <LoginForm onSubmit={handleFormSubmit}></LoginForm>  // Show login form if user is not logged in
    ) } */}
  
    <Router>
      <Routes>
        <Route path="/login" Component={loginform}></Route>
        <Route path="/" Component={DashBoard}></Route>
        <Route path="/createAsset" Component={CreateAsset}></Route>
        <Route path="/assetsList" Component={AssetsList}></Route>
        {/* <Route path="/chart" Component={Chartt}></Route> */}
        <Route path="/asset" Component={DoughnutChart}></Route>
        <Route path="/assetsList/updateAsset/:id" Component={UpdateAsset}></Route>
        <Route path='/financialCal' Component={Home}></Route>
        <Route path='/loan-calculator' Component={LoanCalculator}></Route>
        <Route path='/financial-goals-calculator' Component={FinancialGoalsCalculator}></Route>
        {/* <Route path = '/budget' Component={IntegratedDashboard}></Route> */}
        <Route path='/dashboard' Component={FinancialDashboard}></Route>
        <Route path='/Prediction' Component={Prediction}></Route>

        <Route path="/expense" Component={ExpenseDashboard}></Route>
        {/* <Route path="/dashboard" element={
              <PrivateRoute>
                <DashBoard />
              </PrivateRoute>
            } /> */}
        <Route path="/debtTracker" Component={DebtTracker}></Route> 
        <Route path="/suggestions" Component={Main}></Route>

        <Route path = "/schedulingAppt" Component={Advisingf}></Route>
        <Route path = "/income" Component={IncomeDashboard}></Route>

      </Routes>
    </Router>
    </div>
  );
}

export default App;