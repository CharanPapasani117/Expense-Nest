import React, { useState } from 'react';
import axios from 'axios';
import Sidebar from '../Sidebar.js'; // Import the Sidebar component

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
        setTargetAmount(value >= 0 ? value : '');
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
        <div style={styles.calculatorContainer}>
            <Sidebar />
            <div style={styles.calculatorContent}>
                <h2 style={styles.header}>FINANCIAL GOALS CALCULATOR</h2>
                <input
                    type="text"
                    placeholder="Reason"
                    value={reason}
                    onChange={(e) => validateReason(e.target.value)}
                    style={styles.inputField}
                    required
                />
                <input
                    type="number"
                    placeholder="Target Amount"
                    value={targetAmount}
                    onChange={handleTargetAmountChange}
                    style={styles.inputField}
                    required
                    min={0}
                />
                <input
                    type="number"
                    placeholder="Current Savings"
                    value={currentSavings}
                    onChange={handleCurrentSavingsChange}
                    style={styles.inputField}
                    required
                    min={0}
                />
                <input
                    type="number"
                    placeholder="Timeframe (months)"
                    value={timeframe}
                    onChange={handleTimeframeChange}
                    style={styles.inputField}
                    required
                    min={0}
                />
                <button onClick={calculateGoals} style={styles.button}>Calculate</button>

                {message && (
                    <div style={styles.result}>
                        <p>{message}</p>
                    </div>
                )}

                {result && (
                    <div style={styles.result}>
                        <p>Amount to Save Monthly: {result.monthlySavings}</p>
                        <p>Total Amount to Save: {result.totalamount}</p>
                    </div>
                )}
            </div>
        </div>
    );
}

const styles = {
    calculatorContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100vh',
        backgroundColor: '#F0F8FF',
    },
    calculatorContent: {
        backgroundColor: '#ffffff',
        padding: '2rem',
        borderRadius: '10px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        maxWidth: '500px',
        width: '90%',
        textAlign: 'center',
    },
    header: {
        fontSize: '1.8rem',
        color: '#1A2B4A',
        marginBottom: '1.5rem',
    },
    inputField: {
        width: '100%',
        padding: '12px',
        fontSize: '1rem',
        border: '1px solid #cccccc',
        borderRadius: '5px',
        marginBottom: '1rem',
        boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.1)',
        transition: 'border-color 0.3s ease',
    },
    button: {
        padding: '12px 30px',
        fontSize: '1rem',
        color: '#ffffff',
        backgroundColor: '#4A8895',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
        transition: 'background-color 0.3s ease',
        width: '100%',
    },
    result: {
        marginTop: '2rem',
        padding: '1rem',
        backgroundColor: '#F4F7FC',
        borderRadius: '5px',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    }
};

export default FinancialGoalsCalculator;
