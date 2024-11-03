package com.expensenest.controller;

import org.springframework.web.bind.annotation.*;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3000") // Enable CORS for your frontend
public class LoanCalculatorController {

    @PostMapping("/loan-calculator")
    public Map<String, Double> calculateLoan(@RequestBody LoanRequest request) {
        double loanAmount = request.getLoanAmount();
        double interestRate = request.getInterestRate();
        int loanTerm = request.getLoanTerm();
        String interestType = request.getInterestType(); // "simple", "standard_compound", "amortized_compound"

        double monthlyPayment = 0;
        double totalRepaymentAmount = 0;
        double totalInterestPaid = 0;

        // Monthly rate for compound interest
        double annualRate = interestRate / 100;
        int compoundingPeriodsPerYear = 12;
        double timeInYears = loanTerm / 12.0;
        double monthlyRate = annualRate / 12;
        int numberOfPayments = loanTerm; // Loan term in months

        // Calculate based on interest type
        switch (interestType.toLowerCase()) {
            case "simple":
                // Simple Interest Calculation
                totalInterestPaid = loanAmount * (interestRate / 100) * (loanTerm / 12.0);
                totalRepaymentAmount = loanAmount + totalInterestPaid;
                monthlyPayment = totalRepaymentAmount / loanTerm;
                break;

            case "standard_compound":
                // Standard Compound Interest Calculation
                totalRepaymentAmount = loanAmount * Math.pow(1 + (annualRate / compoundingPeriodsPerYear), compoundingPeriodsPerYear * timeInYears);
                totalInterestPaid = totalRepaymentAmount - loanAmount;
                monthlyPayment = totalRepaymentAmount / loanTerm;
                break;

            case "amortized_compound":
                // Compound Interest with Amortization
                double compoundFactor = Math.pow(1 + monthlyRate, numberOfPayments);
                monthlyPayment = (loanAmount * monthlyRate * compoundFactor) / (compoundFactor - 1);
                totalRepaymentAmount = monthlyPayment * numberOfPayments;
                totalInterestPaid = totalRepaymentAmount - loanAmount;
                break;

            default:
                throw new IllegalArgumentException("Invalid interest type provided.");
        }

        // Return the results in a map
        Map<String, Double> result = new HashMap<>();
        result.put("monthlyPayment", monthlyPayment);
        result.put("totalRepaymentAmount", totalRepaymentAmount);
        result.put("totalInterestPaid", totalInterestPaid);

        return result;
    }
}
