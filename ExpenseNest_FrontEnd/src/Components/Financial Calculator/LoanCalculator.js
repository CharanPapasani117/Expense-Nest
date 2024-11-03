import React, { useState } from 'react';
import axios from 'axios';
import Sidebar from '../Sidebar'; // Import the Sidebar component
import './loancalculator.css';

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
        <div className="calculator-container">
            <Sidebar />
            <div className="calculator-content">
                <h2 style={{
                    textAlign: 'center', // Center the text horizontally
                    fontSize: '2rem', // Adjust the font size
                }}>LOAN CALCULATOR</h2>
                <input 
                    type="number" 
                    placeholder="Loan Amount" 
                    value={loanAmount} 
                    onChange={handleLoanAmountChange} 
                    className="input-field"
                    required
                    min={0}
                />

                <input 
                    type="number" 
                    placeholder="Interest Rate (%)" 
                    value={interestRate} 
                    onChange={handleInterestRateChange} 
                    className="input-field"
                    required
                    min={0}
                />

                <input 
                    type="number" 
                    placeholder="Loan Term (Months)" 
                    value={loanTerm} 
                    onChange={handleLoanTermChange} 
                    className="input-field"
                    required
                    min={0}
                />

                <select 
                    className="interest-select"
                    value={interestType}
                    onChange={(e) => setInterestType(e.target.value)}
                    required
                >
                    <option value="" disabled hidden>Interest Type</option>
                    <option value="simple">Simple Interest</option>
                    <option value="standard_compound">Standard Compound Interest</option>
                    <option value="amortized_compound">Amortized Compound Interest</option>
                </select>

                <button onClick={calculateLoan}>Calculate</button>

                {result && (
                    <div className="result">
                        <p>Monthly Payment: {result.monthlyPayment.toFixed(2)}</p>
                        <p>Total Repayment Amount: {result.totalRepaymentAmount.toFixed(2)}</p>
                        <p>Total Interest Paid: {result.totalInterestPaid.toFixed(2)}</p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default LoanCalculator;
