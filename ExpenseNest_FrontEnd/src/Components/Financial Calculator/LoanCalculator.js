import React, { useState } from 'react';
import axios from 'axios';
import './CalCss.css';

function LoanCalculator() {
    const [loanAmount, setLoanAmount] = useState('');
    const [interestRate, setInterestRate] = useState('');
    const [loanTerm, setLoanTerm] = useState('');
    const [result, setResult] = useState(null);

    // Handle loan amount, set empty string if it goes below 1
    const handleLoanAmountChange = (e) => {
        let value = parseFloat(e.target.value);
        setLoanAmount(value > 0 ? value : ''); // Set to empty string when 0
    };

    // Handle interest rate, set empty string if it goes below 1
    const handleInterestRateChange = (e) => {
        let value = parseFloat(e.target.value);
        setInterestRate(value > 0 ? value : ''); // Set to empty string when below 1
    };

    // Handle loan term, set empty string if it goes below 1
    const handleLoanTermChange = (e) => {
        let value = parseInt(e.target.value);
        setLoanTerm(value > 0 ? value : ''); // Set to empty string when below 1
    };

    const calculateLoan = async () => {
        if (!loanAmount || !interestRate || !loanTerm) {
            alert("Please fill in all the required fields.");
            return;
        }

        try {
            const response = await axios.post('http://localhost:8080/api/loan-calculator', {
                loanAmount: parseFloat(loanAmount),
                interestRate: parseFloat(interestRate),
                loanTerm: parseInt(loanTerm)
            });
            setResult(response.data);
        } catch (error) {
            console.error('Error calculating loan:', error);
        }
    };

    return (
        <div className="calculator">
            <h2>Loan Calculator</h2>

            {/* Loan Amount Input */}
            <input 
                type="number" 
                placeholder="Loan Amount" 
                value={loanAmount} 
                onChange={handleLoanAmountChange} 
                className="input-field"
                required
                min={0} // Ensure loan amount can't go below 0 via browser constraints
            />

            {/* Interest Rate Input */}
            <input 
                type="number" 
                placeholder="Interest Rate (%)" 
                value={interestRate} 
                onChange={handleInterestRateChange} 
                className="input-field"
                required
                min={0} // Ensure interest rate can't go below 1 via browser constraints
            />

            {/* Loan Term Input */}
            <input 
                type="number" 
                placeholder="Loan Term (years)" 
                value={loanTerm} 
                onChange={handleLoanTermChange} 
                className="input-field"
                required
                min={0} // Ensure loan term can't go below 1 year via browser constraints
            />

            <button onClick={calculateLoan}>Calculate</button>

            {/* Displaying the Result */}
            {result && (
                <div className="result">
                    <p>Monthly Payment: {result.monthlyPayment.toFixed(2)}</p>
                    <p>Total Repayment Amount: {result.totalRepaymentAmount.toFixed(2)}</p>
                    <p>Total Interest Paid: {result.totalInterestPaid.toFixed(2)}</p>
                </div>
            )}
        </div>
    );
}

export default LoanCalculator;