import React, { useState } from 'react';
import axios from 'axios';
import Sidebar from '../Sidebar'; // Import the Sidebar component

function LoanCalculator() {
    const [loanAmount, setLoanAmount] = useState('');
    const [interestRate, setInterestRate] = useState('');
    const [loanTerm, setLoanTerm] = useState('');
    const [interestType, setInterestType] = useState('');
    const [result, setResult] = useState(null);

    const handleLoanAmountChange = (e) => {
        let value = parseFloat(e.target.value);
        setLoanAmount(value > 0 ? value : '');
    };

    const handleInterestRateChange = (e) => {
        let value = parseFloat(e.target.value);
        setInterestRate(value > 0 ? value : '');
    };

    const handleLoanTermChange = (e) => {
        let value = parseInt(e.target.value);
        setLoanTerm(value > 0 ? value : '');
    };

    const calculateLoan = async () => {
        if (!loanAmount || !interestRate || !loanTerm || !interestType) {
            alert("Please fill in all the required fields.");
            return;
        }

        try {
            const response = await axios.post('http://localhost:8080/api/loan-calculator', {
                loanAmount: parseFloat(loanAmount),
                interestRate: parseFloat(interestRate),
                loanTerm: parseInt(loanTerm),
                interestType
            });
            setResult(response.data);
        } catch (error) {
            console.error('Error calculating loan:', error);
        }
    };

    return (
        <div style={styles.calculatorContainer}>
            <Sidebar />
            <div style={styles.calculatorContent}>
                <h2 style={styles.header}>LOAN CALCULATOR</h2>
                <input
                    type="number"
                    placeholder="Loan Amount"
                    value={loanAmount}
                    onChange={handleLoanAmountChange}
                    style={styles.inputField}
                    required
                    min={0}
                />
                <input
                    type="number"
                    placeholder="Interest Rate (%)"
                    value={interestRate}
                    onChange={handleInterestRateChange}
                    style={styles.inputField}
                    required
                    min={0}
                />
                <input
                    type="number"
                    placeholder="Loan Term (Months)"
                    value={loanTerm}
                    onChange={handleLoanTermChange}
                    style={styles.inputField}
                    required
                    min={0}
                />
                <select
                    style={styles.interestSelect}
                    value={interestType}
                    onChange={(e) => setInterestType(e.target.value)}
                    required
                >
                    <option value="" disabled hidden>Interest Type</option>
                    <option value="simple">Simple Interest</option>
                    <option value="standard_compound">Standard Compound Interest</option>
                    <option value="amortized_compound">Amortized Compound Interest</option>
                </select>
                <button onClick={calculateLoan} style={styles.button}>Calculate</button>

                {result && (
                    <div style={styles.result}>
                        <p>Monthly Payment: {result.monthlyPayment.toFixed(2)}</p>
                        <p>Total Repayment Amount: {result.totalRepaymentAmount.toFixed(2)}</p>
                        <p>Total Interest Paid: {result.totalInterestPaid.toFixed(2)}</p>
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
    interestSelect: {
        width: '100%',
        padding: '12px',
        fontSize: '1rem',
        border: '1px solid #cccccc',
        borderRadius: '5px',
        marginBottom: '1rem',
        boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.1)',
        transition: 'border-color 0.3s ease',
        cursor: 'pointer',
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

export default LoanCalculator;
