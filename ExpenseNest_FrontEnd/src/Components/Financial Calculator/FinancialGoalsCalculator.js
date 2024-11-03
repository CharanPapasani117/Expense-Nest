import React, { useState } from 'react';
import axios from 'axios';
import Sidebar from '../Sidebar.js'; // Import the Sidebar component
import './loancalculator.css'; 

function FinancialGoalsCalculator() {
    const [reason, setReason] = useState('');
    const [targetAmount, setTargetAmount] = useState('');
    const [currentSavings, setCurrentSavings] = useState('');
    const [timeframe, setTimeframe] = useState('');
    const [result, setResult] = useState(null);
    const [message, setMessage] = useState('');

    const validateReason = (value) => {
        const regex = /^[A-Za-z\s]+$/;
        if (value === '') {
            setReason('');
        } else if (regex.test(value)) {
            setReason(value);
        } else {
            alert('Reason can only contain alphabetic characters and spaces.');
        }
    };

    const handleTargetAmountChange = (e) => {
        let value = parseFloat(e.target.value);
        setTargetAmount(value >=  0 ? value : '');
    };

    const handleCurrentSavingsChange = (e) => {
        let value = parseFloat(e.target.value);
        setCurrentSavings(value >= 0 ? value : '');
    };

    const handleTimeframeChange = (e) => {
        let value = parseFloat(e.target.value);
        setTimeframe(value >= 0 ? value : '');
    };

    const calculateGoals = async () => {
        if (!reason || !targetAmount || !currentSavings || !timeframe) {
            alert("Please fill in all the required fields.");
            return;
        }

        if (parseFloat(currentSavings) >= parseFloat(targetAmount)) {
            setMessage(`Congratulations! You have enough money for your ${reason}.`);
            setResult(null);
            return;
        } else {
            setMessage('');
        }

        try {
            const response = await axios.post('http://localhost:8080/api/financial-goals-calculator', {
                reason,
                targetAmount: parseFloat(targetAmount),
                currentSavings: parseFloat(currentSavings),
                timeframe: parseInt(timeframe) 
            });
            setResult(response.data);
        } catch (error) {
            console.error('Error calculating goals:', error);
        }
    };

    return (
        <div className="calculator-container">
            <Sidebar />
            <div className="calculator-content">
            <h2 style={{
                    textAlign: 'center', // Center the text horizontally
                    fontSize: '2rem', // Adjust the font size
                }}>FINANCIAL GOALS CALCULATOR</h2>
                <input 
                    type="text" 
                    placeholder="Reason" 
                    value={reason} 
                    onChange={(e) => validateReason(e.target.value)}  
                    className="input-field"
                    required
                />
                <input 
                    type="number" 
                    placeholder="Target Amount" 
                    value={targetAmount} 
                    onChange={handleTargetAmountChange} 
                    className="input-field"
                    required
                    min={0}
                />
                <input 
                    type="number" 
                    placeholder="Current Savings" 
                    value={currentSavings} 
                    onChange={handleCurrentSavingsChange} 
                    className="input-field"
                    required
                    min={0}
                />
                <input 
                    type="number" 
                    placeholder="Timeframe (months)" 
                    value={timeframe} 
                    onChange={handleTimeframeChange} 
                    className="input-field"
                    required
                    min={0}
                />
                <button onClick={calculateGoals}>Calculate</button>

                {message && (
                    <div className="message">
                        <p>{message}</p>
                    </div>
                )}

                {result && (
                    <div className="result">
                        <p>Amount to Save Monthly: {result.monthlySavings}</p>
                        <p>Total Amount to Save: {result.totalamount}</p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default FinancialGoalsCalculator;
