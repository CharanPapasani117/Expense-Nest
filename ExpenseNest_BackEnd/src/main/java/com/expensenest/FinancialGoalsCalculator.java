package com.expensenest;

import org.springframework.web.bind.annotation.*;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3000")
public class FinancialGoalsCalculator {

    @PostMapping("/financial-goals-calculator")
    public Map<String, Double> calculateGoals(@RequestBody GoalsRequest request) {
        double targetAmount = request.getTargetAmount();
        double currentSavings = request.getCurrentSavings();
        int timeframe = request.getTimeframe(); // in years

        double amountToSaveMonthly = (targetAmount - currentSavings) / (timeframe);
        double totalamounttosave = amountToSaveMonthly * timeframe;

        Map<String, Double> result = new HashMap<>();
        result.put("monthlySavings", amountToSaveMonthly);
        result.put("totalamount", totalamounttosave);

        return result;
    }
}

class GoalsRequest {
    private String reason;
    private double targetAmount;
    private double currentSavings;
    private int timeframe; // in years

    // Getters and Setters
    public String getReason() { return reason; }
    public void setReason(String reason) { this.reason = reason; }

    public double getTargetAmount() { return targetAmount; }
    public void setTargetAmount(double targetAmount) { this.targetAmount = targetAmount; }

    public double getCurrentSavings() { return currentSavings; }
    public void setCurrentSavings(double currentSavings) { this.currentSavings = currentSavings; }

    public int getTimeframe() { return timeframe; }
    public void setTimeframe(int timeframe) { this.timeframe = timeframe; }
}