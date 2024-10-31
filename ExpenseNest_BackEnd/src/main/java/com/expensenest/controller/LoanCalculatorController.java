package com.expensenest.controller;

import org.springframework.web.bind.annotation.*;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3000")
public class LoanCalculatorController {

    @PostMapping("/loan-calculator")
    public Map<String, Double> calculateLoan(@RequestBody LoanRequest request) {
        double loanAmount = request.getLoanAmount();
        double interestRate = request.getInterestRate();
        int loanTerm = request.getLoanTerm();

        // Variables for the result
        double monthlyPayment = 0;
        double totalRepaymentAmount = 0;
        double totalInterestPaid = 0;

        // Monthly calculation
        double monthlyRate = (interestRate / 100) / 12; // Monthly interest rate
        int numberOfPayments = loanTerm * 12; // Total number of monthly payments

        // Monthly payment formula (standard loan amortization)
        monthlyPayment = (loanAmount * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -numberOfPayments));
        totalRepaymentAmount = monthlyPayment * numberOfPayments;
        totalInterestPaid = totalRepaymentAmount - loanAmount;

        // Return the results in a map
        Map<String, Double> result = new HashMap<>();
        result.put("monthlyPayment", monthlyPayment);
        result.put("totalRepaymentAmount", totalRepaymentAmount);
        result.put("totalInterestPaid", totalInterestPaid);

        return result;
    }
}

class LoanRequest {
    private double loanAmount;
    private double interestRate;
    private int loanTerm;

    public double getLoanAmount() { return loanAmount; }
    public void setLoanAmount(double loanAmount) { this.loanAmount = loanAmount; }

    public double getInterestRate() { return interestRate; }
    public void setInterestRate(double interestRate) { this.interestRate = interestRate; }

    public int getLoanTerm() { return loanTerm; }
    public void setLoanTerm(int loanTerm) { this.loanTerm = loanTerm; }
}