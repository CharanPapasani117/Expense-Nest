package com.expensenest.controller;

public class LoanRequest {
    private double loanAmount;
    private double interestRate;
    private int loanTerm;
    private String interestType;
    private String paymentFrequency;

    // Getters and Setters
    public double getLoanAmount() { return loanAmount; }
    public void setLoanAmount(double loanAmount) { this.loanAmount = loanAmount; }

    public double getInterestRate() { return interestRate; }
    public void setInterestRate(double interestRate) { this.interestRate = interestRate; }

    public int getLoanTerm() { return loanTerm; }
    public void setLoanTerm(int loanTerm) { this.loanTerm = loanTerm; }

    public String getInterestType() { return interestType; }
    public void setInterestType(String interestType) { this.interestType = interestType; }

    public String getPaymentFrequency() { return paymentFrequency; }
    public void setPaymentFrequency(String paymentFrequency) { this.paymentFrequency = paymentFrequency; }
}
