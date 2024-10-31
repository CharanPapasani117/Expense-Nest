import React, { useState } from 'react';
import axios from 'axios';
import './CalCss.css'; 

function FinancialGoalsCalculator() {
    const [reason, setReason] = useState('');
    const [targetAmount, setTargetAmount] = useState('');
    const [currentSavings, setCurrentSavings] = useState('');
    const [timeframe, setTimeframe] = useState(''); // Timeframe input will be in months
    const [result, setResult] = useState(null);
    const [message, setMessage] = useState('');

    const validateReason = (value) => {
        const regex = /^[A-Za-z\s]+$/;
    
        // If the input is empty, clear the reason (handles backspace effectively)
        if (value === '') {
            setReason('');
        } else if (regex.test(value)) {
            setReason(value);
        } else {
            alert('Reason can only contain alphabetic characters and spaces.');
        }
    };
    

    // Ensure targetAmount, currentSavings, and timeframe cannot go below zero
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

        // Check if current savings are enough
        if (parseFloat(currentSavings) >= parseFloat(targetAmount)) {
            setMessage('Congratulations! You have enough money for your ${reason}.');
            setResult(null); // Clear any previous result
            return;
        } else {
            setMessage(''); // Clear message if savings are not enough
        }

        try {
            const response = await axios.post('http://localhost:8080/api/financial-goals-calculator', {
                reason,
                targetAmount: parseFloat(targetAmount),
                currentSavings: parseFloat(currentSavings),
                timeframe: parseInt(timeframe) // Input in months
            });
            setResult(response.data);
        } catch (error) {
            console.error('Error calculating goals:', error);
        }
    };

    return (
        <div className="calculator">
            <h2>Financial Goals Calculator</h2>
            <input 
                type="text" 
                placeholder="Reason" 
                value={reason} 
                onChange={(e) => validateReason(e.target.value)}  
                required
            />
            <input 
                type="number" 
                placeholder="Target Amount" 
                value={targetAmount} 
                onChange={handleTargetAmountChange} 
                required
                min={0} // Ensure it can't go below 0 via browser constraints
            />
            <input 
                type="number" 
                placeholder="Current Savings" 
                value={currentSavings} 
                onChange={handleCurrentSavingsChange} 
                required
                min={0} // Ensure it can't go below 0 via browser constraints
            />
            <input 
                type="number" 
                placeholder="Timeframe (months)" 
                value={timeframe} 
                onChange={handleTimeframeChange} 
                required
                min={0} // Ensure it can't go below 0 via browser constraints
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
    );
}

export default FinancialGoalsCalculator;