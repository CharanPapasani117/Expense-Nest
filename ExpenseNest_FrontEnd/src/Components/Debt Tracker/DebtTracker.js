import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Graph from './Graph';
import Form from './Form';
import './App.css';


const DebtTracker = () => {
  return (
    <div className="App">
      <div className="container mx-auto max-w-6xl text-center drop-shadow-lg text-gray-800">
        <h1 className="text-4xl py-8 mb-10 rounded text-black">Debt Tracker</h1>
  
        {/* grid columns */}
        <div className="grid md:grid-cols-2 gap-4">
            {/* Chart */}
            <Graph></Graph>
            {/* Form */}
            <Form></Form>
            
        </div>
      </div>
    </div>
    );
  };

export default DebtTracker;
